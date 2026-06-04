"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Shield, Terminal, CircuitBoard, Cable } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AnimatedSection } from "../common/AnimatedSection";

export function AboutSection() {
  const stats = [
    { label: "Projects Built", value: "8+", icon: Layers, color: "primary" },
    { label: "Verification Cycles", value: "1K+", icon: Shield, color: "primary" },
    { label: "Lines of HDL", value: "5K+", icon: Terminal, color: "accent" },
    { label: "Boards Deployed", value: "6+", icon: Cpu, color: "accent" },
    { label: "PCB Designs", value: "4+", icon: CircuitBoard, color: "violet" },
    { label: "Protocols Implemented", value: "10+", icon: Cable, color: "violet" },
  ];

  return (
    <AnimatedSection id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">About Me</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Engineering at the <span className="text-primary text-glow-cyan">Intersection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Where hardware constraints meet human interaction patterns</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* Profile photo in About */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-primary/30 shadow-xl shadow-primary/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/arpit-photo-1.png"
                    alt="Arpit Yadav — ECE Engineer"
                    width={224}
                    height={224}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Decorative corner brackets */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-md" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent/50 rounded-tr-md" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent/50 rounded-bl-md" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-md" />
                {/* Status badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold shadow-lg whitespace-nowrap">
                  AVAILABLE FOR INTERNSHIPS
                </div>
              </div>
            </motion.div>

            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-primary">PROFILE.DAT</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I am a second-year <span className="text-foreground font-medium">Electronics & Communications Engineering</span> student
                with a passion for building systems that span the full stack — from transistor-level analog design
                to cloud-deployed web interfaces. My workflow is <span className="text-primary font-medium">constraint-driven and simulation-first</span>:
                I characterize analog front-ends, verify digital logic with structured testbenches, and deploy
                low-latency IoT/robotics architectures with quantifiable power and timing budgets at every layer.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                By integrating UI/UX principles with embedded signal flow, I ensure hardware constraints align
                with human interaction patterns. I am actively developing production-ready projects targeting
                <span className="text-accent font-medium"> VLSI design</span>,
                <span className="text-accent font-medium"> embedded systems</span>, and
                <span className="text-accent font-medium"> full-stack engineering</span> roles,
                where rigorous verification meets scalable system architecture.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["VLSI Design", "Embedded Systems", "Full-Stack Dev", "IoT Architectures", "Firmware Engineering", "Signal Processing", "PCB Design", "RF & Comm Systems"].map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <div className={`rounded-xl p-4 text-center transition-all duration-300 group cursor-default ${
                  stat.color === "primary" ? "glass-card" : stat.color === "accent" ? "glass-card-accent" : "glass-card-violet"
                }`}>
                  <stat.icon size={24} className={`mx-auto mb-2 ${
                    stat.color === "primary" ? "text-primary" : stat.color === "accent" ? "text-accent" : "text-violet"
                  }`} />
                  <div className="text-xl font-bold text-foreground mb-0.5">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
