"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Common / Layout Components
import { ScrollProgressBar } from "@/components/portfolio/common/ScrollProgressBar";
import { Navigation } from "@/components/portfolio/layout/Navigation";
import { FloatingSideNav } from "@/components/portfolio/layout/FloatingSideNav";
import { Footer } from "@/components/portfolio/layout/Footer";

// Page Sections
import { HeroSection } from "@/components/portfolio/sections/HeroSection";
import { AboutSection } from "@/components/portfolio/sections/AboutSection";
import { GallerySection } from "@/components/portfolio/sections/GallerySection";
import { SkillsSection } from "@/components/portfolio/sections/SkillsSection";
import { ProtocolsSection } from "@/components/portfolio/sections/ProtocolsSection";
import { ProjectsSection } from "@/components/portfolio/sections/ProjectsSection";
import { LabSection } from "@/components/portfolio/sections/LabSection";
import { ResearchSection } from "@/components/portfolio/sections/ResearchSection";
import { EducationSection } from "@/components/portfolio/sections/EducationSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";

// Global 3D background dynamically imported
const GlobalBackground3D = dynamic(
  () => import("@/components/3d/GlobalBackground3D"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Global 3D Background */}
      <Suspense fallback={null}>
        <GlobalBackground3D />
      </Suspense>
      <ScrollProgressBar />
      <Navigation />
      <FloatingSideNav />
      <div className="scan-line-effect" />
      <main className="flex-1">
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <GallerySection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ProtocolsSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <LabSection />
        <div className="section-divider" />
        <ResearchSection />
        <div className="section-divider" />
        <EducationSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
