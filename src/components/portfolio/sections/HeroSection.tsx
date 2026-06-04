"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cpu, Code2, Radio, Mail, Download, ChevronDown, ArrowRight, Zap, Microchip
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { OscWaveform } from "../common/OscWaveform";
import { TypingText } from "../common/TypingText";

const HeroScene3D = dynamic(
  () => import("@/components/3d/HeroScene3D"),
  { ssr: false }
);

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden scanline-overlay bg-grid">
      {/* 3D Scene */}
      <Suspense fallback={<Scene3DFallback height="100vh" />}>
        <HeroScene3D />
      </Suspense>

      <OscWaveform />

      {/* Holographic Shimmer Overlay */}
      <div className="absolute inset-0 holo-shimmer pointer-events-none z-5" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 ring-4 ring-primary/10">
              <Image
                src="/arpit-photo-2.png"
                alt="Arpit Yadav"
                width={144}
                height={144}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Zap size={14} className="text-primary-foreground" />
            </div>
            {/* Animated ring pulse */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping-slow" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
          <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/50 text-primary bg-primary/5">
            <Zap size={14} className="mr-2" /> Simulation-First Engineering
          </Badge>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4">
          <span className="text-foreground">Arpit</span> <span className="text-primary text-glow-cyan">Yadav</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="text-xl sm:text-2xl md:text-3xl font-mono text-muted-foreground mb-6">
          <TypingText text="Silicon → Firmware → Full-Stack" speed={70} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[
            { icon: Microchip, label: "VLSI Design" },
            { icon: Cpu, label: "Embedded Systems" },
            { icon: Code2, label: "Full-Stack Dev" },
            { icon: Radio, label: "Signal Processing" },
          ].map((s) => (
            <Badge key={s.label} variant="secondary" className="px-3 py-1.5 text-xs bg-secondary/50 border border-border/50 text-muted-foreground">
              <s.icon size={12} className="mr-1.5 text-primary" /> {s.label}
            </Badge>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          ECE undergraduate designing and validating systems that bridge analog
          front-ends, digital logic, and scalable software — with quantifiable
          power and timing budgets at every layer.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 glow-cyan" asChild>
            <a href="#projects">View Projects <ArrowRight size={18} className="ml-2" /></a>
          </Button>
          <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 px-8" asChild>
            <a href="#contact"><Mail size={18} className="mr-2" /> Get In Touch</a>
          </Button>
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary hover:bg-primary/5 px-6" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><Download size={18} className="mr-2" /> Resume</a>
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={24} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
