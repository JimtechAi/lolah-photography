import { NextResponse } from "next/server";
import { getCloudinaryFolderImages } from "@/lib/cloudinary-media";

type RouteContext = {
  params: Promise<{ folder: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const resolvedParams = await params;
  const url = new URL(request.url);
  const limit = Math.max(1, Number(url.searchParams.get("limit") || "1"));

  try {
    const images = await getCloudinaryFolderImages(
      decodeURIComponent(resolvedParams.folder),
      { limit }
    );

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json(
      {
        images: [],
        error:
          error instanceof Error ? error.message : "Unable to load Cloudinary assets.",
      },
      { status: 500 }
    );
  }
}