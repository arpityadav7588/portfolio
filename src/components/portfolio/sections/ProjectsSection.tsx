"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Cpu, Wifi, Bot, Code2, Gauge, Zap, ExternalLink
} from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";
import { TiltCard } from "../common/TiltCard";

const ProjectPipeline3D = dynamic(
  () => import("@/components/3d/ProjectPipeline3D"),
  { ssr: false }
);

export function ProjectsSection() {
  const projects = [
    {
      title: "RISC-V Single-Cycle Processor",
      description: "Designed and verified a 32-bit RISC-V core in SystemVerilog supporting RV32I base integer instruction set. Implemented 5-stage datapath with hazard detection, forwarding logic, and UVM-style testbench achieving 98% functional coverage. Synthesized on Xilinx Artix-7 FPGA at 50 MHz with documented timing closure.",
      tags: ["SystemVerilog", "RISC-V", "FPGA", "UVM", "Vivado"],
      icon: Cpu, color: "primary",
      metrics: [{ label: "Clock", value: "50 MHz" }, { label: "Coverage", value: "98%" }, { label: "LUTs", value: "2.3K" }],
      timeline: { phase: "VLSI Core", quarter: "Q1 2025", status: "completed" as const },
    },
    {
      title: "IoT Environmental Monitor",
      description: "Built a low-power environmental monitoring system using ESP32-S3 with BME680 sensor fusion. Implemented FreeRTOS task scheduling with MQTT over TLS for real-time telemetry to a React dashboard. Achieved 12 mA active / 800 µA deep sleep, running 7+ days on 2000 mAh Li-Po.",
      tags: ["ESP32", "FreeRTOS", "MQTT", "React", "PCB"],
      icon: Wifi, color: "accent",
      metrics: [{ label: "Power", value: "12 mA" }, { label: "Battery", value: "7+ days" }, { label: "Latency", value: "<200ms" }],
      timeline: { phase: "IoT Deploy", quarter: "Q2 2025", status: "completed" as const },
    },
    {
      title: "Autonomous Line-Following Robot",
      description: "Developed a PID-controlled differential-drive robot using STM32F4 and custom 4-layer PCB with IR sensor array. Implemented closed-loop control with tunable Kp/Ki/Kd gains via UART, achieving ±2 mm tracking accuracy at 1.2 m/s. Designed H-bridge motor driver with ESD protection.",
      tags: ["STM32", "PID Control", "PCB", "Embedded C", "Motor"],
      icon: Bot, color: "primary",
      metrics: [{ label: "Speed", value: "1.2 m/s" }, { label: "Accuracy", value: "±2mm" }, { label: "Layers", value: "4-layer" }],
      timeline: { phase: "Robotics", quarter: "Q3 2025", status: "completed" as const },
    },
    {
      title: "Full-Stack Simulation Dashboard",
      description: "Architected a real-time signal visualization platform using Next.js + FastAPI with WebSocket streaming. Renders oscilloscope-style waveforms from ADC data, supports FFT analysis, and provides interactive gain/offset controls. PostgreSQL + Prisma ORM, Docker Compose deployment.",
      tags: ["Next.js", "FastAPI", "WebSocket", "PostgreSQL", "Docker"],
      icon: Code2, color: "accent",
      metrics: [{ label: "Latency", value: "<50ms" }, { label: "FFT", value: "Real-time" }, { label: "Containers", value: "3" }],
      timeline: { phase: "Full-Stack", quarter: "Q4 2025", status: "active" as const },
    },
    {
      title: "Analog Front-End Characterization Suite",
      description: "Designed a Python/MATLAB toolchain for automated characterization of analog circuits — op-amp GBW, CMRR, PSRR. Integrated with Keithley sourcemeters via SCPI/GPIB, generating datasheet-quality PDF reports. Reduced manual measurement time by 80% across 15+ DUTs.",
      tags: ["Python", "MATLAB", "SCPI", "Signal Processing", "Automation"],
      icon: Gauge, color: "primary",
      metrics: [{ label: "Time Saved", value: "80%" }, { label: "DUTs", value: "15+" }, { label: "Params", value: "12" }],
      timeline: { phase: "Automation", quarter: "Q1 2026", status: "active" as const },
    },
    {
      title: "Smart Energy Meter with Prepaid Billing",
      description: "Engineered a prepaid energy meter using ATMega328P with ACS712 current sensing and ZMPT101B voltage sensing at ±1% accuracy. Implemented EEPROM credit management, OLED display, and GSM low-balance alerts. Custom 2-layer PCB with opto-isolation rated 230V/16A.",
      tags: ["ATMega328P", "Sensors", "GSM", "PCB", "Power Electronics"],
      icon: Zap, color: "accent",
      metrics: [{ label: "Accuracy", value: "±1%" }, { label: "Rating", value: "230V/16A" }, { label: "Alerts", value: "SMS" }],
      timeline: { phase: "Power Electronics", quarter: "Q2 2026", status: "upcoming" as const },
    },
  ];

  return (
    <AnimatedSection id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Featured Work</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Project <span className="text-primary text-glow-cyan">Pipeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Production-ready systems from silicon to cloud</p>
        </div>

        {/* 3D Project Pipeline Scene */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="400px" />}>
            <ProjectPipeline3D />
          </Suspense>
        </div>

        {/* ── Pipeline Status Legend ── */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {[
            { label: "Completed", color: "bg-primary", dot: "bg-primary" },
            { label: "In Progress", color: "bg-accent", dot: "bg-accent animate-pulse" },
            { label: "Upcoming", color: "bg-muted-foreground/40", dot: "bg-muted-foreground/40" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
              <span className="text-xs text-muted-foreground font-mono">{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── Project Timeline ── */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-violet/30" />

          {projects.map((project, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-10 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline node dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    project.timeline.status === "completed"
                      ? "border-primary bg-primary/30 shadow-lg shadow-primary/30"
                      : project.timeline.status === "active"
                      ? "border-accent bg-accent/30 shadow-lg shadow-accent/30 animate-pulse"
                      : "border-muted-foreground/40 bg-muted-foreground/10"
                  }`}>
                    {project.timeline.status === "completed" && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                  {/* Connector line to card */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px ${
                    isLeft ? "right-full w-8 bg-primary/20" : "left-full w-8 bg-accent/20"
                  }`} />
                </div>

                {/* Card content — alternates sides on md+ */}
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}>
                  <TiltCard className="perspective-card">
                    <div className={`perspective-card-inner rounded-xl p-5 h-full transition-all duration-500 group ${
                      project.color === "primary" ? "glass-card" : "glass-card-accent"
                    }`}>
                      {/* Phase & Quarter badge */}
                      <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <Badge variant="outline" className={`text-[9px] font-mono px-2 py-0.5 ${
                          project.timeline.status === "completed"
                            ? "border-primary/30 text-primary bg-primary/5"
                            : project.timeline.status === "active"
                            ? "border-accent/30 text-accent bg-accent/5"
                            : "border-muted-foreground/20 text-muted-foreground bg-muted/5"
                        }`}>
                          {project.timeline.quarter}
                        </Badge>
                        <Badge variant="secondary" className="text-[9px] font-mono px-2 py-0.5 bg-secondary/30">
                          {project.timeline.phase}
                        </Badge>
                        {project.timeline.status === "active" && (
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[9px] font-mono text-accent">LIVE</span>
                          </div>
                        )}
                      </div>

                      <div className={`flex items-center justify-between mb-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className={`p-2 rounded-lg ${project.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                          <project.icon size={20} />
                        </div>
                        <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>

                      <h3 className="text-sm font-bold leading-snug mb-1.5">{project.title}</h3>
                      <p className="text-muted-foreground/80 text-[11px] leading-relaxed mb-3">{project.description}</p>

                      <div className="grid grid-cols-3 gap-1.5 py-1.5 mb-2.5">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-center p-1.5 rounded-md bg-secondary/30">
                            <div className="text-[11px] font-bold text-foreground">{m.value}</div>
                            <div className="text-[8px] text-muted-foreground">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[8px] px-1.5 py-0 bg-secondary/50">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}

          {/* Timeline end marker */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 bottom-0">
            <div className="w-3 h-3 rounded-full border-2 border-violet/40 bg-violet/10" />
          </div>
        </div>

        {/* Legacy grid view toggle (collapsed by default) */}
        <details className="mt-8">
          <summary className="text-center cursor-pointer text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
            ▸ Show Grid View
          </summary>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {projects.map((project, i) => (
              <TiltCard key={`grid-${project.title}`} className="perspective-card">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className={`perspective-card-inner rounded-xl p-5 h-full transition-all duration-500 group ${
                    project.color === "primary" ? "glass-card" : "glass-card-accent"
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${project.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                        <project.icon size={22} />
                      </div>
                      <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                    <h3 className="text-base font-bold leading-snug mb-2">{project.title}</h3>
                    <p className="text-muted-foreground/80 text-xs leading-relaxed mb-4">{project.description}</p>

                    <div className="grid grid-cols-3 gap-2 py-2 mb-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center p-1.5 rounded-md bg-secondary/30">
                          <div className="text-xs font-bold text-foreground">{m.value}</div>
                          <div className="text-[9px] text-muted-foreground">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0.5 bg-secondary/50">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </details>
      </div>
    </AnimatedSection>
  );
}
