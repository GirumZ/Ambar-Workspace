import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueSection from "@/components/ValueSection";
import PricingSection from "@/components/PricingSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SpacePreviewSection from "@/components/SpacePreviewSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <div className="flex-1 w-full mx-auto">
        <HeroSection />
        <ValueSection />
        <HowItWorksSection />
        <PricingSection />
        <SpacePreviewSection />
        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
