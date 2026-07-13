import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/portfolio",
    "/booking",
    "/contact",
    "/services",
    "/services/weddings",
    "/services/traditional-weddings",
    "/services/engagements",
    "/services/bridal-portraits",
    "/services/maternity",
    "/services/baby-newborn",
    "/services/family",
    "/services/birthday",
    "/services/corporate-portraits",
    "/services/events",
    "/services/drone-photography",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}