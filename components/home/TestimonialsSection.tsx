"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
  name: string;
  quote: string;
  imageSrc: string;
  imageBlurDataURL?: string;
};

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6500);

    return () => clearInterval(id);
  }, [testimonials.length]);

  const previous = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section className="bg-[#0b0907] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="text-xs uppercase tracking-[0.32em] text-yellow-300/90"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Client Testimonials
        </motion.p>

        <motion.h2
          className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Words from Couples We&apos;ve Served
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-stretch">
          <article className="overflow-hidden rounded-3xl border border-yellow-200/15 lg:col-span-5">
            <Image
              src={current.imageSrc}
              alt={current.name}
              width={1000}
              height={1200}
              placeholder={current.imageBlurDataURL ? "blur" : "empty"}
              blurDataURL={current.imageBlurDataURL}
              className="h-full w-full min-h-[380px] object-cover md:min-h-[460px]"
            />
          </article>

          <article className="rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-8 lg:col-span-7 lg:p-12">
            <p className="text-xl tracking-[0.16em] text-yellow-300">★★★★★</p>
            <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-[#fff8ed] md:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <p className="mt-8 text-sm uppercase tracking-[0.22em] text-gray-300">
              {current.name}
            </p>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={previous}
                className="rounded-full border border-yellow-300/50 p-2.5 text-yellow-100 transition hover:bg-yellow-300/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full border border-yellow-300/50 p-2.5 text-yellow-100 transition hover:bg-yellow-300/10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="ml-2 flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === active
                        ? "w-8 bg-yellow-300"
                        : "w-2.5 bg-yellow-100/45"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
