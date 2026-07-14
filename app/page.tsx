import { getCloudinaryFolderImage } from "@/lib/cloudinary-media";
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

export default async function Home() {
  const aboutImage = await getCloudinaryFolderImage(cloudinaryFolderMap.hero, {
    width: 900,
    height: 1200,
  });

  const portfolioSourceFolders = portfolioCategoryOrder.slice(0, 4);
  const portfolioImages = await Promise.all(
    portfolioSourceFolders.map(async (folderName, index) => {
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
        size: index === 0 ? ("large-left" as const) : index === 3 ? ("wide-bottom" as const) : ("small-right" as const),
      };
    })
  );

  const serviceCards = await Promise.all(
    featuredServices.map(async (service) => {
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
    })
  );

  const testimonialFolders = portfolioCategoryOrder.slice(0, 3);
  const testimonialImages = await Promise.all(
    testimonialFolders.map((folderName) =>
      getCloudinaryFolderImage(folderName, {
        width: 1000,
        height: 1200,
      })
    )
  );

  const testimonials = [
    {
      name: "Sarah & David",
      quote:
        "Lolah Photography exceeded every expectation. Every photograph tells a story with elegance and emotion.",
      imageSrc: testimonialImages[0].src,
      imageBlurDataURL: testimonialImages[0].blurDataURL,
    },
    {
      name: "Amara & Tunde",
      quote:
        "From planning to final delivery, the experience felt premium and effortless. We love every frame.",
      imageSrc: testimonialImages[1].src,
      imageBlurDataURL: testimonialImages[1].blurDataURL,
    },
    {
      name: "Ife & Michael",
      quote:
        "Our wedding memories were captured with such beauty and detail. The album feels timeless.",
      imageSrc: testimonialImages[2].src,
      imageBlurDataURL: testimonialImages[2].blurDataURL,
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <PortfolioPreview images={portfolioImages} />
      <AboutSection
        portraitImageSrc={aboutImage.src}
        portraitImageAlt={aboutImage.alt}
        portraitImageBlurDataURL={aboutImage.blurDataURL}
      />
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