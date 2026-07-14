import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { getCloudinaryFolderByServiceSlug, portfolioCategoryOrder } from "@/constants/cloudinary-folders";
import { getCloudinaryFolderImage, getCloudinaryFolderImages } from "@/lib/cloudinary-media";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const weddingFolder = getCloudinaryFolderByServiceSlug("weddings");

  if (!weddingFolder) {
    throw new Error("Missing Cloudinary mapping for weddings service.");
  }

  const heroImage = await getCloudinaryFolderImage(weddingFolder, {
    width: 1200,
    height: 630,
  });

  return {
    title: "Portfolio",
    description:
      "Browse our curated photography collections including weddings, engagements, portraits, family sessions, and special events from Lolah Photography.",
    keywords: [
      "Lolah Photography portfolio",
      "photography portfolio",
      "luxury portrait gallery",
      "photography collections",
    ],
    alternates: {
      canonical: "/portfolio",
    },
    openGraph: {
      title: "Portfolio | Lolah Photography",
      description:
        "Browse our curated photography collections including weddings, engagements, portraits, family sessions, and special events from Lolah Photography.",
      url: "/portfolio",
      siteName: siteConfig.name,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Lolah Photography",
      description:
        "Browse our curated photography collections including weddings, engagements, portraits, family sessions, and special events from Lolah Photography.",
      images: [heroImage.src],
    },
  };
}

export default async function PortfolioPage() {
  const folderImages = await Promise.all(
    portfolioCategoryOrder.map(async (folderName) => {
      const images = await getCloudinaryFolderImages(folderName, {
        limit: 1,
        width: 900,
        height: 1200,
      });

      return {
        src: images[0].src,
        alt: images[0].alt,
        blurDataURL: images[0].blurDataURL,
      };
    })
  );

  const portfolioImages = folderImages;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0907] text-white">
        <section className="relative overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pt-40 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(48%_40%_at_84%_14%,rgba(248,211,133,0.16)_0%,rgba(248,211,133,0)_68%)]" />

          <div className="relative mx-auto max-w-7xl">
            <p className="fade-in-up text-xs uppercase tracking-[0.3em] text-yellow-300/90">
              Lolah Photography
            </p>

            <h1 className="fade-in-up delay-150 mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl lg:text-7xl">
              Explore Our Photography Collections
            </h1>

            <p className="fade-in-up delay-300 mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Discover a selection of our finest work across weddings,
              engagements, portraits, family sessions, and special events.
              Every gallery is designed to preserve life's most meaningful
              moments with timeless artistry.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10 lg:px-16 lg:pb-32">
          <PortfolioGallery images={portfolioImages} />

          <div className="fade-in-up delay-600 mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black shadow-[0_12px_34px_rgba(234,179,8,0.3)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400"
            >
              Book a Consultation
            </Link>

            <Link
              href="/"
              className="rounded-full border border-white/70 px-8 py-4 text-white transition-all duration-300 hover:scale-[1.03] hover:border-yellow-300 hover:text-yellow-100"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
