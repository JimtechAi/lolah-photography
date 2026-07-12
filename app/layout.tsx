import type { Metadata } from "next";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import BrandLoader from "@/components/ui/BrandLoader";
import FloatingSocial from "@/components/ui/FloatingSocial";
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

export const metadata: Metadata = {
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
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Lolah Photography wedding preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolah Photography | Luxury Wedding Photographer in Ibadan",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
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
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
        <FloatingSocial />
      </body>
    </html>
  );
}
