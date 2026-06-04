"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Binary, Signal, Radio, Microchip, Layers, Brain, Antenna, Trophy, Award, GitBranch, FileText, Sparkles, Github, Lightbulb
} from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";

const OscilloscopeScene3D = dynamic(
  () => import("@/components/3d/OscilloscopeScene3D"),
  { ssr: false }
);
const DNAHelixScene3D = dynamic(
  () => import("@/components/3d/DNAHelixScene3D"),
  { ssr: false }
);
const LogicGatesScene3D = dynamic(
  () => import("@/components/3d/LogicGatesScene3D"),
  { ssr: false }
);

export function ResearchSection() {
  const researchInterests = [
    {
      title: "Low-Power VLSI Architectures",
      desc: "Exploring sub-threshold logic design, clock gating strategies, and power-aware RTL synthesis for energy-constrained IoT edge nodes. Investigating approximate computing trade-offs for signal processing workloads where bounded error is acceptable.",
      tags: ["Sub-threshold", "Clock Gating", "Power-Aware Synthesis", "Approximate Computing"],
      icon: Microchip, color: "primary",
    },
    {
      title: "Hardware-Software Co-Design",
      desc: "Researching partitioning strategies that optimally distribute computation between FPGA fabric and soft processor cores for real-time control systems. Focus on minimizing context-switch latency and maximizing deterministic timing guarantees.",
      tags: ["FPGA SoC", "Partitioning", "Deterministic Timing", "AXI Interconnect"],
      icon: Layers, color: "accent",
    },
    {
      title: "Embedded Machine Learning (TinyML)",
      desc: "Investigating quantization-aware training and model pruning techniques for deploying neural network inference on ARM Cortex-M and ESP32 microcontrollers. Benchmarking latency, memory footprint, and energy per inference across model architectures.",
      tags: ["Quantization", "Pruning", "TFLite Micro", "Edge Inference"],
      icon: Brain, color: "violet",
    },
    {
      title: "RF & Antenna Systems for IoT",
      desc: "Studying miniaturized antenna designs for sub-GHz LoRa and 2.4 GHz BLE dual-band IoT devices. Characterizing impedance matching networks and radiation patterns using EM simulation and VNA measurements for compact PCB-integrated antennas.",
      tags: ["LoRa", "BLE", "VNA", "Impedance Matching"],
      icon: Antenna, color: "primary",
    },
  ];

  const achievements = [
    { title: "Regional Science Fair Winner", year: "2023", desc: "IoT Smart Irrigation Prototype — 1st Place", icon: Trophy, color: "primary" },
    { title: "Hackathon Top 3 Finish", year: "2024", desc: "24-hour embedded systems hackathon — STM32 category", icon: Trophy, color: "accent" },
    { title: "Dean's List — 2 Semesters", year: "2024-25", desc: "CGPA above 8.5 for consecutive semesters", icon: Award, color: "violet" },
    { title: "Open-Source Contributor", year: "Ongoing", desc: "5+ merged PRs on hardware/FPGA repositories", icon: GitBranch, color: "primary" },
    { title: "Technical Blog — 2K+ Views", year: "Ongoing", desc: "VLSI verification and embedded firmware articles", icon: FileText, color: "accent" },
    { title: "Workshop Lead — 3 Events", year: "2024-25", desc: "PCB design and FPGA workshops for 50+ students", icon: Lightbulb, color: "violet" },
  ];

  const openSource = [
    { name: "riscv-core-verif", desc: "UVM testbench library for RV32I cores", lang: "SystemVerilog", stars: "12" },
    { name: "esp32-power-profiler", desc: "Power consumption analysis tool for ESP32", lang: "Python", stars: "8" },
    { name: "kiced-theme-dark", desc: "Dark theme for KiCad schematic/PCB editor", lang: "CSS", stars: "15" },
    { name: "fpga-fft-accel", desc: "FFT accelerator on Xilinx Artix-7", lang: "Verilog", stars: "6" },
  ];

  return (
    <AnimatedSection id="research" className="py-24 px-4 bg-grid-dense">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-violet/50 text-violet">Deep Dive</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Research & <span className="text-violet text-glow-violet">Interactive</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Active research directions, live 3D demos, achievements, and open-source contributions
          </p>
        </div>

        {/* 3D Oscilloscope Demo */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Activity size={18} className="text-primary" /> Live Oscilloscope — WebGL Shader
          </h3>
          <div className="glass-card rounded-2xl p-4 overflow-hidden">
            <Suspense fallback={<Scene3DFallback height="350px" />}>
              <OscilloscopeScene3D />
            </Suspense>
          </div>
        </div>

        {/* 3D DNA Helix — Research */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Microchip size={18} className="text-violet" /> Double Helix — Research DNA
          </h3>
          <div className="glass-card-violet rounded-2xl p-4 overflow-hidden">
            <Suspense fallback={<Scene3DFallback height="400px" />}>
              <DNAHelixScene3D />
            </Suspense>
          </div>
        </div>

        {/* 3D Logic Gates Demo */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Binary size={18} className="text-accent" /> Digital Logic — 3D Gate Visualization
          </h3>
          <div className="glass-card-accent rounded-2xl p-4 overflow-hidden">
            <Suspense fallback={<Scene3DFallback height="350px" />}>
              <LogicGatesScene3D />
            </Suspense>
          </div>
        </div>

        <div className="section-divider mb-16" />

        {/* Research Interests */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <Award size={18} className="text-violet" /> Research Interests
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {researchInterests.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className={`rounded-xl p-5 h-full ${
                item.color === "primary" ? "glass-card" : item.color === "accent" ? "glass-card-accent" : "glass-card-violet"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    item.color === "primary" ? "bg-primary/10 text-primary" : item.color === "accent" ? "bg-accent/10 text-accent" : "bg-violet/10 text-violet"
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0.5 bg-secondary/50">{tag}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-16" />

        {/* Achievements */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <Trophy size={18} className="text-primary" /> Achievements & Recognition
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {achievements.map((ach, i) => (
            <motion.div key={ach.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
              <div className={`rounded-xl p-4 flex items-start gap-3 ${
                ach.color === "primary" ? "glass-card" : ach.color === "accent" ? "glass-card-accent" : "glass-card-violet"
              }`}>
                <ach.icon size={18} className={
                  ach.color === "primary" ? "text-primary" : ach.color === "accent" ? "text-accent" : "text-violet"
                } />
                <div>
                  <div className="text-sm font-medium text-foreground">{ach.title}</div>
                  <div className="text-[11px] text-muted-foreground">{ach.desc}</div>
                  <Badge variant="outline" className="mt-1 text-[9px] border-border/50">{ach.year}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-16" />

        {/* Open Source */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <GitBranch size={18} className="text-accent" /> Open-Source Contributions
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {openSource.map((repo, i) => (
            <motion.div key={repo.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
              <div className="glass-card rounded-xl p-4 group cursor-pointer hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <Github size={14} className="text-muted-foreground" />
                  <span className="text-sm font-bold text-primary">{repo.name}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
                    <Sparkles size={10} /> {repo.stars}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/70 mb-2">{repo.desc}</p>
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-secondary/50">{repo.lang}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
