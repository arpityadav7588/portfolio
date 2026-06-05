"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";

const TimelineScene3D = dynamic(
  () => import("@/components/3d/TimelineScene3D"),
  { ssr: false }
);

export function EducationSection() {
  const timeline = [
    {
      year: "2024 – Present",
      title: "B.Tech in Electronics & Communications Engineering",
      institution: "University of Technology",
      description: "Second-year undergraduate specializing in VLSI design, embedded systems, and signal processing. Active member of the Electronics Club and Robotics Society, leading hardware design workshops and organizing hackathons. Current CGPA: 8.5/10.",
      highlights: ["CGPA: 8.5/10", "Electronics Club Lead", "Robotics Society Member", "Dean's List"],
    },
    {
      year: "2022 – 2024",
      title: "Higher Secondary (XII) — PCM + Computer Science",
      institution: "Senior Secondary School",
      description: "Completed with Physics, Chemistry, Mathematics, and Computer Science. Built foundational skills in C/C++ programming, digital logic, and circuit analysis. Scored 92% and won the regional science fair with an IoT-based smart irrigation prototype.",
      highlights: ["92% in Boards", "Science Fair Winner", "CS Fundamentals"],
    },
    {
      year: "Ongoing",
      title: "Self-Directed Learning & Certifications",
      institution: "NPTEL / Coursera / Open-Source",
      description: "Pursuing continuous learning in FPGA design, embedded Linux, and full-stack development. Contributing to open-source hardware projects on GitHub and maintaining a technical blog on VLSI verification and embedded firmware patterns.",
      highlights: ["NPTEL VLSI Cert", "Open-Source Contributor", "Technical Blog Author"],
    },
  ];

  return (
    <AnimatedSection id="education" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">Timeline</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education & <span className="text-accent text-glow-emerald">Growth</span>
          </h2>
        </div>

        {/* 3D Timeline */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="350px" />}>
            <TimelineScene3D />
          </Suspense>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-violet/40" />
          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Timeline node dot in the center */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-6 animate-pulse-glow" />
                  
                  {/* Card Container */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="glass-card rounded-xl p-5">
                      <Badge variant="outline" className="text-xs border-primary/50 text-primary mb-2">{item.year}</Badge>
                      <h3 className="text-lg font-bold leading-snug mb-1">{item.title}</h3>
                      <p className="text-sm text-primary/70 mb-2">{item.institution}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.highlights.map((h) => (
                          <Badge key={h} variant="secondary" className="text-[9px] bg-accent/10 text-accent border-accent/20">{h}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer to align alternating sides on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
