"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const portfolioImages = [
  {
    src: "/images/portfolio/portfolio1.webp",
    alt: "Luxury wedding portrait",
    title: "Joy & Michael",
    subtitle: "Traditional Wedding",
    category: "Wedding Stories",
    size: "large-left",
  },
  {
    src: "/images/portfolio/portfolio2.webp",
    alt: "Bride and groom candid moment",
    title: "Ada & David",
    subtitle: "Luxury Reception",
    category: "Wedding Stories",
    size: "small-right",
  },
  {
    src: "/images/portfolio/portfolio3.webp",
    alt: "Elegant wedding ceremony frame",
    title: "Bridal Portrait",
    subtitle: "Editorial Session",
    category: "Wedding Stories",
    size: "small-right",
  },
  {
    src: "/images/portfolio/portfolio4.webp",
    alt: "Romantic reception photography",
    title: "Wedding Moments",
    subtitle: "Ceremony Highlights",
    category: "Wedding Stories",
    size: "wide-bottom",
  },
];

const headingMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const leftCardMotion = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0 },
};

const rightCardMotion = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
};

const bottomCardMotion = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioPreview() {
  return (
    <section
      id="portfolio"
      className="bg-[#0d0b08] px-6 py-20 text-white md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="text-xs uppercase tracking-[0.32em] text-yellow-300/90"
          variants={headingMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Portfolio
        </motion.p>

        <motion.h2
          className="mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl"
          variants={headingMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
        >
          OUR SIGNATURE WORK
        </motion.h2>

        <motion.p
          className="mt-3 text-sm uppercase tracking-[0.26em] text-yellow-200/90"
          variants={headingMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Wedding Stories
        </motion.p>

        <motion.p
          className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg"
          variants={headingMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.28, ease: "easeOut" }}
        >
          Every wedding tells a unique story. Explore a curated collection of
          timeless moments, genuine emotions, and elegant celebrations captured
          with artistic precision.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12 md:auto-rows-[300px] md:gap-y-12">
          {portfolioImages.map((image, index) => (
            <motion.article
              key={image.src}
              className={`group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(212,175,55,0.2)] ${
                image.size === "large-left"
                  ? "md:col-span-7 md:row-span-2"
                  : image.size === "small-right"
                    ? "md:col-span-5"
                    : "md:col-span-12 md:mt-1"
              }`}
              variants={
                image.size === "large-left"
                  ? leftCardMotion
                  : image.size === "small-right"
                    ? rightCardMotion
                    : bottomCardMotion
              }
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1500}
                  className={`w-full object-cover transition duration-500 group-hover:scale-[1.05] group-hover:brightness-110 ${
                    image.size === "large-left"
                      ? "h-[620px]"
                      : image.size === "small-right"
                        ? "h-[300px]"
                        : "h-[360px]"
                  }`}
                />

                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
                <p className="absolute left-5 top-5 text-[11px] uppercase tracking-[0.24em] text-yellow-200/95">
                  {image.category}
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-[#fff8ed]">{image.title}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.12em] text-gray-400">
                  {image.subtitle}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          variants={headingMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 rounded-full border border-yellow-300/70 px-8 py-3 text-sm uppercase tracking-[0.2em] text-yellow-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-200/10 hover:text-yellow-100"
          >
            View Full Portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
