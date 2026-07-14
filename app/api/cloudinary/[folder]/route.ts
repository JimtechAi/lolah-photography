import { NextResponse } from "next/server";
import { getCloudinaryFolderImages } from "@/lib/cloudinary-media";

type RouteContext = {
  params: Promise<{ folder: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const resolvedParams = await params;
  const url = new URL(request.url);
  const requestedLimit = Number(url.searchParams.get("limit") || "1");
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(50, Math.max(1, Math.round(requestedLimit)))
    : 1;

  try {
    const images = await getCloudinaryFolderImages(
      decodeURIComponent(resolvedParams.folder),
      { limit }
    );

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load Cloudinary assets.";
    console.error(
      `[API /api/cloudinary/${decodeURIComponent(
        resolvedParams.folder
      )}] ${message}`,
      error
    );

    return NextResponse.json(
      {
        images: [],
        error: message,
      },
      { status: 500 }
    );
  }
}