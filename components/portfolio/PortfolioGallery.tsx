"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type PortfolioImage = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

type PortfolioGalleryProps = {
  images: PortfolioImage[];
};

export default function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setZoomed(false);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setZoomed(false);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    setZoomed(false);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length
    );
    setZoomed(false);
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % images.length
    );
    setZoomed(false);
  };

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-2xl text-left"
            aria-label={`Open image ${index + 1} in lightbox`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.12 + index * 0.06, ease: "easeOut" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={1200}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/40 p-3 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
              <Search className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/92 px-4 py-6 backdrop-blur-md md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">
              <div className="mb-4 flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-200/85">
                    Portfolio Lightbox
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Image {activeIndex === null ? 1 : activeIndex + 1} of {images.length}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setZoomed((current) => !current);
                    }}
                    className="rounded-full border border-white/15 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white/12"
                  >
                    {zoomed ? "Reset Zoom" : "Zoom"}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      closeLightbox();
                    }}
                    className="rounded-full border border-white/15 bg-white/6 p-3 text-white transition hover:bg-white/12"
                    aria-label="Close lightbox"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03]" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 z-10 rounded-full border border-white/15 bg-black/50 p-3 text-white transition hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    priority
                    placeholder={activeImage.blurDataURL ? "blur" : "empty"}
                    blurDataURL={activeImage.blurDataURL}
                    className={`object-contain px-16 py-10 transition duration-300 ${
                      zoomed ? "scale-[1.45] cursor-zoom-out" : "scale-100 cursor-zoom-in"
                    }`}
                    onClick={() => setZoomed((current) => !current)}
                  />
                </motion.div>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 z-10 rounded-full border border-white/15 bg-black/50 p-3 text-white transition hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}