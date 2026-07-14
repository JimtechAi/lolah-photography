import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a photography session with Lolah Photography or reach out directly by phone, WhatsApp, Instagram, email, or office visit.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Lolah Photography",
    description:
      "Book a photography session with Lolah Photography or reach out directly by phone, WhatsApp, Instagram, email, or office visit.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Lolah Photography",
    description:
      "Book a photography session with Lolah Photography or reach out directly by phone, WhatsApp, Instagram, email, or office visit.",
  },
};

const contactItems = [
  {
    title: "Phone",
    value: "+234 806 810 2500",
    href: "tel:+2348068102500",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    value: "Chat instantly on WhatsApp",
    href: "https://wa.me/2348068102500",
    icon: MessageCircle,
  },
  {
    title: "Instagram",
    value: "@lolah.photography",
    href: "https://instagram.com/lolah.photography",
    icon: AtSign,
  },
  {
    title: "Email",
    value: "booklolahphotography@gmail.com",
    href: "mailto:booklolahphotography@gmail.com",
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#090806] px-6 pb-20 pt-36 text-white md:px-10 lg:px-16">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[2rem] border border-yellow-200/15 bg-[linear-gradient(180deg,rgba(19,15,11,0.98),rgba(8,8,6,0.96))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-10">
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/85">
              Let&apos;s Talk
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              Let's Capture Your Next Special Moment
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Whether you're planning a wedding, birthday celebration, maternity
              session, family portrait, corporate branding shoot, baby photoshoot
              or special event, we'd love to hear about your vision.
            </p>

            <div className="mt-10">
              <BookingForm
                eyebrow="Luxury Inquiries"
                title="Reserve your consultation"
                submitLabel="Book Consultation"
                showWhatsappLink={false}
              />
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-yellow-200/15 bg-[#120f0c] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/85">
                Contact Details
              </p>
              <div className="mt-6 grid gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-start gap-4 rounded-2xl border border-yellow-200/10 bg-white/5 p-4 transition hover:border-yellow-200/25 hover:bg-white/7"
                    >
                      <span className="mt-0.5 rounded-full bg-yellow-300/12 p-3 text-yellow-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.2em] text-yellow-100/75">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm text-gray-300 md:text-base">
                          {item.value}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[2rem] border border-yellow-200/15 bg-[#120f0c] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <div className="flex items-start gap-4">
                <span className="rounded-full bg-yellow-300/12 p-3 text-yellow-200">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-100/75">
                    Office Address
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
                    Oxygen Evolution School Building, Sowale Complex, Opposite
                    Tafotech Filling Station, Eleyele, Ibadan 200116, Oyo State,
                    Nigeria.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-yellow-200/12">
                <iframe
                  title="Lolah Photography office map"
                  src="https://www.google.com/maps?q=Oxygen%20Evolution%20School%20Building%2C%20Sowale%20Complex%2C%20Eleyele%2C%20Ibadan&z=14&output=embed"
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}