"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const reasons = [
  "Luxury Experience",
  "Creative Storytelling",
  "Professional Editing",
  "Fast Delivery",
  "Premium Albums",
  "Nationwide & Destination Coverage",
];

const stats: Stat[] = [
  { value: 350, suffix: "+", label: "Happy Couples" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 800, suffix: "+", label: "Projects Completed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl text-[#fff8ed] md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="bg-[#0b0b0b] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="rounded-3xl border border-yellow-200/15 bg-white/[0.02] px-6 py-12 text-center md:px-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.32em] text-yellow-300/90">
            Why Choose Lolah Photography
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
            More Than Photography.
            <br />
            A Timeless Experience.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
            We don&apos;t simply take photographs. We preserve emotions,
            celebrate authentic moments, and create lasting memories that
            families will treasure for generations.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason}
                className="rounded-2xl border border-yellow-200/15 bg-black/25 px-5 py-4"
              >
                <p className="flex items-center gap-2.5 text-sm uppercase tracking-[0.16em] text-yellow-100">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300" />
                  <span>{reason}</span>
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-yellow-200/15 bg-white/[0.02] p-6 md:grid-cols-4 md:p-10"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {stats.map((item) => (
            <article key={item.label} className="text-center">
              <Counter value={item.value} suffix={item.suffix} />
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-300 md:text-sm">
                {item.label}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
