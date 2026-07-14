"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceDefinition } from "@/lib/services";

type ServiceGridProps = {
  services: Array<
    ServiceDefinition & {
      imageSrc: string;
      imageAlt: string;
      imageBlurDataURL?: string;
    }
  >;
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => {
        return (
          <motion.article
            key={service.slug}
            className="group relative overflow-hidden rounded-[2rem] border border-yellow-200/15 bg-white/[0.03] shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative h-[340px] overflow-hidden">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                placeholder={service.imageBlurDataURL ? "blur" : "empty"}
                blurDataURL={service.imageBlurDataURL}
                className="object-cover transition duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.26em] text-yellow-300/90">
                  {service.themeLabel}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-[#fff7ea]">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-gray-200/90">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-yellow-400"
              >
                Explore Service
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}