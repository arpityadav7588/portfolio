"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Binary, Signal, Radio, Wrench, Zap, Gauge, Spline, ScanLine, Bug, CircuitBoard, Microchip, Award, BookOpen, FlaskConical, FileCode2
} from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";

const CircuitBoardScene3D = dynamic(
  () => import("@/components/3d/CircuitBoardScene3D"),
  { ssr: false }
);

export function LabSection() {
  const labTools = [
    { name: "Digital Storage Oscilloscope", icon: Activity, proficiency: 90, desc: "4-channel Keysight / Rigol DSO for timing analysis, protocol decode, and mixed-signal debugging" },
    { name: "Logic Analyzer", icon: Binary, proficiency: 85, desc: "8+ channel Saleae / Sigrok for digital bus analysis, SPI/I2C/UART protocol decode" },
    { name: "Spectrum Analyzer", icon: Signal, proficiency: 70, desc: "RF spectral measurements, harmonic analysis, EMI pre-compliance scans" },
    { name: "Vector Network Analyzer", icon: Radio, proficiency: 55, desc: "S-parameter measurements, antenna characterization, impedance matching" },
    { name: "Soldering Station (SMH)", icon: Wrench, proficiency: 88, desc: "0402 SMD rework, QFN soldering, hot-air rework, and flux management" },
    { name: "Bench Power Supply", icon: Zap, proficiency: 92, desc: "Dual-channel programmable supply for current-limited bring-up and power profiling" },
    { name: "Multimeter (6.5 digit)", icon: Gauge, proficiency: 90, desc: "Precision voltage/current/resistance measurements, diode test, capacitance measurement" },
    { name: "Function Generator", icon: Spline, proficiency: 82, desc: "AWG for stimulus generation — sine/square/triangle/PWM, AM/FM modulation" },
    { name: "Thermal Camera", icon: ScanLine, proficiency: 72, desc: "PCB hot-spot detection, power dissipation analysis, thermal profiling" },
    { name: "JTAG / SWD Debugger", icon: Bug, proficiency: 85, desc: "OpenOCD + GDB for ARM Cortex-M firmware debug, breakpoint, and flash programming" },
    { name: "KiCad (PCB EDA)", icon: CircuitBoard, proficiency: 78, desc: "Schematic capture, 4-layer PCB layout, DRC/ERC, Gerber generation, 3D viewer" },
    { name: "Vivado / Quartus", icon: Microchip, proficiency: 80, desc: "FPGA synthesis, place-and-route, timing analysis, ILA debugging, bitstream generation" },
  ];

  const certifications = [
    { title: "NPTEL — VLSI Design", issuer: "IIT / NPTEL", year: "2025", icon: Award, color: "primary" },
    { title: "Embedded Systems Design", issuer: "Coursera / UC Boulder", year: "2024", icon: Award, color: "accent" },
    { title: "Full-Stack Web Development", issuer: "Udemy", year: "2024", icon: Award, color: "violet" },
    { title: "FPGA Design Flow", issuer: "Xilinx / AMD", year: "2025", icon: Award, color: "primary" },
    { title: "PCB Design Masterclass", issuer: "Phil's Lab / Udemy", year: "2024", icon: Award, color: "accent" },
  ];

  const publications = [
    {
      title: "Low-Power IoT Sensor Node with Adaptive Duty Cycling",
      venue: "IEEE Student Conference (Under Review)",
      year: "2026",
      desc: "Proposing an adaptive duty-cycling algorithm that reduces average power consumption by 40% in environmental monitoring nodes while maintaining data freshness within configurable latency bounds.",
    },
    {
      title: "Structured Testbench Methodology for RISC-V Cores",
      venue: "National Level Technical Symposium",
      year: "2025",
      desc: "Presented a constrained-random verification approach for RV32I processors achieving 98% functional coverage with automated regression and coverage closure flow.",
    },
  ];

  return (
    <AnimatedSection id="lab" className="py-24 px-4 bg-grid">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">ECE Specifics</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Lab & <span className="text-primary text-glow-cyan">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Tools, certifications, and publications that define my engineering practice</p>
        </div>

        {/* 3D Circuit Board */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="350px" />}>
            <CircuitBoardScene3D />
          </Suspense>
        </div>

        {/* Lab Equipment Grid */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <FlaskConical size={18} className="text-primary" /> Lab Equipment & EDA Proficiency
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {labTools.map((tool, i) => (
            <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }}>
              <div className="glass-card rounded-xl p-4 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <tool.icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                  <span className="ml-auto text-[10px] font-mono text-primary">{tool.proficiency}%</span>
                </div>
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed mb-2">{tool.desc}</p>
                <div className="relative h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.proficiency}%` }}
                    transition={{ duration: 1, delay: i * 0.04 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-16" />

        {/* Certifications */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <Award size={18} className="text-accent" /> Certifications & Courses
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {certifications.map((cert, i) => (
            <motion.div key={cert.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className={`rounded-xl p-4 flex items-start gap-3 ${
                cert.color === "primary" ? "glass-card" : cert.color === "accent" ? "glass-card-accent" : "glass-card-violet"
              }`}>
                <cert.icon size={20} className={
                  cert.color === "primary" ? "text-primary" : cert.color === "accent" ? "text-accent" : "text-violet"
                } />
                <div>
                  <div className="text-sm font-medium text-foreground">{cert.title}</div>
                  <div className="text-[11px] text-muted-foreground">{cert.issuer} • {cert.year}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-16" />

        {/* Publications */}
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <BookOpen size={18} className="text-violet" /> Publications & Presentations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {publications.map((pub, i) => (
            <motion.div key={pub.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="glass-card-violet rounded-xl p-5 h-full">
                <div className="flex items-start gap-2 mb-2">
                  <FileCode2 size={16} className="text-violet mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-snug">{pub.title}</h4>
                    <p className="text-[11px] text-violet/70 mt-0.5">{pub.venue} • {pub.year}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{pub.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
