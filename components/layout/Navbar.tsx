"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/services";
import CloudinaryLogo from "@/components/ui/CloudinaryLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/");

  const sectionLinks = useMemo(
    () => NAVIGATION.filter((item) => item.href.startsWith("/#")),
    []
  );

  const serviceLinks = useMemo(
    () => services.map((service) => ({ title: service.title, href: `/services/${service.slug}` })),
    []
  );

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionElements = sectionLinks
      .map((item) => {
        const sectionId = item.href.replace("/#", "");
        return document.getElementById(sectionId);
      })
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              right.intersectionRatio - left.intersectionRatio
          )[0];

        if (visibleEntry?.target.id) {
          setActiveHref(`/#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sectionElements.forEach((element) => observer.observe(element));
    const handleHashChange = () => {
      const hash = window.location.hash;
      setActiveHref(hash ? `/${hash}` : "/");
    };

    // Run after mount so server/client initial HTML stays identical.
    const frameId = window.requestAnimationFrame(handleHashChange);

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, sectionLinks]);

  const isHomeActive = pathname === "/" && activeHref === "/";

  return (
    <header className="fade-in fixed top-0 left-0 w-full z-50 isolate border-b border-yellow-500/20 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-2">

        <Link
          href="/"
          className="inline-flex items-center"
        >
          <CloudinaryLogo
            folderName="Logo"
            alt="Lolah Photography"
            width={80}
            height={80}
            priority
            className="h-auto w-[78px] object-contain mix-blend-screen brightness-110"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION.filter((item) => item.title !== "Services" && item.title !== "Book Session").map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={getNavLinkClassName(
                item.href === "/"
                  ? isHomeActive
                  : pathname === "/"
                    ? activeHref === item.href
                    : pathname === item.href
              )}
            >
              {item.title}
            </Link>
          ))}

          <div className="group relative">
            <Link
              href="/services"
              className={getNavLinkClassName(pathname.startsWith("/services")) + " inline-flex items-center gap-1.5"}
            >
              Services
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[360px] -translate-x-1/2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-3xl border border-yellow-200/15 bg-black/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <div className="grid max-h-[60vh] gap-1 overflow-auto">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="rounded-2xl px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-yellow-100"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/booking"
            className="rounded-full bg-yellow-500 px-6 py-2.5 font-medium text-black shadow-[0_8px_28px_rgba(234,179,8,0.26)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-[0_14px_34px_rgba(234,179,8,0.34)]"
          >
            Book Session
          </Link>
        </nav>

      </div>
    </header>
  );
}

function getNavLinkClassName(isActive: boolean) {
  return [
    "text-sm uppercase tracking-[0.12em] transition",
    isActive
      ? "text-yellow-200 drop-shadow-[0_0_14px_rgba(250,204,21,0.5)]"
      : "text-gray-200/90 hover:text-yellow-200",
  ].join(" ");
}