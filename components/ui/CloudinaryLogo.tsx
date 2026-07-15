"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CloudinaryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
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
  // Always use static logo directly - don't try Cloudinary
  return (
    <img
      src="/images/logo/logo.webp"
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}