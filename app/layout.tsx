import type { Metadata } from "next";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import BrandLoader from "@/components/ui/BrandLoader";
import FloatingSocial from "@/components/ui/FloatingSocial";
import { cloudinaryFolderMap } from "@/constants/cloudinary-folders";
import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const heroImage = await getCloudinaryFolderImage(cloudinaryFolderMap.hero, {
    width: 1200,
    height: 630,
  }).catch(() => null);

  const ogImages = heroImage
    ? [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Lolah Photography | Luxury Wedding Photographer in Ibadan",
      template: "%s | Lolah Photography",
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [
      "Lolah Photography",
      "wedding photographer Ibadan",
      "luxury wedding photography Nigeria",
      "bridal portraits",
      "traditional wedding photographer",
    ],
    authors: [{ name: "Lolah Photography" }],
    creator: "Lolah Photography",
    publisher: "Lolah Photography",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: siteConfig.url,
      title: "Lolah Photography | Luxury Wedding Photographer in Ibadan",
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: "Lolah Photography | Luxury Wedding Photographer in Ibadan",
      description: siteConfig.description,
      images: heroImage ? [heroImage.src] : undefined,
      creator: "@lolah.photography",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/icon",
      shortcut: "/icon",
      apple: "/icon",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const heroImage = await getCloudinaryFolderImage(cloudinaryFolderMap.hero, {
    width: 1200,
    height: 630,
  }).catch(() => null);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    ...(heroImage ? { image: heroImage.src } : {}),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: "Nigeria",
    sameAs: [siteConfig.instagram, siteConfig.whatsapp],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-NG",
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BrandLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <FloatingSocial />
      </body>
    </html>
  );
}
