export const cloudinaryFolderMap = {
  hero: "Hero",
  about: "About",
  logo: "Logo",
  serviceBySlug: {
    weddings: "Weddings",
    "traditional-weddings": "Traditional",
    engagements: "Engagements",
    "bridal-portraits": "Bridal Portraits",
    maternity: "Maternity",
    "baby-newborn": "Baby And Newborn",
    family: "Family",
    birthday: "Birthday Photography",
    "corporate-portraits": "Corporate Portraits",
    events: "Events",
    "drone-photography": "Drones Photography And Videography",
  },
} as const;

export const portfolioServiceSlugOrder = [
  "weddings",
  "traditional-weddings",
  "engagements",
  "bridal-portraits",
  "corporate-portraits",
  "family",
  "events",
  "baby-newborn",
  "birthday",
  "maternity",
  "drone-photography",
] as const;

export const portfolioCategoryOrder = portfolioServiceSlugOrder.map(
  (slug) => cloudinaryFolderMap.serviceBySlug[slug]
);

export function getCloudinaryFolderByServiceSlug(slug: string) {
  return (
    cloudinaryFolderMap.serviceBySlug[
      slug as keyof typeof cloudinaryFolderMap.serviceBySlug
    ] ?? null
  );
}
