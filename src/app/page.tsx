"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Cpu,
  Code2,
  Wifi,
  Bot,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Zap,
  Layers,
  Terminal,
  CircuitBoard,
  Gauge,
  Shield,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ─────────────────── Animated Section Wrapper ─────────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────── Typing Effect ─────────────────── */
function TypingText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span>
      {displayed}
      {index < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
}

/* ─────────────────── Circuit Trace Decoration ─────────────────── */
function CircuitTrace({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute opacity-10 ${className}`}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M0 100 H40 V60 H80 V20 H120 V60 H160 V100 H200"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary"
      />
      <circle cx="40" cy="100" r="3" className="fill-primary" />
      <circle cx="80" cy="60" r="3" className="fill-primary" />
      <circle cx="120" cy="20" r="3" className="fill-primary" />
      <circle cx="160" cy="100" r="3" className="fill-primary" />
    </svg>
  );
}

/* ─────────────────── Particle Background ─────────────────── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── Navigation ─────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="font-mono text-lg font-bold tracking-tight text-primary text-glow-cyan"
          >
            AY_
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

/* ─────────────────── Hero Section ─────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Circuit board background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </motion.div>

      <ParticleField />
      <CircuitTrace className="top-20 left-10 text-primary" />
      <CircuitTrace className="bottom-20 right-10 text-primary rotate-180" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm border-primary/50 text-primary bg-primary/5"
          >
            <Zap size={14} className="mr-2" />
            Simulation-First Engineering
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">Arpit</span>{" "}
          <span className="text-primary text-glow-cyan">Yadav</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono text-muted-foreground mb-8"
        >
          <TypingText
            text="Silicon → Firmware → Full-Stack"
            speed={70}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ECE undergraduate designing and validating systems that bridge analog
          front-ends, digital logic, and scalable software — with quantifiable
          power and timing budgets at every layer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 glow-cyan"
            asChild
          >
            <a href="#projects">
              View Projects <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8"
            asChild
          >
            <a href="#contact">
              <Mail size={18} className="mr-2" /> Get In Touch
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── About Section ─────────────────── */
function AboutSection() {
  const stats = [
    { label: "Projects Built", value: "8+", icon: Layers },
    { label: "Verification Cycles", value: "1K+", icon: Shield },
    { label: "Lines of HDL", value: "5K+", icon: Terminal },
    { label: "Boards Deployed", value: "6+", icon: Cpu },
  ];

  return (
    <AnimatedSection id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Engineering at the{" "}
            <span className="text-primary text-glow-cyan">
              Intersection
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Where hardware constraints meet human interaction patterns
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I am a second-year{" "}
              <span className="text-foreground font-medium">
                Electronics & Communications Engineering
              </span>{" "}
              student with a passion for building systems that span the full
              stack — from transistor-level analog design to cloud-deployed web
              interfaces. My workflow is{" "}
              <span className="text-primary font-medium">
                constraint-driven and simulation-first
              </span>
              : I characterize analog front-ends, verify digital logic with
              structured testbenches, and deploy low-latency IoT/robotics
              architectures with quantifiable power and timing budgets.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By integrating UI/UX principles with embedded signal flow, I
              ensure hardware constraints align with human interaction patterns.
              I am actively developing production-ready projects targeting{" "}
              <span className="text-accent font-medium">VLSI design</span>,{" "}
              <span className="text-accent font-medium">embedded systems</span>,
              and{" "}
              <span className="text-accent font-medium">
                full-stack engineering
              </span>{" "}
              roles, where rigorous verification meets scalable system
              architecture.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "VLSI Design",
                "Embedded Systems",
                "Full-Stack Dev",
                "IoT Architectures",
                "Firmware Engineering",
                "Signal Processing",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <stat.icon
                      size={28}
                      className="mx-auto mb-3 text-primary group-hover:text-primary transition-colors"
                    />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Skills Section ─────────────────── */
function SkillsSection() {
  const skillCategories = [
    {
      id: "vlsi",
      label: "VLSI & Hardware",
      icon: CircuitBoard,
      skills: [
        { name: "Verilog / SystemVerilog", level: 85 },
        { name: "VHDL", level: 75 },
        { name: "FPGA (Xilinx / Vivado)", level: 80 },
        { name: "RTL Design & Verification", level: 82 },
        { name: "Cadence Virtuoso", level: 70 },
        { name: "Timing Analysis (STA)", level: 72 },
      ],
    },
    {
      id: "embedded",
      label: "Embedded & IoT",
      icon: Cpu,
      skills: [
        { name: "C / Embedded C", level: 88 },
        { name: "ARM Cortex-M / ESP32", level: 85 },
        { name: "RTOS (FreeRTOS)", level: 78 },
        { name: "MQTT / BLE / LoRa", level: 80 },
        { name: "PCB Design (KiCad)", level: 75 },
        { name: "Sensor Interfacing & ADC", level: 82 },
      ],
    },
    {
      id: "fullstack",
      label: "Full-Stack & Software",
      icon: Code2,
      skills: [
        { name: "Python / FastAPI", level: 85 },
        { name: "React / Next.js", level: 80 },
        { name: "TypeScript / Node.js", level: 78 },
        { name: "PostgreSQL / Prisma", level: 75 },
        { name: "Docker / CI-CD", level: 70 },
        { name: "Tailwind CSS / UI Design", level: 82 },
      ],
    },
    {
      id: "tools",
      label: "Tools & Methods",
      icon: Gauge,
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "Linux / Shell Scripting", level: 85 },
        { name: "MATLAB / Simulink", level: 78 },
        { name: "Oscilloscope / Logic Analyzer", level: 82 },
        { name: "Testbench Methodology (UVM)", level: 65 },
        { name: "Agile / Documentation", level: 80 },
      ],
    },
  ];

  return (
    <AnimatedSection id="skills" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-accent/50 text-accent"
          >
            Technical Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skill{" "}
            <span className="text-accent text-glow-emerald">
              Architecture
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A multi-layered toolkit spanning from silicon to cloud, optimized
            for constraint-driven system design
          </p>
        </div>

        <Tabs defaultValue="vlsi" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 border border-border/50 mb-8">
            {skillCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs sm:text-sm"
              >
                <cat.icon size={16} className="mr-1.5 hidden sm:inline" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid sm:grid-cols-2 gap-4">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-primary font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: i * 0.05,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </CardContent>
                    </Card>
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

/* ─────────────────── Projects Section ─────────────────── */
function ProjectsSection() {
  const projects = [
    {
      title: "RISC-V Single-Cycle Processor",
      description:
        "Designed and verified a 32-bit RISC-V core in SystemVerilog supporting RV32I base integer instruction set. Implemented a 5-stage single-cycle datapath with hazard detection, forwarding logic, and a comprehensive UVM-style testbench achieving 98% functional coverage. Synthesized on Xilinx Artix-7 FPGA running at 50 MHz with documented timing closure.",
      tags: ["SystemVerilog", "RISC-V", "FPGA", "UVM", "Vivado"],
      icon: Cpu,
      color: "primary",
      metrics: [
        { label: "Clock", value: "50 MHz" },
        { label: "Coverage", value: "98%" },
        { label: "LUTs", value: "2.3K" },
      ],
    },
    {
      title: "IoT Environmental Monitor",
      description:
        "Built a low-power environmental monitoring system using ESP32-S3 with BME680 sensor fusion. Implemented FreeRTOS-based task scheduling with MQTT over TLS for real-time telemetry to a React dashboard. Achieved average current draw of 12 mA in active mode and 800 µA in deep sleep with configurable wake intervals, running on a 2000 mAh Li-Po for 7+ days.",
      tags: ["ESP32", "FreeRTOS", "MQTT", "React", "PCB Design"],
      icon: Wifi,
      color: "accent",
      metrics: [
        { label: "Power", value: "12 mA" },
        { label: "Battery", value: "7+ days" },
        { label: "Latency", value: "<200ms" },
      ],
    },
    {
      title: "Autonomous Line-Following Robot",
      description:
        "Developed a PID-controlled differential-drive robot using STM32F4 and custom PCB with IR sensor array. Implemented closed-loop control with tunable Kp/Ki/Kd gains via UART, achieving ±2 mm tracking accuracy at 1.2 m/s. Designed a 4-layer PCB with motor driver H-bridge, voltage regulation, and ESD protection, validated on oscilloscope and logic analyzer.",
      tags: ["STM32", "PID Control", "PCB", "Embedded C", "Motor Control"],
      icon: Bot,
      color: "primary",
      metrics: [
        { label: "Speed", value: "1.2 m/s" },
        { label: "Accuracy", value: "±2mm" },
        { label: "Layers", value: "4-layer" },
      ],
    },
    {
      title: "Full-Stack Simulation Dashboard",
      description:
        "Architected a real-time signal visualization platform using Next.js frontend and FastAPI backend with WebSocket streaming. The dashboard renders oscilloscope-style waveforms from ADC data, supports FFT analysis, and provides interactive gain/offset controls. PostgreSQL stores simulation metadata with Prisma ORM, and Docker Compose orchestrates the multi-service deployment.",
      tags: ["Next.js", "FastAPI", "WebSocket", "PostgreSQL", "Docker"],
      icon: Code2,
      color: "accent",
      metrics: [
        { label: "Latency", value: "<50ms" },
        { label: "FFT", value: "Real-time" },
        { label: "Services", value: "3-containers" },
      ],
    },
    {
      title: "Analog Front-End Characterization Suite",
      description:
        "Designed a Python/MATLAB toolchain for automated characterization of analog circuits including op-amp gain-bandwidth, CMRR, and PSRR measurements. Integrated with Keithley sourcemeters via SCPI over GPIB, generating standardized plots and datasheet-quality PDF reports. Reduced manual measurement time by 80% across 15+ device under test configurations.",
      tags: ["Python", "MATLAB", "SCPI", "Signal Processing", "Automation"],
      icon: Gauge,
      color: "primary",
      metrics: [
        { label: "Time Saved", value: "80%" },
        { label: "DUTs", value: "15+" },
        { label: "Params", value: "12 metrics" },
      ],
    },
    {
      title: "Smart Energy Meter with Prepaid Billing",
      description:
        "Engineered a prepaid energy meter using ATMega328P with ACS712 current sensing and ZMPT101B voltage sensing, calculating real-time power consumption with ±1% accuracy. Implemented EEPROM-based credit management, OLED display interface, and GSM-based low-balance alerts. Designed a custom 2-layer PCB with opto-isolation and surge protection rated for 230V/16A.",
      tags: ["ATMega328P", "Sensors", "GSM", "PCB", "Power Electronics"],
      icon: Zap,
      color: "accent",
      metrics: [
        { label: "Accuracy", value: "±1%" },
        { label: "Rating", value: "230V/16A" },
        { label: "Alerts", value: "SMS/GSM" },
      ],
    },
  ];

  return (
    <AnimatedSection id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Featured Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Project{" "}
            <span className="text-primary text-glow-cyan">Pipeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Production-ready systems from silicon to cloud, each with
            quantifiable performance metrics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 h-full group hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        project.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <project.icon size={22} />
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    />
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground/80 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>

                  <div className="grid grid-cols-3 gap-2 py-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="text-center p-2 rounded-md bg-secondary/30"
                      >
                        <div className="text-xs font-bold text-foreground">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 bg-secondary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Education Section ─────────────────── */
function EducationSection() {
  const timeline = [
    {
      year: "2024 – Present",
      title: "B.Tech in Electronics & Communications Engineering",
      institution: "University of Technology",
      description:
        "Second-year undergraduate specializing in VLSI design, embedded systems, and signal processing. Active member of the Electronics Club and Robotics Society, leading hardware design workshops and organizing hackathons. Current CGPA: 8.5/10 with focus on analog circuits, digital logic design, and electromagnetic theory.",
      highlights: [
        "CGPA: 8.5/10",
        "Electronics Club Lead",
        "Robotics Society Member",
      ],
    },
    {
      year: "2022 – 2024",
      title: "Higher Secondary (XII) – PCM with Computer Science",
      institution: "Senior Secondary School",
      description:
        "Completed senior secondary education with Physics, Chemistry, Mathematics, and Computer Science. Built foundational skills in programming (C/C++), digital logic concepts, and circuit analysis. Scored 92% in board examinations and won the regional science fair with an IoT-based smart irrigation prototype.",
      highlights: [
        "92% in Boards",
        "Science Fair Winner",
        "CS Fundamentals",
      ],
    },
    {
      year: "Ongoing",
      title: "Self-Directed Learning & Certifications",
      institution: "Online Platforms & Open-Source",
      description:
        "Pursuing continuous learning through platforms like Coursera, NPTEL, and YouTube deep-dives. Completed courses in FPGA design, embedded Linux, and full-stack web development. Contributing to open-source hardware projects on GitHub and maintaining a technical blog documenting VLSI verification methodologies and embedded firmware patterns.",
      highlights: [
        "NPTEL VLSI Certification",
        "Open-Source Contributor",
        "Technical Blog Author",
      ],
    },
  ];

  return (
    <AnimatedSection id="education" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-accent/50 text-accent"
          >
            Timeline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education &{" "}
            <span className="text-accent text-glow-emerald">Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The academic and self-directed path shaping my engineering mindset
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-6 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-6" />

                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <Badge
                        variant="outline"
                        className="w-fit text-xs border-primary/50 text-primary mb-2"
                      >
                        {item.year}
                      </Badge>
                      <CardTitle className="text-lg leading-snug">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-primary/70 text-sm">
                        {item.institution}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <Badge
                            key={h}
                            variant="secondary"
                            className="text-[10px] bg-accent/10 text-accent border-accent/20"
                          >
                            {h}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Contact Section ─────────────────── */
function ContactSection() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "arpit.yadav@outlook.com",
      href: "mailto:arpit.yadav@outlook.com",
      color: "primary",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/arpit-yadav",
      href: "https://github.com/arpit-yadav",
      color: "primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/arpit-yadav",
      href: "https://linkedin.com/in/arpit-yadav",
      color: "accent",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
      color: "accent",
    },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Let&apos;s Connect
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In{" "}
            <span className="text-primary text-glow-cyan">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to internships, collaborations, and challenging engineering
            problems. Let&apos;s build something that matters.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contactLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        link.color === "primary"
                          ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                          : "bg-accent/10 text-accent group-hover:bg-accent/20"
                      } transition-colors`}
                    >
                      <link.icon size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {link.label}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
                        {link.value}
                      </div>
                    </div>
                    <ExternalLink
                      size={14}
                      className="ml-auto text-muted-foreground/50 group-hover:text-primary/50 transition-colors"
                    />
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Terminal-style CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-border/50 rounded-xl p-6 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="text-muted-foreground text-xs ml-2">
              arpit@portfolio:~
            </span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <p>
              <span className="text-primary">$</span> echo &quot;Seeking
              roles in VLSI, Embedded, and Full-Stack&quot;
            </p>
            <p className="text-accent">
              Seeking roles in VLSI, Embedded, and Full-Stack
            </p>
            <p>
              <span className="text-primary">$</span> cat availability.txt
            </p>
            <p className="text-foreground">
              Open for Summer 2026 internships and full-time roles starting
              2027
            </p>
            <p>
              <span className="text-primary">$</span>{" "}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Footer ─────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-primary font-bold">
            AY_
          </span>
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Arpit Yadav
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/arpit-yadav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/arpit-yadav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:arpit.yadav@outlook.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground/50">
          Designed with a simulation-first mindset
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
