"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cloudinaryFolderMap } from "@/constants/cloudinary-folders";
import { NAVIGATION } from "@/constants/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/lib/services";
import CloudinaryLogo from "@/components/ui/CloudinaryLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/");
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownCloseTimeoutRef = useRef<number | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(target)
      ) {
        setIsServicesOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(
    () => () => {
      if (dropdownCloseTimeoutRef.current !== null) {
        window.clearTimeout(dropdownCloseTimeoutRef.current);
      }
    },
    []
  );

  const clearDropdownCloseTimer = () => {
    if (dropdownCloseTimeoutRef.current !== null) {
      window.clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
  };

  const openDropdown = () => {
    clearDropdownCloseTimer();
    setIsServicesOpen(true);
  };

  const closeDropdownWithDelay = () => {
    clearDropdownCloseTimer();
    dropdownCloseTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 120);
  };

  const isHomeActive = pathname === "/" && activeHref === "/";

  return (
    <header className="fade-in fixed top-0 left-0 w-full z-50 isolate border-b border-yellow-500/20 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-2 md:px-8">

        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Go to homepage"
        >
          <CloudinaryLogo
            folderName={cloudinaryFolderMap.logo}
            alt="Lolah Photography"
            width={80}
            height={80}
            priority
            className="h-auto w-[78px] object-contain mix-blend-screen brightness-110"
          />
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-yellow-200/20 bg-white/5 p-3 sm:p-3 text-yellow-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70 md:hidden touch-manipulation active:scale-95"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION.filter((item) => item.title !== "Services" && item.title !== "Book Session").map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => {
                setIsServicesOpen(false);
                setIsMobileMenuOpen(false);
              }}
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

          <div
            ref={desktopMenuRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdownWithDelay}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              onFocus={openDropdown}
              className={getNavLinkClassName(pathname.startsWith("/services")) + " inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70 rounded-full px-2 py-1"}
              aria-haspopup="menu"
              aria-expanded={isServicesOpen}
              aria-controls="services-dropdown"
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            <div
              id="services-dropdown"
              className={`absolute left-1/2 top-full z-50 mt-2 w-[360px] -translate-x-1/2 pt-2 transition duration-200 ${
                isServicesOpen
                  ? "visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdownWithDelay}
              onClick={() => setIsServicesOpen(false)}
              role="menu"
              aria-label="Services menu"
            >
              <div className="rounded-3xl border border-yellow-200/15 bg-black/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <Link
                  href="/services"
                  onClick={() => setIsServicesOpen(false)}
                  className="mb-2 block rounded-2xl border border-yellow-200/15 px-4 py-3 text-sm text-yellow-100 transition hover:bg-white/5"
                  role="menuitem"
                >
                  View All Services
                </Link>
                <div className="grid max-h-[60vh] gap-1 overflow-auto">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-yellow-100"
                      role="menuitem"
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
            onClick={() => {
              setIsServicesOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="rounded-full bg-yellow-500 px-6 py-2.5 font-medium text-black shadow-[0_8px_28px_rgba(234,179,8,0.26)] transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-[0_14px_34px_rgba(234,179,8,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
          >
            Book Session
          </Link>
        </nav>

        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className={`absolute inset-x-4 top-[88px] rounded-3xl border border-yellow-200/15 bg-black/92 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition md:hidden ${
            isMobileMenuOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation" onClick={() => setIsMobileMenuOpen(false)}>
            {NAVIGATION.filter((item) => item.title !== "Services").map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => {
                  setIsServicesOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-2xl px-4 py-4 sm:py-5 text-base sm:text-lg uppercase tracking-[0.12em] text-gray-100 transition hover:bg-white/5 active:scale-95 touch-manipulation"
              >
                {item.title}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              className="mt-2 inline-flex items-center justify-between rounded-2xl px-4 py-4 sm:py-5 text-left text-base sm:text-lg uppercase tracking-[0.12em] text-gray-100 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70 active:scale-95 touch-manipulation"
              aria-expanded={isServicesOpen}
              aria-controls="mobile-services-submenu"
            >
              Services
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            <div
              id="mobile-services-submenu"
              className={`overflow-hidden transition-all duration-200 ${
                isServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-2 grid gap-1 rounded-2xl border border-yellow-200/10 bg-white/[0.03] p-3">
                <Link
                  href="/services"
                  onClick={() => {
                    setIsServicesOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 sm:py-4 text-base text-yellow-100 transition hover:bg-white/5 active:scale-95 touch-manipulation"
                >
                  View All Services
                </Link>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => {
                      setIsServicesOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="rounded-xl px-4 py-3 sm:py-4 text-base text-gray-200 transition hover:bg-white/5 hover:text-yellow-100 active:scale-95 touch-manipulation"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

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