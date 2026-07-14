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

function ensureCloudinaryConfigOrThrow() {
  if (ensureCloudinaryConfig()) {
    return;
  }

  const missing = [
    !cloudName ? "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" : null,
    !apiKey ? "CLOUDINARY_API_KEY" : null,
    !apiSecret ? "CLOUDINARY_API_SECRET" : null,
  ].filter((item): item is string => Boolean(item));

  const message = `[Cloudinary] Missing required environment variables: ${missing.join(", ")}`;
  console.error(message);
  throw new Error(message);
}

function getFolderPath(folderName: string) {
  return `${rootFolder}/${normalizeFolderName(folderName)}`;
}

export function buildCloudinaryImageUrl(
  publicId: string,
  options: { width?: number; height?: number } = {}
) {
  ensureCloudinaryConfigOrThrow();

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
  ensureCloudinaryConfigOrThrow();

  return cloudinary.url(publicId, { secure: true });
}

export async function getCloudinaryFolderImages(
  folderName: string,
  options: CloudinaryMediaFolderOptions = {}
): Promise<CloudinaryMediaItem[]> {
  const normalizedFolder = normalizeFolderName(folderName);
  const folderPath = getFolderPath(normalizedFolder);
  const maxResults = options.limit ?? 500;

  if (maxResults <= 0) {
    return [];
  }

  ensureCloudinaryConfigOrThrow();

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
      cloudinaryError.error?.message || cloudinaryError.message || "Unknown Cloudinary error";

    const message =
      `[Cloudinary] Failed to load images for "${folderPath}"` +
      `${errorCode ? ` (HTTP ${errorCode})` : ""}: ${errorMessage}`;

    console.error(message);
    throw new Error(message);
  }

  const resources = response.resources ?? [];

  if (!resources.length) {
    const message = `[Cloudinary] No images found in folder "${folderPath}".`;
    console.error(message);
    throw new Error(message);
  }

  const sortedResources = resources
    .slice()
    .sort((a, b) =>
      a.public_id.localeCompare(b.public_id, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

  return sortedResources.map((resource) => {
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
