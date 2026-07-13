import Link from "next/link";
import { AtSign, Mail, Phone, MapPin } from "lucide-react";
import CloudinaryLogo from "@/components/ui/CloudinaryLogo";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Services", href: "/#services" },
  { title: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070706] px-6 pb-6 pt-16 text-white md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-yellow-200/15 pb-12 md:grid-cols-3">
        <div>
          <Link href="/" className="inline-flex items-center">
            <CloudinaryLogo
              folderName="Logo"
              alt="Lolah Photography logo"
              width={94}
              height={94}
              className="h-auto w-[88px] object-contain mix-blend-screen brightness-110"
            />
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90">Lolah Photography</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-300">
            Luxury wedding photography for couples who value timeless artistry,
            emotional storytelling, and elegant visual legacy.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-300">
            Available for weddings and events anywhere in Nigeria.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-yellow-200">Quick Links</p>
          <ul className="mt-4 space-y-3 text-sm text-gray-300">
            {quickLinks.map((link) => (
              <li key={link.title}>
                <Link className="transition hover:text-yellow-200" href={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-yellow-200">Contact</p>
          <ul className="mt-4 space-y-4 text-sm text-gray-300">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-yellow-300" />
              <Link href="https://wa.me/2348068102500" target="_blank" rel="noreferrer" className="transition hover:text-yellow-200">
                +234 806 810 2500
              </Link>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-yellow-300" />
              <Link href="mailto:booklolahphotography@gmail.com" className="transition hover:text-yellow-200">
                booklolahphotography@gmail.com
              </Link>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-yellow-300" />
              <span>
                Oxygen Evolution School Building, Sowale Complex, Opposite
                Tafotech Filling Station, Eleyele, Ibadan 200116, Oyo State,
                Nigeria.
              </span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="https://instagram.com/lolah.photography"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-yellow-300/40 p-2 text-yellow-100 transition hover:bg-yellow-300/10"
              aria-label="Instagram"
            >
              <AtSign className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>
              <Link
                href="https://instagram.com/lolah.photography"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-yellow-200"
              >
                Instagram: @lolah.photography
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-6">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-gray-400">
          © 2026 Lolah Photography. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
