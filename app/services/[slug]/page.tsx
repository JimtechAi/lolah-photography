import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ServicePageClient from "@/components/services/ServicePageClient";
import { getCloudinaryFolderImage, getCloudinaryFolderImages } from "@/lib/cloudinary-media";
import { getServiceBySlug, services, type ServiceSlug } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug as ServiceSlug);

  if (!service) {
    return {};
  }

  const canonical = `/services/${service.slug}`;
  const heroImage = await getCloudinaryFolderImage(service.folderName, {
    width: 1200,
    height: 630,
  });

  return {
    title: service.title,
    description: service.subtitle,
    keywords: service.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${service.title} | Lolah Photography`,
      description: service.subtitle,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Lolah Photography`,
      description: service.subtitle,
      images: [heroImage.src],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug as ServiceSlug);

  if (!service) {
    notFound();
  }

  const galleryImages = await getCloudinaryFolderImages(service.folderName, {
    limit: 500,
  });
  const displayGalleryImages =
    service.slug === "birthday" && galleryImages.length > 1
      ? galleryImages.slice(1)
      : galleryImages;

  const serviceGalleryImages = displayGalleryImages.map((image, index) => ({
    ...image,
    title: image.alt || `${service.shortTitle} image ${index + 1}`,
  }));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    areaServed: "Nigeria",
    description: service.subtitle,
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ServicePageClient
        title={service.title}
        subtitle={service.subtitle}
        heroImage={serviceGalleryImages[0].src}
        heroImageBlurDataURL={serviceGalleryImages[0].blurDataURL}
        aboutParagraphs={service.aboutParagraphs}
        featureCards={service.featureCards}
        galleryImages={serviceGalleryImages}
        timelineSteps={service.timelineSteps}
        faqs={service.faqs}
        testimonials={service.testimonials}
        bookingHref="/booking"
        portfolioHref="/portfolio"
        whatsappHref={siteConfig.whatsapp}
      />

      <Footer />
    </>
  );
}