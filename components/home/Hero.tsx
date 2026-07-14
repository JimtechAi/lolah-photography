import Image from "next/image";
import Link from "next/link";
import { cloudinaryFolderMap } from "@/constants/cloudinary-folders";
import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";

export default async function Hero() {
  const heroImage = await getCloudinaryFolderImage(cloudinaryFolderMap.hero, {
    width: 2400,
    height: 1500,
  });

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={heroImage.blurDataURL}
        className="hero-zoom object-cover object-center brightness-[0.72]"
      />

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/60 to-black/26" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/28 to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(42%_46%_at_72%_35%,rgba(255,242,223,0.22)_0%,rgba(255,242,223,0.1)_30%,rgba(255,242,223,0)_70%)] mix-blend-screen" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-start px-6 pb-20 pt-32 md:px-10 md:pt-36 lg:px-16">
        <div className="max-w-3xl text-left text-white">
          <p className="fade-in-up uppercase tracking-[6px] text-yellow-300/95 mb-4 text-sm md:text-base">
            Luxury Photography Studio
          </p>

          <h1 className="fade-in-up delay-150 max-w-[660px] font-serif text-5xl md:text-7xl lg:text-[5.3rem] font-semibold leading-[1.08] tracking-[0.01em] text-[#fff9ee]">
            Capturing Life's Most
            <br />
            Meaningful Moments
          </h1>

          <p className="fade-in-up delay-300 mt-6 max-w-xl text-lg text-gray-200/95">
            From weddings and engagements to maternity, newborn, family,
            birthdays, corporate portraits and special events, Lolah Photography
            creates timeless imagery with elegance, emotion and cinematic
            storytelling.
          </p>

          <p className="fade-in-up delay-450 mt-5 text-sm uppercase tracking-[0.2em] text-yellow-100/90">
            ★★★★★ Trusted by 300+ Happy Clients Across Nigeria
          </p>

          <p className="fade-in-up delay-450 mt-2 text-sm text-gray-300">
            Based in Ibadan • Available Across Nigeria
          </p>

          <div className="fade-in-up delay-600 mt-10 flex flex-col justify-start gap-5 md:flex-row">
            <Link
              href="/booking"
              className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black shadow-[0_10px_35px_rgba(234,179,8,0.34)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-[0_16px_45px_rgba(234,179,8,0.42)]"
            >
              Book a Session
            </Link>

            <Link
              href="/#portfolio"
              className="rounded-full border border-white/80 bg-transparent px-8 py-4 text-center text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-yellow-400 hover:text-yellow-100 hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="fade-in delay-600 absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-center text-white/90 md:bottom-9">
        <p className="text-xs uppercase tracking-[0.34em]">Scroll to Explore</p>
        <div className="scroll-cue-bounce mt-3 mx-auto h-10 w-6 rounded-full border border-white/50 p-1">
          <span className="block h-2.5 w-2.5 rounded-full bg-yellow-300/95" />
        </div>
      </div>
    </section>
  );
}