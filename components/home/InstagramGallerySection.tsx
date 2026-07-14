import Image from "next/image";
import Link from "next/link";
import { portfolioCategoryOrder } from "@/constants/cloudinary-folders";
import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";

const galleryFolders = portfolioCategoryOrder.slice(0, 8);

export default async function InstagramGallerySection() {
  const images = await Promise.all(
    galleryFolders.map(async (folderName) => {
      const image = await getCloudinaryFolderImage(folderName, {
        width: 700,
        height: 700,
      });

      return {
        src: image.src,
        alt: `${folderName} preview from Lolah Photography`,
        blurDataURL: image.blurDataURL,
      };
    })
  );

  return (
    <section className="bg-[#0b0907] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="fade-in-up text-xs uppercase tracking-[0.3em] text-yellow-300/90">
          Instagram Gallery
        </p>

        <h2 className="fade-in-up delay-150 mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
          Moments We Love Sharing
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <article
              key={image.src}
              className="fade-in-up group overflow-hidden rounded-2xl border border-yellow-200/10"
              style={{ animationDelay: `${130 + index * 70}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={700}
                height={700}
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.05] group-hover:brightness-105"
              />
            </article>
          ))}
        </div>

        <div className="fade-in-up delay-600 mt-10 flex justify-center">
          <Link
            href="https://instagram.com/lolah.photography"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-yellow-300/80 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-yellow-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300/10 hover:shadow-[0_0_32px_rgba(250,204,21,0.2)]"
          >
            Follow @LolahPhotography
          </Link>
        </div>
      </div>
    </section>
  );
}
