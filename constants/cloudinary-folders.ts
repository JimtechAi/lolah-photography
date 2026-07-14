export const portfolioCategoryFolderMap = {
  Hero: "Hero",
  Weddings: "Weddings",
  Traditional: "Traditional",
  Engagements: "Engagements",
  "Bridal Portraits": "Bridal Portraits",
  "Corporate Portraits": "Corporate Portraits",
  Family: "Family",
  Events: "Events",
  "Baby And Newborn": "Baby And Newborn",
  "Birthday Photography": "Birthday Photography",
  Maternity: "Maternity",
  "Drones Photography And Videography": "Drones Photography And Videography",
} as const;

export const portfolioCategoryOrder = [
  "Weddings",
  "Traditional",
  "Engagements",
  "Bridal Portraits",
  "Corporate Portraits",
  "Family",
  "Events",
  "Baby And Newborn",
  "Birthday Photography",
  "Maternity",
  "Drones Photography And Videography",
] as const;

export type PortfolioCategoryName = keyof typeof portfolioCategoryFolderMap;
