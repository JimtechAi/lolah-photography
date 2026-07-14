import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function FloatingSocial() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:bottom-6 md:right-6">
      <Link
        href="https://instagram.com/lolah.photography"
        target="_blank"
        rel="noreferrer"
        aria-label="View Lolah Photography on Instagram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)] text-white shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/75"
      >
        <FaInstagram size={26} />
      </Link>

      <Link
        href="https://wa.me/2348068102500"
        target="_blank"
        rel="noreferrer"
        aria-label="Start a WhatsApp chat with Lolah Photography"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/75"
      >
        <FaWhatsapp size={28} />
      </Link>
    </div>
  );
}