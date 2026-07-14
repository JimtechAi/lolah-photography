import { getCloudinaryFolderImage, getCloudinaryFolderImages } from "@/lib/cloudinary-media";
import { featuredServices } from "@/lib/services";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ExperienceTimelineSection from "@/components/home/ExperienceTimelineSection";
import InstagramGallerySection from "@/components/home/InstagramGallerySection";
import BookingCTASection from "@/components/home/BookingCTASection";
import Footer from "@/components/layout/Footer";
import { cloudinaryFolderMap, portfolioCategoryOrder } from "@/constants/cloudinary-folders";

type PortfolioImage = {
  src: string;
  alt: string;
  blurDataURL: string;
  title: string;
  subtitle: string;
  category: string;
  size: "large-left" | "small-right" | "wide-bottom";
};

type ServiceCard = (typeof featuredServices)[0] & {
  imageSrc: string;
  imageAlt: string;
  imageBlurDataURL: string;
};

type Testimonial = {
  name: string;
  quote: string;
  imageSrc: string;
  imageBlurDataURL: string;
};

export default async function Home() {
  let aboutImage = null;
  try {
    const aboutImages = await getCloudinaryFolderImages(cloudinaryFolderMap.about, {
      limit: 50,
      width: 900,
      height: 1200,
    });
    aboutImage = aboutImages[aboutImages.length - 1] || null;
  } catch (error) {
    console.error("[HomePage] Failed to fetch about images:", error);
  }

  let portfolioImages: PortfolioImage[] = [];
  try {
    const portfolioSourceFolders = portfolioCategoryOrder.slice(0, 4);
    portfolioImages = await Promise.all(
      portfolioSourceFolders.map(async (folderName, index) => {
        try {
          const image = await getCloudinaryFolderImage(folderName, {
            width: 1200,
            height: 1500,
          });

          return {
            src: image.src,
            alt: image.alt,
            blurDataURL: image.blurDataURL,
            title:
              index === 0
                ? "Joy & Michael"
                : index === 1
                  ? "Ada & David"
                  : index === 2
                    ? "Bridal Portrait"
                    : "Wedding Moments",
            subtitle:
              index === 0
                ? "Traditional Wedding"
                : index === 1
                  ? "Luxury Reception"
                  : index === 2
                    ? "Editorial Session"
                    : "Ceremony Highlights",
            category: "Wedding Stories",
            size: (index === 0 ? "large-left" : index === 3 ? "wide-bottom" : "small-right") as "large-left" | "small-right" | "wide-bottom",
          };
        } catch (err) {
          console.error(`[HomePage] Failed to fetch portfolio image ${index}:`, err);
          return null;
        }
      })
    ).then((items) => items.filter((item): item is NonNullable<typeof item> => item !== null));
  } catch (error) {
    console.error("[HomePage] Failed to fetch portfolio images:", error);
  }

  let serviceCards: ServiceCard[] = [];
  try {
    serviceCards = await Promise.all(
      featuredServices.map(async (service) => {
        try {
          const image = await getCloudinaryFolderImage(service.folderName, {
            width: 1200,
            height: 1400,
          });

          return {
            ...service,
            imageSrc: image.src,
            imageAlt: image.alt,
            imageBlurDataURL: image.blurDataURL,
          };
        } catch (err) {
          console.error(`[HomePage] Failed to fetch service image for ${service.title}:`, err);
          return {
            ...service,
            imageSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1400'%3E%3Crect fill='%231a120b' width='1200' height='1400'/%3E%3C/svg%3E",
            imageAlt: `${service.title} (image unavailable)`,
            imageBlurDataURL: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%230b0a08' width='32' height='32'/%3E%3C/svg%3E",
          };
        }
      })
    );
  } catch (error) {
    console.error("[HomePage] Failed to fetch service cards:", error);
  }

  let testimonialImages: Awaited<ReturnType<typeof getCloudinaryFolderImage>>[] = [];
  try {
    const testimonialFolders = portfolioCategoryOrder.slice(0, 3);
    testimonialImages = await Promise.all(
      testimonialFolders.map((folderName) =>
        getCloudinaryFolderImage(folderName, {
          width: 1000,
          height: 1200,
        }).catch((err) => {
          console.error(`[HomePage] Failed to fetch testimonial image from ${folderName}:`, err);
          return null;
        })
      )
    ).then((items) => items.filter((item): item is NonNullable<typeof item> => item !== null));
  } catch (error) {
    console.error("[HomePage] Failed to fetch testimonial images:", error);
  }

  const testimonials: Testimonial[] = [
    {
      name: "Sarah & David",
      quote:
        "Lolah Photography exceeded every expectation. Every photograph tells a story with elegance and emotion.",
      imageSrc: testimonialImages[0]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1200'%3E%3Crect fill='%231a120b' width='1000' height='1200'/%3E%3C/svg%3E",
      imageBlurDataURL: testimonialImages[0]?.blurDataURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%230b0a08' width='32' height='32'/%3E%3C/svg%3E",
    },
    {
      name: "Amara & Tunde",
      quote:
        "From planning to final delivery, the experience felt premium and effortless. We love every frame.",
      imageSrc: testimonialImages[1]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1200'%3E%3Crect fill='%231a120b' width='1000' height='1200'/%3E%3C/svg%3E",
      imageBlurDataURL: testimonialImages[1]?.blurDataURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%230b0a08' width='32' height='32'/%3E%3C/svg%3E",
    },
    {
      name: "Ife & Michael",
      quote:
        "Our wedding memories were captured with such beauty and detail. The album feels timeless.",
      imageSrc: testimonialImages[2]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1200'%3E%3Crect fill='%231a120b' width='1000' height='1200'/%3E%3C/svg%3E",
      imageBlurDataURL: testimonialImages[2]?.blurDataURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%230b0a08' width='32' height='32'/%3E%3C/svg%3E",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <PortfolioPreview images={portfolioImages} />
      {aboutImage ? (
        <AboutSection
          portraitImageSrc={aboutImage.src}
          portraitImageAlt={aboutImage.alt}
          portraitImageBlurDataURL={aboutImage.blurDataURL}
        />
      ) : (
        <div className="bg-[#090806] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-7xl rounded-3xl border border-yellow-200/15 bg-white/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/90">About Section</p>
            <p className="mt-4 text-gray-300">Images are loading. Please refresh the page or check back shortly.</p>
          </div>
        </div>
      )}
      <ServicesSection services={serviceCards} />
      <WhyChooseSection />
      <TestimonialsSection testimonials={testimonials} />
      <ExperienceTimelineSection />
      <InstagramGallerySection />
      <BookingCTASection />
      <Footer />
    </>
  );
}