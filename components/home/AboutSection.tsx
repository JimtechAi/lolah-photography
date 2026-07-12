"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

const features = [
  "Luxury Weddings",
  "Bridal Portraits",
  "Destination Weddings",
  "Timeless Storytelling",
];

const stats: StatItem[] = [
  { label: "Happy Couples", value: 300, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Events Covered", value: 700, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let animationFrame = 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl text-[#fff8ed] md:text-5xl">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#090806] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(50%_42%_at_14%_20%,rgba(237,192,96,0.14)_0%,rgba(237,192,96,0)_72%)]" />

      <div className="relative mx-auto max-w-7xl space-y-16 lg:space-y-24">
        <motion.div
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-yellow-300/20">
              <Image
                src="/images/lolah/lolah.webp"
                alt="Lolah Photography portrait"
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.32em] text-yellow-300/90">
              About Lolah Photography
            </p>

            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
              Capturing Stories That Last a Lifetime
            </h2>

            <h3 className="mt-6 font-serif text-2xl text-yellow-100 md:text-3xl">
              Capturing Love Beyond Photographs
            </h3>

            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-yellow-200/90">
              Founder: Ifeoluwa T. Olajide
            </p>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-300 md:text-lg">
              <p>
                At Lolah Photography, we believe every wedding deserves to be
                remembered as beautifully as it was experienced. Every smile,
                every embrace, every joyful tear and every unforgettable moment
                is carefully documented with creativity, elegance and purpose.
              </p>

              <p>
                We specialize in luxury weddings, traditional ceremonies, bridal
                portraits and engagement sessions, creating timeless imagery
                that reflects the unique story of every couple.
              </p>

              <p>
                Our approach combines artistic vision with genuine storytelling,
                allowing you to relive the emotions of your wedding day for
                generations to come. From the quiet anticipation before the
                ceremony to the celebration on the dance floor, every image is
                crafted with exceptional attention to detail.
              </p>

              <p>
                Whether your wedding is an intimate celebration or a grand
                destination event, Lolah Photography is dedicated to creating
                photographs that become treasured family heirlooms.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature}
                  className="rounded-2xl border border-yellow-200/20 bg-white/[0.03] px-5 py-4"
                >
                  <p className="text-sm uppercase tracking-[0.18em] text-yellow-200">
                    ✓ {feature}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black shadow-[0_10px_34px_rgba(234,179,8,0.26)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-[0_16px_44px_rgba(234,179,8,0.4)]"
              >
                Book Your Wedding
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 rounded-3xl border border-yellow-200/15 bg-white/[0.02] p-6 md:grid-cols-4 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {stats.map((item) => (
            <article key={item.label} className="text-center">
              <CountUp value={item.value} suffix={item.suffix} />
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-300 md:text-sm">
                {item.label}
              </p>
            </article>
          ))}
        </motion.div>

        <motion.div
          className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-white/[0.03] via-white/[0.015] to-white/[0.03] px-6 py-12 text-center md:px-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/85">
            Let&apos;s Tell Your Story
          </p>
          <p className="mx-auto mt-5 max-w-3xl font-serif text-2xl text-[#fff8ed] md:text-3xl">
            Your wedding deserves photographs that remain timeless for
            generations.
          </p>

          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-yellow-300/80 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-yellow-100 transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-300/10 hover:shadow-[0_0_32px_rgba(250,204,21,0.22)]"
            >
              Book Your Session
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
