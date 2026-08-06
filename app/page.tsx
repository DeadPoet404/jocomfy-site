import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ImageRhythm } from "@/components/sections/ImageRhythm";
import { Academics } from "@/components/sections/Academics";
import { AcademicStages } from "@/components/sections/AcademicStages";
import { LearningApproach } from "@/components/sections/LearningApproach";
import { StudentLife } from "@/components/sections/StudentLife";
import { GrowthMarquee } from "@/components/sections/GrowthMarquee";
import { Guidance } from "@/components/sections/Guidance";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { Footer } from "@/components/sections/Footer";
import { Philosophy } from "@/components/sections/Philosophy";
import { StatsSection } from "@/components/sections/StatsSection";
import { Voices } from "@/components/sections/Voices";
import { LifeAtJocomfy } from "@/components/sections/LifeAtJocomfy";
import { Leadership } from "@/components/sections/Leadership";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf7] text-[#111111]">
      <Header />
      <Hero />
      <About />
      <ImageRhythm />
      <Academics />
      <StatsSection />  {/* New */}
<Philosophy />    {/* New */}
      <AcademicStages />
      <LifeAtJocomfy />  {/* <-- NEW */}
      <Voices />         {/* <-- NEW */}
      <Leadership />     {/* <-- NEW */}
      <LearningApproach />
      <StudentLife />
      <GrowthMarquee />
      <Guidance />
      <AdmissionsCTA />
      <Footer />
    </main>
  );
}