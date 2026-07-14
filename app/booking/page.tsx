import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BookingForm from "@/components/booking/BookingForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Send your wedding booking request directly to Lolah Photography through a premium inquiry form.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Book a Session | Lolah Photography",
    description:
      "Send your wedding booking request directly to Lolah Photography through a premium inquiry form.",
    url: `${siteConfig.url}/booking`,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Book a Session | Lolah Photography",
    description:
      "Send your wedding booking request directly to Lolah Photography through a premium inquiry form.",
  },
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0907] px-6 pb-20 pt-36 text-white md:px-10 lg:px-16">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] border border-yellow-200/15 bg-[linear-gradient(180deg,rgba(20,16,11,0.96),rgba(8,8,7,0.96))] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.32)] md:p-10">
            <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/85">
              Booking Request
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
              Tell us about your day.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
              Share the details of your wedding or event and Lolah will reply
              personally with availability, package guidance, and next steps.
            </p>

            <div className="mt-10 grid gap-4 text-sm text-gray-300 sm:grid-cols-2">
              <div className="rounded-2xl border border-yellow-200/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-200">
                  Response Time
                </p>
                <p className="mt-3 text-base text-white">Within 24 hours</p>
              </div>

              <div className="rounded-2xl border border-yellow-200/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-200">
                  Based In
                </p>
                <p className="mt-3 text-base text-white">Ibadan, Nigeria</p>
              </div>

              <div className="rounded-2xl border border-yellow-200/10 bg-white/5 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-200">
                  Best For
                </p>
                <p className="mt-3 text-base text-white">
                  Weddings, engagements, traditional ceremonies, and premium
                  event coverage.
                </p>
              </div>
            </div>
          </div>

          <BookingForm />
        </section>
      </main>
      <Footer />
    </>
  );
}