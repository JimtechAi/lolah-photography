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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PortfolioPreview />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ExperienceTimelineSection />
      <InstagramGallerySection />
      <BookingCTASection />
      <Footer />
    </>
  );
}