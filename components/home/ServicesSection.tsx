import Link from "next/link";
import {
  Camera,
  Gem,
  Heart,
  Globe,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

const services: Service[] = [
  {
    icon: Camera,
    title: "Luxury Wedding Photography",
    description: "Elegant full-day coverage crafted for timeless storytelling.",
    points: [
      "Full-day wedding coverage",
      "Bride and groom preparation",
      "Ceremony",
      "Reception",
      "Wedding album",
    ],
  },
  {
    icon: UserRound,
    title: "Bridal Portraits",
    description: "Refined portraits that celebrate beauty, detail, and grace.",
    points: [
      "Solo bridal sessions",
      "Editorial posing",
      "Fine art retouching",
    ],
  },
  {
    icon: Gem,
    title: "Traditional Weddings",
    description: "Rich cultural moments captured with respect and elegance.",
    points: [
      "Cultural ceremonies",
      "Family portraits",
      "Reception",
      "Detail photography",
    ],
  },
  {
    icon: Heart,
    title: "Engagement Sessions",
    description: "Romantic storytelling that feels authentic and cinematic.",
    points: [
      "Outdoor locations",
      "Studio sessions",
      "Save-the-date photography",
    ],
  },
  {
    icon: Sparkles,
    title: "Pre-Wedding Photography",
    description: "Creative concepts designed to tell your love story beautifully.",
    points: [
      "Creative concepts",
      "Cinematic locations",
      "Storytelling images",
    ],
  },
  {
    icon: Globe,
    title: "Destination Weddings",
    description: "Seamless luxury coverage for celebrations anywhere in the world.",
    points: [
      "Travel coverage",
      "Multi-day events",
      "International weddings",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#0b0907] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="fade-in-up text-xs uppercase tracking-[0.3em] text-yellow-300/90">
          Our Services
        </p>

        <h2 className="fade-in-up delay-150 mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
          Crafted Coverage for Every Celebration
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="fade-in-up rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-7 shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-1 hover:border-yellow-300/35 hover:shadow-[0_18px_40px_rgba(230,181,63,0.2)]"
              style={{ animationDelay: `${140 + index * 90}ms` }}
            >
              <div className="flex items-center gap-4">
                <service.icon
                  aria-hidden="true"
                  className="h-6 w-6 text-yellow-300"
                  strokeWidth={1.8}
                />
                <h3 className="font-serif text-2xl text-[#fff8ed]">{service.title}</h3>
              </div>

              <p className="mt-4 text-gray-300">{service.description}</p>

              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="fade-in-up delay-600 mt-12 flex justify-center">
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
