import Image from "next/image";
import Link from "next/link";
import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";

export default async function BookingCTASection() {
  const heroImage = await getCloudinaryFolderImage("Hero", {
    width: 1800,
    height: 1200,
  });

  return (
    <section className="relative overflow-hidden px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
      <Image
        src={heroImage.src}
        alt="Wedding couple cinematic background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75" />

      <div className="relative mx-auto max-w-5xl rounded-3xl border border-yellow-200/20 bg-black/35 px-6 py-14 text-center backdrop-blur-sm md:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90">Booking</p>

        <h2 className="mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
          Let&apos;s Capture Your Love Story
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-200 md:text-lg">
          Your wedding deserves timeless photographs that will be cherished for
          generations.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="inline-flex rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black shadow-[0_12px_34px_rgba(234,179,8,0.3)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400"
          >
            Book Session
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-white/80 px-8 py-4 text-white transition-all duration-300 hover:scale-[1.03] hover:border-yellow-300 hover:text-yellow-100"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
