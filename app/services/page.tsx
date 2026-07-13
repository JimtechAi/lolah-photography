import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";
import { featuredServices } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const heroImage = await getCloudinaryFolderImage("Hero", {
    width: 1200,
    height: 630,
  });

  return {
    title: "Services",
    description:
      "Explore the luxury photography services offered by Lolah Photography for weddings, portraits, families, events, maternity, newborns, and commercial work.",
    keywords: [
      "Lolah Photography services",
      "luxury wedding photography",
      "traditional wedding photographer",
      "engagement photography",
      "maternity photographer",
      "corporate portrait photography",
    ],
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title: "Services | Lolah Photography",
      description:
        "Luxury photography services for weddings, portraits, families, events, maternity, newborns, and commercial clients.",
      url: "/services",
      siteName: siteConfig.name,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Services | Lolah Photography",
      description:
        "Luxury photography services for weddings, portraits, families, events, maternity, newborns, and commercial clients.",
      images: [heroImage.src],
    },
  };
}

export default async function ServicesPage() {
  const services = await Promise.all(
    featuredServices.map(async (service) => {
      const image = await getCloudinaryFolderImage(service.folderName, {
        width: 1200,
        height: 1400,
      });

      return {
        ...service,
        imageSrc: image.src,
        imageAlt: image.alt,
      };
    })
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lolah Photography Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `/services/${service.slug}`,
      name: service.title,
    })),
  };

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-[#090806] px-6 pb-20 pt-36 text-white md:px-10 lg:px-16">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.34em] text-yellow-300/90">
            Services
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#fff7ea] md:text-6xl">
            Luxury photography services tailored for every meaningful moment.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            From cinematic weddings to premium corporate portraits and modern family sessions, every service is crafted with the same luxury standard.
          </p>

          <div className="mt-12">
            <ServiceGrid services={services} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
