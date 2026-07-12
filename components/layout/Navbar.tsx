"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/");

  const sectionLinks = useMemo(
    () => NAVIGATION.filter((item) => item.href.startsWith("/#")),
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
          <Image
            src="/images/logo/logo.webp"
            alt="Lolah Photography"
            width={80}
            height={80}
            priority
            className="h-auto w-[78px] object-contain mix-blend-screen brightness-110"
          />
        </Link>

        <nav className="hidden md:flex gap-10">

          {NAVIGATION.map((item) => (
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

        </nav>

        <Link
          href="/booking"
          className="hidden md:block rounded-full bg-yellow-500 px-6 py-2.5 font-medium text-black shadow-[0_8px_28px_rgba(234,179,8,0.26)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-[0_14px_34px_rgba(234,179,8,0.34)]"
        >
          Book Session
        </Link>

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