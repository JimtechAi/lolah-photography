"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Album,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock3,
  BookOpenText,
  Gem,
  Lightbulb,
  MessageCircle,
  Search,
  Sparkles,
  Trophy,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type IconKey =
  | "award"
  | "sparkles"
  | "lightbulb"
  | "clock3"
  | "userRound"
  | "bookOpenText"
  | "trophy"
  | "gem"
  | "album";

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export type FeatureCard = {
  icon: IconKey;
  title: string;
  description: string;
};

export type TimelineStep = {
  number: string;
  title: string;
  description: string;
  icon: IconKey;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

type ServicePageClientProps = {
  title: string;
  subtitle: string;
  heroImage: string;
  aboutParagraphs: string[];
  featureCards: FeatureCard[];
  galleryImages: GalleryImage[];
  timelineSteps: TimelineStep[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  bookingHref: string;
  portfolioHref: string;
  whatsappHref: string;
};

const featureCardGradients = [
  "from-yellow-300/15 to-transparent",
  "from-white/10 to-transparent",
  "from-yellow-200/10 to-transparent",
];

const iconMap: Record<IconKey, LucideIcon> = {
  award: Award,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  clock3: Clock3,
  userRound: UserRound,
  bookOpenText: BookOpenText,
  trophy: Trophy,
  gem: Gem,
  album: Album,
};

export default function ServicePageClient({
  title,
  subtitle,
  heroImage,
  aboutParagraphs,
  featureCards,
  galleryImages,
  timelineSteps,
  faqs,
  testimonials,
  bookingHref,
  portfolioHref,
  whatsappHref,
}: ServicePageClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];

  const galleryHeadingId = useMemo(() => "gallery", []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % galleryImages.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + galleryImages.length) % galleryImages.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, galleryImages.length]);

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? current
        : (current - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % galleryImages.length
    );
  };

  useEffect(() => {
    if (testimonials.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-[#090806] text-white">
      <section className="relative isolate min-h-[92svh] overflow-hidden pt-32 md:pt-36">
        <Image
          src={heroImage}
          alt={`${title} hero background`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] brightness-[0.72]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/56 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-transparent to-black/22" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_74%_34%,rgba(248,211,133,0.22)_0%,rgba(248,211,133,0.08)_26%,rgba(248,211,133,0)_68%)]" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90 md:text-sm">
              Lolah Photography Service Experience
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[1.02] text-[#fff7ea] md:text-6xl lg:text-[5.7rem]">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
              {subtitle}
            </p>

            <p className="mt-6 max-w-xl text-sm uppercase tracking-[0.24em] text-yellow-100/85">
              Crafted for couples and clients who want their story preserved with
              emotion, elegance, and heirloom quality.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_14px_34px_rgba(234,179,8,0.28)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400"
              >
                Book a Session
              </Link>

              <Link
                href={`#${galleryHeadingId}`}
                className="inline-flex items-center justify-center rounded-full border border-white/75 bg-black/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-yellow-300 hover:text-yellow-100"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              About This Service
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              Story-driven imagery that feels intimate, elegant, and timeless.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-5 text-base leading-8 text-gray-300 md:text-lg">
              {aboutParagraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.aside
              className="rounded-[2rem] border border-yellow-200/15 bg-[linear-gradient(180deg,rgba(24,18,12,0.98),rgba(9,8,6,0.94))] p-8 shadow-[0_26px_70px_rgba(0,0,0,0.28)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90">
                Luxury Promise
              </p>
              <p className="mt-5 font-serif text-3xl leading-tight text-[#fff8ea]">
                Every frame is designed to feel like a cherished memory.
              </p>
              <p className="mt-5 text-sm leading-7 text-gray-300 md:text-base">
                From the first conversation to the final gallery delivery, the
                experience is calm, personal, and intentionally refined.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Nigeria-wide", "Coverage for destination and local celebrations."],
                  ["Fine art finish", "Rich, warm, editorial-toned imagery."],
                ].map(([label, copy]) => (
                  <div key={label} className="rounded-2xl border border-yellow-200/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-yellow-100/75">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-300">{copy}</p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              Why Choose Lolah Photography
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              The difference is in the feeling, the finish, and the care.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((card, index) => {
              const Icon = iconMap[card.icon];

              return (
                <motion.article
                  key={card.title}
                  className="group relative overflow-hidden rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${featureCardGradients[index % featureCardGradients.length]} opacity-90`}
                  />
                  <div className="relative z-10">
                    <div className="inline-flex rounded-full border border-yellow-300/20 bg-black/20 p-3 text-yellow-300">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-[#fff8ed]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
                      {card.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id={galleryHeadingId} className="px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              Gallery Preview
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              A cinematic preview of the moments we preserve.
            </h2>
          </motion.div>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryImages.map((image, index) => {
              const isTall = index % 3 === 0;
              const isLarge = index % 4 === 0;

              return (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group mb-5 block w-full overflow-hidden rounded-[1.75rem] border border-yellow-200/10 bg-white/[0.02] text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.04 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className={`${isTall ? "aspect-[4/5]" : isLarge ? "aspect-[4/6]" : "aspect-[4/5]"} relative overflow-hidden`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="object-cover transition duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 opacity-0 transition duration-300 group-hover:opacity-100">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-yellow-100/80">
                          {image.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-200/90">Tap to open</p>
                      </div>
                      <span className="rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur-sm">
                        <Search className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={portfolioHref}
              className="inline-flex items-center justify-center rounded-full border border-yellow-300/80 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300/10 hover:shadow-[0_0_28px_rgba(250,204,21,0.18)]"
            >
              View Full Portfolio
            </Link>

            <Link
              href={bookingHref}
              className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0907] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              Photography Experience Timeline
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              A calm, guided journey from the first hello to final delivery.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {timelineSteps.map((step, index) => {
              const Icon = iconMap[step.icon];

              return (
                <motion.article
                  key={step.number}
                  className="rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-6 text-center shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.06 }}
                >
                  <div className="mx-auto inline-flex rounded-full border border-yellow-300/20 bg-black/25 p-3 text-yellow-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-5 font-serif text-3xl text-[#fff7ea]">{step.number}</p>
                  <h3 className="mt-2 text-sm uppercase tracking-[0.18em] text-yellow-100">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-gray-300">{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              Clear answers before the first shutter ever clicks.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                className="group rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-6 open:border-yellow-300/30"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.04 }}
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-[#fff7ea] transition group-open:text-yellow-100 md:text-lg">
                  {faq.question}
                </summary>
                <p className="mt-4 pr-4 text-sm leading-7 text-gray-300 md:text-base">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0907] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
              Testimonials
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              Words from clients who trusted the experience.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="grid gap-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveTestimonial(index)}
                  className={`rounded-3xl border p-5 text-left transition duration-300 ${
                    activeTestimonial === index
                      ? "border-yellow-300/35 bg-white/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                      : "border-yellow-200/15 bg-white/[0.03] hover:border-yellow-300/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <p className="text-sm leading-7 text-gray-300">{testimonial.quote}</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-yellow-100">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                    {testimonial.role}
                  </p>
                </button>
              ))}
            </div>

            <motion.article
              key={testimonials[activeTestimonial]?.name}
              className="rounded-[2rem] border border-yellow-200/15 bg-[linear-gradient(180deg,rgba(24,18,12,0.98),rgba(9,8,6,0.94))] p-8 shadow-[0_26px_70px_rgba(0,0,0,0.28)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90">
                Featured Review
              </p>
              <p className="mt-6 font-serif text-3xl leading-tight text-[#fff8ea] md:text-4xl">
                “{testimonials[activeTestimonial]?.quote}”
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.2em] text-yellow-100">
                {testimonials[activeTestimonial]?.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                {testimonials[activeTestimonial]?.role}
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="relative overflow-hidden rounded-[2.25rem] border border-yellow-200/15 bg-[linear-gradient(135deg,rgba(20,16,11,0.98),rgba(8,8,7,0.97))] px-6 py-14 text-center md:px-12 md:py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(45%_50%_at_50%_0%,rgba(248,211,133,0.16)_0%,rgba(248,211,133,0)_70%)]" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
                Call to Action
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
                Let&apos;s Create Something Beautiful Together
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                Whether you are planning an intimate celebration or a grand
                wedding story, Lolah Photography is ready to create imagery that
                feels luxurious, warm, and unforgettable.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href={bookingHref}
                  className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400"
                >
                  Book Your Session
                </Link>

                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/75 bg-black/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-yellow-300 hover:text-yellow-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/92 px-4 py-6 backdrop-blur-md md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Service gallery lightbox"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">
              <div className="mb-4 flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-200/85">
                    Gallery Lightbox
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Image {activeIndex === null ? 1 : activeIndex + 1} of {galleryImages.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeLightbox();
                  }}
                  className="rounded-full border border-white/15 bg-white/6 p-3 text-white transition hover:bg-white/12"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 z-10 rounded-full border border-white/15 bg-black/50 p-3 text-white transition hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain px-8 py-8 md:px-16 md:py-10"
                  />
                </motion.div>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 z-10 rounded-full border border-white/15 bg-black/50 p-3 text-white transition hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}