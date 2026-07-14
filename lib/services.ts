import type { FaqItem, FeatureCard, GalleryImage, TestimonialItem, TimelineStep } from "@/components/services/ServicePageClient";
import { getCloudinaryFolderByServiceSlug } from "@/constants/cloudinary-folders";

export type ServiceSlug =
  | "weddings"
  | "traditional-weddings"
  | "engagements"
  | "bridal-portraits"
  | "maternity"
  | "baby-newborn"
  | "family"
  | "birthday"
  | "corporate-portraits"
  | "events"
  | "drone-photography";

export type ServiceDefinition = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  folderName: string;
  themeLabel: string;
  keywords: string[];
  aboutParagraphs: string[];
  featureCards: FeatureCard[];
  galleryImages: GalleryImage[];
  timelineSteps: TimelineStep[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
};

type ServiceDefinitionSeed = {
  title: string;
  shortTitle: string;
  subtitle: string;
  themeLabel: string;
  keywords: string[];
};

const serviceSeeds: Record<ServiceSlug, ServiceDefinitionSeed> = {
  weddings: {
    title: "Wedding Photography",
    shortTitle: "Weddings",
    subtitle:
      "Elegant wedding storytelling designed to preserve every emotion, every detail, and every unforgettable moment.",
    themeLabel: "Wedding Stories",
    keywords: ["luxury wedding photographer", "wedding photography nigeria", "ibadan wedding photographer"],
  },
  "traditional-weddings": {
    title: "Traditional Wedding Photography",
    shortTitle: "Traditional Weddings",
    subtitle:
      "Rich cultural storytelling that honors heritage, family, and the beauty of a deeply meaningful celebration.",
    themeLabel: "Cultural Celebration",
    keywords: ["traditional wedding photography", "nigerian traditional wedding", "cultural wedding photos"],
  },
  engagements: {
    title: "Engagement Photography",
    shortTitle: "Engagements",
    subtitle:
      "Romantic imagery shaped around connection, anticipation, and the quiet excitement before the big day.",
    themeLabel: "Pre-Wedding Romance",
    keywords: ["engagement photographer", "pre wedding photos", "couples photography"],
  },
  "bridal-portraits": {
    title: "Bridal Portrait Photography",
    shortTitle: "Bridal Portraits",
    subtitle:
      "Refined bridal imagery that celebrates beauty, grace, and the luminous stillness before the ceremony begins.",
    themeLabel: "Editorial Bridal",
    keywords: ["bridal portraits", "bride photography", "luxury bridal session"],
  },
  maternity: {
    title: "Maternity Photography",
    shortTitle: "Maternity",
    subtitle:
      "Soft, elegant maternity imagery that celebrates anticipation, tenderness, and the beauty of becoming.",
    themeLabel: "Expecting Motherhood",
    keywords: ["maternity photographer", "pregnancy photos", "maternity portraits"],
  },
  "baby-newborn": {
    title: "Baby & Newborn Photography",
    shortTitle: "Baby & Newborn",
    subtitle:
      "Gentle newborn and baby portraits created with warmth, patience, and an heirloom-quality finish.",
    themeLabel: "Tiny Heirlooms",
    keywords: ["newborn photography", "baby photographer", "infant portraits"],
  },
  family: {
    title: "Family Photography",
    shortTitle: "Family",
    subtitle:
      "Joyful family portraits that feel natural, connected, and timeless enough to live on for generations.",
    themeLabel: "Family Legacy",
    keywords: ["family photographer", "family portraits", "lifestyle family session"],
  },
  birthday: {
    title: "Birthday Photography",
    shortTitle: "Birthday",
    subtitle:
      "Luxury birthday coverage that turns milestone celebrations into vivid, stylish, and memorable keepsakes.",
    themeLabel: "Milestone Events",
    keywords: ["birthday photographer", "event portrait photography", "milestone celebration photos"],
  },
  "corporate-portraits": {
    title: "Corporate Portrait Photography",
    shortTitle: "Corporate Portraits",
    subtitle:
      "Professional portraiture for leaders, creatives, and brands that want a premium visual presence.",
    themeLabel: "Executive Portraiture",
    keywords: ["corporate portraits", "professional headshots", "brand photography"],
  },
  events: {
    title: "Corporate Event Photography",
    shortTitle: "Events",
    subtitle:
      "High-end corporate and private event coverage delivered with discretion, polish, and cinematic perspective.",
    themeLabel: "Corporate Coverage",
    keywords: ["event photographer", "corporate event photography", "brand event coverage"],
  },
  "drone-photography": {
    title: "Drone Photography & Videography",
    shortTitle: "Drone",
    subtitle:
      "Aerial visuals that add scale, drama, and a cinematic sense of place to premium productions and events.",
    themeLabel: "Aerial Storytelling",
    keywords: ["drone photography", "aerial videography", "event drone coverage"],
  },
};

function buildAboutParagraphs(title: string, tone: string) {
  return [
    `${title} at Lolah Photography is created for clients who want their moments treated with intention and elevated into something that feels timeless. The process starts with understanding the emotional weight of the occasion so the imagery can reflect the atmosphere rather than just the events.`,
    `The work is built around story. That means paying attention to the quiet gestures, the layered relationships, and the beautiful tension that exists in real moments. ${tone} Every image is shaped to feel alive when viewed today and still beautiful years from now.`,
    "The experience stays calm and personal from start to finish. That gives space for authentic expression, graceful direction, and a premium client journey that never feels rushed or generic.",
    "Whether the project is intimate or large-scale, the outcome is meant to feel cohesive, luxurious, and emotionally true, with images that can be printed, framed, shared, and remembered with pride.",
  ];
}

function buildFeatureCards(): FeatureCard[] {
  return [
    { icon: "trophy", title: "Award Winning Photography", description: "A polished visual approach that feels editorial, elegant, and intentionally composed." },
    { icon: "sparkles", title: "Professional Retouching", description: "Retouching is refined, natural, and balanced to keep the final gallery premium without feeling artificial." },
    { icon: "lightbulb", title: "Luxury Editing", description: "Rich tones, soft contrast, and a cohesive finish create a signature luxury look across the gallery." },
    { icon: "gem", title: "Creative Direction", description: "Gentle direction helps every subject feel confident, comfortable, and beautifully photographed." },
    { icon: "clock3", title: "Fast Delivery", description: "Delivery is streamlined so clients can enjoy their memories quickly without compromising quality." },
    { icon: "bookOpenText", title: "Premium Albums", description: "Luxury albums are available to transform the final story into a physical heirloom." },
  ];
}

function buildTimeline(): TimelineStep[] {
  return [
    { number: "01", title: "Consultation", icon: "award", description: "A thoughtful conversation to understand the vision, schedule, and emotional tone of the session." },
    { number: "02", title: "Planning", icon: "gem", description: "The session is planned with care so every important moment has room to unfold naturally." },
    { number: "03", title: "Photography Session", icon: "sparkles", description: "The shoot moves with calm guidance and an editorial eye for expressive, flattering imagery." },
    { number: "04", title: "Professional Editing", icon: "clock3", description: "Selected frames are refined into a cohesive luxury gallery with timeless color and texture." },
    { number: "05", title: "Final Delivery", icon: "album", description: "Your final collection is delivered in a polished format ready for sharing, printing, and archiving." },
  ];
}

function buildFaqs(title: string): FaqItem[] {
  return [
    { question: `What is included in ${title.toLowerCase()}?`, answer: `The service includes a premium photography experience, thoughtfully guided coverage, and a curated final gallery designed to preserve the story beautifully.` },
    { question: "How do I book a session?", answer: "Use the booking form or WhatsApp link to start the conversation. Availability, package guidance, and next steps are shared personally." },
    { question: "Do you travel outside Ibadan?", answer: "Yes. Coverage is available across Nigeria, and destination projects can be arranged based on the location and brief." },
    { question: "Can I request a custom shot list?", answer: "Yes. The planning stage is collaborative, so specific must-have moments and creative priorities can be discussed in advance." },
    { question: "Do you offer albums?", answer: "Premium album options are available for clients who want the final story presented as a luxury heirloom." },
    { question: "How long does delivery take?", answer: "Delivery timelines vary by project, but the process is optimized for both speed and quality." },
  ];
}

function buildTestimonials(title: string): TestimonialItem[] {
  return [
    { quote: `${title} felt effortless from the first call to the final gallery. The images are beautiful, emotional, and completely us.`, name: "Amina & Tunde", role: "Luxury Wedding Clients" },
    { quote: "Lolah understood the mood we wanted immediately. The photos feel polished, warm, and deeply personal.", name: "Bola S.", role: "Portrait Client" },
    { quote: "The entire experience was calm, premium, and professional. The final result exceeded every expectation.", name: "Dami R.", role: "Corporate Client" },
  ];
}

function createServiceDefinition(slug: ServiceSlug): ServiceDefinition {
  const seed = serviceSeeds[slug];
  const folderName = getCloudinaryFolderByServiceSlug(slug);

  if (!folderName) {
    throw new Error(`Missing Cloudinary folder mapping for service slug: ${slug}`);
  }

  return {
    slug,
    title: seed.title,
    shortTitle: seed.shortTitle,
    subtitle: seed.subtitle,
    description: seed.subtitle,
    folderName,
    themeLabel: seed.themeLabel,
    keywords: [
      ...seed.keywords,
      "Lolah Photography",
      "luxury photography Nigeria",
      "premium photography services",
      "cinematic photography",
    ],
    aboutParagraphs: buildAboutParagraphs(seed.title, "The focus stays on presence, emotion, and polished storytelling."),
    featureCards: buildFeatureCards(),
    galleryImages: [],
    timelineSteps: buildTimeline(),
    faqs: buildFaqs(seed.title),
    testimonials: buildTestimonials(seed.title),
  };
}

export const services: ServiceDefinition[] = [
  createServiceDefinition("weddings"),
  createServiceDefinition("traditional-weddings"),
  createServiceDefinition("engagements"),
  createServiceDefinition("bridal-portraits"),
  createServiceDefinition("maternity"),
  createServiceDefinition("baby-newborn"),
  createServiceDefinition("family"),
  createServiceDefinition("birthday"),
  createServiceDefinition("corporate-portraits"),
  createServiceDefinition("events"),
  createServiceDefinition("drone-photography"),
];

export const featuredServices = services.slice(0, 6);

export function getServiceBySlug(slug: ServiceSlug) {
  return services.find((service) => service.slug === slug);
}