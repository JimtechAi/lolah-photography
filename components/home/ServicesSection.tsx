"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import type { ServiceDefinition } from "@/lib/services";

type ServicesSectionProps = {
  services: Array<
    ServiceDefinition & {
      imageSrc: string;
      imageAlt: string;
      imageBlurDataURL?: string;
    }
  >;
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="bg-[#0b0907] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          Our Services
        </motion.p>

        <motion.h2 className="mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}>
          Comprehensive Photography Services
        </motion.h2>

        <div className="mt-12">
          <ServiceGrid services={services} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
          >
            View All Services
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-yellow-300/80 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300/10 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
          >
            View Packages
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
