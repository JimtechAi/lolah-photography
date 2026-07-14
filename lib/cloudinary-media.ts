import "server-only";

import { unstable_noStore as noStore } from "next/cache";
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

let configured = false;

export type CloudinaryMediaItem = {
  publicId: string;
  src: string;
  alt: string;
  width: number;
  height: number;
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
  return `${rootFolder}/${folderName}`;
}

function getPlaceholderItem(folderName: string): CloudinaryMediaItem {
  return {
    publicId: `${getFolderPath(folderName)}/placeholder`,
    src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b0a08" offset="0%"/><stop stop-color="#1a120b" offset="100%"/></linearGradient></defs><rect width="1600" height="1200" fill="url(#g)"/><rect x="80" y="80" width="1440" height="1040" rx="48" fill="rgba(255,255,255,0.03)" stroke="rgba(250,204,21,0.18)"/><text x="800" y="575" text-anchor="middle" fill="#fff7ea" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700">New work coming soon.</text><text x="800" y="640" text-anchor="middle" fill="#d1d5db" font-family="Arial, Helvetica, sans-serif" font-size="24">${folderName}</text></svg>`
    )}`,
    alt: "New work coming soon.",
    width: 1600,
    height: 1200,
  };
}

export function buildCloudinaryImageUrl(
  publicId: string,
  options: { width?: number; height?: number } = {}
) {
  if (!ensureCloudinaryConfig()) {
    return getPlaceholderItem("Portfolio").src;
  }

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        fetch_format: "auto",
        quality: "auto",
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
    return getPlaceholderItem("Portfolio").src;
  }

  return cloudinary.url(publicId, { secure: true });
}

export async function getCloudinaryFolderImages(
  folderName: string,
  options: CloudinaryMediaFolderOptions = {}
): Promise<CloudinaryMediaItem[]> {
  noStore();

  if (!ensureCloudinaryConfig()) {
    return [getPlaceholderItem(folderName)];
  }

  const folderPath = getFolderPath(folderName);
  let response: { resources?: Array<any> };

  try {
    response = await cloudinary.api.resources_by_asset_folder(folderPath, {
      resource_type: "image",
      type: "upload",
      max_results: options.limit ?? 500,
    });
  } catch (error) {
    const cloudinaryError = error as CloudinaryApiErrorLike;
    const errorCode = cloudinaryError.error?.http_code;
    const errorMessage =
      cloudinaryError.error?.message || cloudinaryError.message || "";

    if (errorCode === 404 || errorMessage.includes("Folder doesn't exist")) {
      return [getPlaceholderItem(folderName)];
    }

    throw new Error(errorMessage || "Unable to load Cloudinary assets.");
  }

  const resources = response.resources ?? [];

  if (!resources.length) {
    return [getPlaceholderItem(folderName)];
  }

  return resources.map((resource) => {
    const width = resource.width || options.width || 1600;
    const height = resource.height || options.height || 1200;
    const context = resource.context as
      | { custom?: { alt?: string; caption?: string } }
      | undefined;

    return {
      publicId: resource.public_id,
      src: buildCloudinaryImageUrl(resource.public_id, { width, height }),
      alt:
        context?.custom?.alt ||
        context?.custom?.caption ||
        resource.display_name ||
        resource.public_id.split("/").pop()?.replace(/[-_]/g, " ") ||
        `${folderName} image`,
      width,
      height,
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