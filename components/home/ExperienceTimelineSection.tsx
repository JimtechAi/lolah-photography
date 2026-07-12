import { CalendarCheck2, ClipboardPenLine, Camera, Sparkles, BookOpenText } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Book Consultation",
    icon: CalendarCheck2,
  },
  {
    number: "02",
    title: "Planning Session",
    icon: ClipboardPenLine,
  },
  {
    number: "03",
    title: "Wedding Day Coverage",
    icon: Camera,
  },
  {
    number: "04",
    title: "Professional Editing",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "Album Delivery",
    icon: BookOpenText,
  },
];

export default function ExperienceTimelineSection() {
  return (
    <section
      id="experience"
      className="bg-[#090806] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="fade-in-up text-xs uppercase tracking-[0.3em] text-yellow-300/90">
          Wedding Experience Timeline
        </p>

        <h2 className="fade-in-up delay-150 mt-4 font-serif text-4xl leading-tight text-[#fff8ed] md:text-6xl">
          A Smooth Luxury Journey from Start to Finish
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="fade-in-up rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-6 text-center"
              style={{ animationDelay: `${140 + index * 90}ms` }}
            >
              <step.icon
                className="mx-auto h-6 w-6 text-yellow-300"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <p className="mt-5 font-serif text-3xl text-[#fff8ed]">{step.number}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gray-300">
                {step.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
