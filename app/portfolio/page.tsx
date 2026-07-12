import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse curated wedding stories, elegant portraits, and celebration imagery from Lolah Photography.",
};

const portfolioImages = [
  {
    src: "/images/portfolio/portfolio1.webp",
    alt: "Bride portrait in soft natural light",
  },
  {
    src: "/images/portfolio/portfolio2.webp",
    alt: "Bride and groom sharing a candid moment",
  },
  {
    src: "/images/portfolio/portfolio3.webp",
    alt: "Elegant ceremony detail and composition",
  },
  {
    src: "/images/portfolio/portfolio4.webp",
    alt: "Romantic reception atmosphere",
  },
  {
    src: "/images/portfolio/portfolio5.webp",
    alt: "Timeless wedding portrait of the couple",
  },
  {
    src: "/images/portfolio/portfolio6.webp",
    alt: "Celebration frame with movement and emotion",
  },
];

export default function PortfolioPage() {
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
              Curated Wedding Stories, Crafted with Emotion and Elegance
            </h1>

            <p className="fade-in-up delay-300 mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Explore a selection of our favorite frames, from quiet intimate
              portraits to cinematic celebration moments. Every gallery is
              designed to preserve your day with timeless artistry.
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
