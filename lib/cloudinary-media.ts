import "server-only";

import { unstable_cache } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

const cloudName =
  readEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME") ??
  readEnv("NEXT_PUBLIC_CLOUDINARY_CLOUDE_NAME");
const apiKey = readEnv("CLOUDINARY_API_KEY");
const apiSecret = readEnv("CLOUDINARY_API_SECRET");
const rootFolder = "lolah photography";

const folderAliases: Record<string, string> = {
  hero: "Hero",
  logo: "Logo",
  weddings: "Weddings",
  traditional: "Traditional",
  "traditional weddings": "Traditional",
  engagements: "Engagements",
  "bridal portraits": "Bridal Portraits",
  "corporate portraits": "Corporate Portraits",
  family: "Family",
  events: "Events",
  maternity: "Maternity",
  "baby and newborn": "Baby And Newborn",
  "birthday photography": "Birthday Photography",
  "drones photography and videography": "Drones Photography And Videography",
  testimonials: "testimonials",
};

const localFolderFallbacks: Record<string, string[]> = {
  Logo: ["/images/logo/logo.webp"],
  Hero: [
    "/images/hero/hero1.webp",
    "/images/hero/hero2.webp",
    "/images/hero/hero3.webp",
  ],
  Weddings: [
    "/images/portfolio/portfolio1.webp",
    "/images/portfolio/portfolio2.webp",
    "/images/portfolio/portfolio3.webp",
  ],
  Traditional: [
    "/images/portfolio/portfolio2.webp",
    "/images/portfolio/portfolio4.webp",
  ],
  Engagements: [
    "/images/portfolio/portfolio3.webp",
    "/images/portfolio/portfolio5.webp",
  ],
  "Bridal Portraits": [
    "/images/lolah/lolah.webp",
    "/images/lolah/lolah1.webp.jpeg",
  ],
  Maternity: ["/images/lolah/lolah1.webp.jpeg"],
  Family: ["/images/portfolio/portfolio6.webp"],
  "Baby And Newborn": ["/images/lolah/lolah.webp.jpeg"],
  "Birthday Photography": ["/images/portfolio/portfolio4.webp"],
  "Corporate Portraits": ["/images/lolah/lolah.webp"],
  Events: ["/images/portfolio/portfolio5.webp"],
  "Drones Photography And Videography": ["/images/portfolio/portfolio6.webp"],
  testimonials: [
    "/images/lolah/lolah.webp",
    "/images/portfolio/portfolio1.webp",
    "/images/portfolio/portfolio2.webp",
  ],
  default: [
    "/images/hero/hero1.webp",
    "/images/portfolio/portfolio1.webp",
    "/images/lolah/lolah.webp",
  ],
};

let configured = false;

export type CloudinaryMediaItem = {
  publicId: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type CloudinaryMediaFolderOptions = {
  limit?: number;
  width?: number;
  height?: number;
};

type CloudinaryApiErrorLike = {
  error?: {
    message?: string;
    http_code?: number;
  };
  message?: string;
};

type CloudinaryResource = {
  public_id: string;
  display_name?: string;
  width?: number;
  height?: number;
  context?: {
    custom?: {
      alt?: string;
      caption?: string;
    };
  };
};

function normalizeFolderName(folderName: string) {
  const cleaned = folderName.trim().replace(/\s+/g, " ");
  const aliasKey = cleaned.toLowerCase();
  return folderAliases[aliasKey] ?? cleaned;
}

function getBlurDataURL(baseHex: string = "1a120b") {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b0a08" offset="0%"/><stop stop-color="#${baseHex}" offset="100%"/></linearGradient></defs><rect width="32" height="24" fill="url(#g)"/></svg>`
  )}`;
}

function ensureCloudinaryConfig() {
  if (configured) {
    return true;
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
  return true;
}

function getFolderPath(folderName: string) {
  return `${rootFolder}/${normalizeFolderName(folderName)}`;
}

function getPlaceholderItem(folderName: string): CloudinaryMediaItem {
  const normalizedFolder = normalizeFolderName(folderName);
  return {
    publicId: `${getFolderPath(normalizedFolder)}/placeholder`,
    src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b0a08" offset="0%"/><stop stop-color="#1a120b" offset="100%"/></linearGradient></defs><rect width="1600" height="1200" fill="url(#g)"/><rect x="80" y="80" width="1440" height="1040" rx="48" fill="rgba(255,255,255,0.03)" stroke="rgba(250,204,21,0.18)"/><text x="800" y="575" text-anchor="middle" fill="#fff7ea" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700">New work coming soon.</text><text x="800" y="640" text-anchor="middle" fill="#d1d5db" font-family="Arial, Helvetica, sans-serif" font-size="24">${folderName}</text></svg>`
    )}`,
    alt: "New work coming soon.",
    width: 1600,
    height: 1200,
    blurDataURL: getBlurDataURL(),
  };
}

function getLocalFallbackItems(folderName: string): CloudinaryMediaItem[] {
  const normalizedFolder = normalizeFolderName(folderName);
  const fallbackSources =
    localFolderFallbacks[normalizedFolder] ?? localFolderFallbacks.default;

  return fallbackSources.map((src, index) => ({
    publicId: `${getFolderPath(normalizedFolder)}/local-fallback-${index + 1}`,
    src,
    alt: `${normalizedFolder} preview`,
    width: 1600,
    height: 1200,
    blurDataURL: getBlurDataURL(),
  }));
}

function getFallbackItems(folderName: string, limit: number) {
  const items = getLocalFallbackItems(folderName);
  return items.length ? items.slice(0, limit) : [getPlaceholderItem(folderName)];
}

export function buildCloudinaryImageUrl(
  publicId: string,
  options: { width?: number; height?: number } = {}
) {
  if (!ensureCloudinaryConfig()) {
    return (
      getLocalFallbackItems("default")[0]?.src ??
      getPlaceholderItem("Portfolio").src
    );
  }

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        fetch_format: "auto",
        quality: "auto",
        dpr: "auto",
        crop: "fill",
        gravity: "auto",
        width: options.width,
        height: options.height,
      },
    ],
  });
}

export function buildCloudinaryRawUrl(publicId: string) {
  if (!ensureCloudinaryConfig()) {
    return (
      getLocalFallbackItems("default")[0]?.src ??
      getPlaceholderItem("Portfolio").src
    );
  }

  return cloudinary.url(publicId, { secure: true });
}

export async function getCloudinaryFolderImages(
  folderName: string,
  options: CloudinaryMediaFolderOptions = {}
): Promise<CloudinaryMediaItem[]> {
  const normalizedFolder = normalizeFolderName(folderName);

  if (!ensureCloudinaryConfig()) {
    return getFallbackItems(normalizedFolder, options.limit ?? 500);
  }

  const folderPath = getFolderPath(normalizedFolder);
  const maxResults = options.limit ?? 500;

  const getCachedFolderResources = unstable_cache(
    async (assetFolderPath: string, resultLimit: number) =>
      cloudinary.api.resources_by_asset_folder(assetFolderPath, {
        resource_type: "image",
        type: "upload",
        max_results: resultLimit,
      }),
    ["cloudinary-folder-images"],
    { revalidate: 300 }
  );

  let response: { resources?: CloudinaryResource[] };

  try {
    response = await getCachedFolderResources(folderPath, maxResults);
  } catch (error) {
    const cloudinaryError = error as CloudinaryApiErrorLike;
    const errorCode = cloudinaryError.error?.http_code;
    const errorMessage =
      cloudinaryError.error?.message || cloudinaryError.message || "";

    if (errorCode === 404 || errorMessage.includes("Folder doesn't exist")) {
      return getFallbackItems(normalizedFolder, maxResults);
    }

    throw new Error(errorMessage || "Unable to load Cloudinary assets.");
  }

  const resources = response.resources ?? [];

  if (!resources.length) {
    return getFallbackItems(normalizedFolder, maxResults);
  }

  return resources.map((resource) => {
    const width = resource.width || options.width || 1600;
    const height = resource.height || options.height || 1200;
    const context = resource.context;

    return {
      publicId: resource.public_id,
      src: buildCloudinaryImageUrl(resource.public_id, { width, height }),
      alt:
        context?.custom?.alt ||
        context?.custom?.caption ||
        resource.display_name ||
        resource.public_id.split("/").pop()?.replace(/[-_]/g, " ") ||
        `${normalizedFolder} image`,
      width,
      height,
      blurDataURL: getBlurDataURL(),
    };
  });
}

export async function getCloudinaryFolderImage(
  folderName: string,
  options: CloudinaryMediaFolderOptions = {}
) {
  const images = await getCloudinaryFolderImages(folderName, {
    ...options,
    limit: 1,
  });

  return images[0];
}

export async function getCloudinaryFolderImageUrls(
  folderName: string,
  options: CloudinaryMediaFolderOptions = {}
) {
  const images = await getCloudinaryFolderImages(folderName, options);
  return images.map((image) => image.src);
}