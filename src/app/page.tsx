import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { LearningRoadmapSection } from "@/components/sections/LearningRoadmapSection";
import { PreparationPaths } from "@/components/sections/PreparationPaths";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508] min-h-screen text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-white">
        <HeroSection />
        <WhyChooseSection />
        <LearningRoadmapSection />
        <PreparationPaths />
        <DashboardShowcase />
        <ProblemSolution />
        <HowItWorks />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

