"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBoard, Cpu, Code2, Signal } from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";

const SkillsScene3D = dynamic(
  () => import("@/components/3d/SkillsScene3D"),
  { ssr: false }
);

export function SkillsSection() {
  const categories = [
    {
      id: "vlsi", label: "VLSI & Hardware", icon: CircuitBoard,
      skills: [
        { name: "Verilog / SystemVerilog", level: 85 },
        { name: "VHDL", level: 75 },
        { name: "FPGA (Xilinx / Vivado)", level: 80 },
        { name: "RTL Design & Verification", level: 82 },
        { name: "Cadence Virtuoso", level: 70 },
        { name: "STA & Timing Closure", level: 72 },
        { name: "UVM Methodology", level: 65 },
        { name: "ASIC Flow (Synopsys)", level: 60 },
      ],
    },
    {
      id: "embedded", label: "Embedded & IoT", icon: Cpu,
      skills: [
        { name: "C / Embedded C", level: 88 },
        { name: "ARM Cortex-M / ESP32", level: 85 },
        { name: "RTOS (FreeRTOS)", level: 78 },
        { name: "MQTT / BLE / LoRa", level: 80 },
        { name: "PCB Design (KiCad)", level: 75 },
        { name: "Sensor Interfacing & ADC", level: 82 },
        { name: "Power Management (PMIC)", level: 70 },
        { name: "Bootloader / OTA", level: 72 },
      ],
    },
    {
      id: "fullstack", label: "Full-Stack & Software", icon: Code2,
      skills: [
        { name: "Python / FastAPI", level: 85 },
        { name: "React / Next.js", level: 80 },
        { name: "TypeScript / Node.js", level: 78 },
        { name: "PostgreSQL / Prisma", level: 75 },
        { name: "Docker / CI-CD", level: 70 },
        { name: "WebSocket / Real-time", level: 76 },
        { name: "Tailwind CSS / UI Design", level: 82 },
        { name: "Grafana / Monitoring", level: 65 },
      ],
    },
    {
      id: "dsp", label: "DSP & Communications", icon: Signal,
      skills: [
        { name: "MATLAB / Simulink", level: 78 },
        { name: "FFT / Filter Design", level: 75 },
        { name: "Modulation (AM/FM/PSK/QAM)", level: 72 },
        { name: "SDR (GNU Radio)", level: 60 },
        { name: "Antenna Design Basics", level: 55 },
        { name: "Channel Coding (LDPC/R-S)", level: 58 },
        { name: "RF Measurement & VNA", level: 50 },
        { name: "EMI/EMC Compliance", level: 52 },
      ],
    },
  ];

  return (
    <AnimatedSection id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">Technical Stack</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skill <span className="text-accent text-glow-emerald">Constellation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A multi-layered toolkit spanning from silicon to cloud</p>
        </div>

        {/* 3D Constellation */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="400px" />}>
            <SkillsScene3D />
          </Suspense>
        </div>

        {/* Tabbed Skill Bars */}
        <Tabs defaultValue="vlsi" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 border border-border/50 mb-8 h-auto p-1">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs sm:text-sm py-2">
                <cat.icon size={14} className="mr-1.5" /> {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid sm:grid-cols-2 gap-3">
                {cat.skills.map((skill, i) => (
                  <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }}>
                    <div className="glass-card rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-foreground">{skill.name}</span>
                        <span className="text-[10px] text-primary font-mono">{skill.level}%</span>
                      </div>
                      <div className="relative h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.04 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AnimatedSection>
  );
}
