"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CloudinaryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type CloudinaryLogoProps = {
  folderName: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function CloudinaryLogo({
  folderName,
  alt,
  width,
  height,
  className,
  priority,
}: CloudinaryLogoProps) {
  const [image, setImage] = useState<CloudinaryImage | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLogo = async () => {
      try {
        const response = await fetch(
          `/api/cloudinary/${encodeURIComponent(folderName)}?limit=1`
        );
        const data = (await response.json()) as { images?: CloudinaryImage[] };

        if (isMounted) {
          setImage(data.images?.[0] ?? null);
        }
      } catch {
        if (isMounted) {
          setImage(null);
        }
      }
    };

    void loadLogo();

    return () => {
      isMounted = false;
    };
  }, [folderName]);

  if (!image) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full border border-yellow-300/20 bg-white/5 ${className ?? ""}`}
        style={{ width, height }}
        aria-label={alt}
      >
        <span className="text-xs uppercase tracking-[0.24em] text-yellow-100/75">
          Lolah
        </span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}