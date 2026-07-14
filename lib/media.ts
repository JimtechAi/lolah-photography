import { siteConfig } from "@/lib/site";

const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ??
  process.env["NEXT_PUBLIC_CLOUDINARY_CLOUDE_NAME"]?.trim();

export function getCloudinaryFetchUrl(
  sourcePath: string,
  transformations = "f_auto,q_auto"
) {
  if (process.env.NODE_ENV === "development" || !cloudName) {
    return sourcePath;
  }

  const absoluteSource = sourcePath.startsWith("http")
    ? sourcePath
    : `${siteConfig.url}${sourcePath}`;

  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${absoluteSource}`;
}