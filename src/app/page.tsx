"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Cpu, Code2, Wifi, Bot, GraduationCap, Mail, Github, Linkedin,
  ExternalLink, ChevronDown, Zap, Layers, Terminal, Gauge, Shield,
  ArrowRight, Menu, X, MapPin, Phone, Radio, Antenna, Cable,
  Activity, Binary, CircuitBoard, FileCode2, Award, BookOpen,
  Satellite, Microchip, Spline, MonitorSmartphone, Wrench,
  FlaskConical, ScanLine, Database, Cloud, TestTube, Signal, Bug,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

/* ─── Dynamic 3D imports (SSR-safe) ─── */
const HeroScene3D = dynamic(
  () => import("@/components/3d/HeroScene3D"),
  { ssr: false }
);
const SkillsScene3D = dynamic(
  () => import("@/components/3d/SkillsScene3D"),
  { ssr: false }
);
const ProjectsScene3D = dynamic(
  () => import("@/components/3d/ProjectsScene3D"),
  { ssr: false }
);

/* ─── Loading Fallback ─── */
function Scene3DFallback({ height = "400px" }: { height?: string }) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center text-muted-foreground/30"
    >
      <Cpu size={48} className="animate-pulse" />
    </div>
  );
}

/* ─── Animated Section ─── */
function AnimatedSection({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Typing Text ─── */
function TypingText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[index]);
        setIndex((p) => p + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [index, text, speed]);
  return (
    <span>
      {displayed}
      {index < text.length && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
}

/* ─── Oscilloscope Waveform SVG ─── */
function OscWaveform() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-20 pointer-events-none">
      <svg className="animate-osc-wave" width="200%" height="96" viewBox="0 0 2400 96">
        <path
          d="M0,48 Q30,10 60,48 Q90,86 120,48 Q150,10 180,48 Q210,86 240,48 Q270,10 300,48 Q330,86 360,48 Q390,10 420,48 Q450,86 480,48 Q510,10 540,48 Q570,86 600,48 Q630,10 660,48 Q690,86 720,48 Q750,10 780,48 Q810,86 840,48 Q870,10 900,48 Q930,86 960,48 Q990,10 1020,48 Q1050,86 1080,48 Q1110,10 1140,48 Q1170,86 1200,48 Q1230,10 1260,48 Q1290,86 1320,48 Q1350,10 1380,48 Q1410,86 1440,48 Q1470,10 1500,48 Q1530,86 1560,48 Q1590,10 1620,48 Q1650,86 1680,48 Q1710,10 1740,48 Q1770,86 1800,48 Q1830,10 1860,48 Q1890,86 1920,48 Q1950,10 1980,48 Q2010,86 2040,48 Q2070,10 2100,48 Q2130,86 2160,48 Q2190,10 2220,48 Q2250,86 2280,48 Q2310,10 2340,48 Q2370,86 2400,48"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
        />
        <path
          d="M0,52 Q30,20 60,52 Q90,84 120,52 Q150,20 180,52 Q210,84 240,52 Q270,20 300,52 Q330,84 360,52 Q390,20 420,52 Q450,84 480,52 Q510,20 540,52 Q570,84 600,52 Q630,20 660,52 Q690,84 720,52 Q750,20 780,52 Q810,84 840,52 Q870,20 900,52 Q930,84 960,52 Q990,20 1020,52 Q1050,84 1080,52 Q1110,20 1140,52 Q1170,84 1200,52 Q1230,20 1260,52 Q1290,84 1320,52 Q1350,20 1380,52 Q1410,84 1440,52 Q1470,20 1500,52 Q1530,84 1560,52 Q1590,20 1620,52 Q1650,84 1680,52 Q1710,20 1740,52 Q1770,84 1800,52 Q1830,20 1860,52 Q1890,84 1920,52 Q1950,20 1980,52 Q2010,84 2040,52 Q2070,20 2100,52 Q2130,84 2160,52 Q2190,20 2220,52 Q2250,84 2280,52 Q2310,20 2340,52 Q2370,84 2400,52"
          fill="none"
          stroke="#34d399"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const items = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Protocols", href: "#protocols" },
    { label: "Projects", href: "#projects" },
    { label: "Lab", href: "#lab" },
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
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-mono text-lg font-bold text-primary text-glow-cyan flex items-center gap-2">
            <Cpu size={20} /> AY_
          </a>
          <div className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                {it.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden pb-4">
            {items.map((it) => (
              <a key={it.href} href={it.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {it.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — 3D
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
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

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mb-6">
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

/* ═══════════════════════════════════════════════════════════════════
   ABOUT — 3D
   ═══════════════════════════════════════════════════════════════════ */
function AboutSection() {
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
                low-latency IoT/robotics architectures with quantifiable power and timing budgets.
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

/* ═══════════════════════════════════════════════════════════════════
   SKILLS — 3D Constellation
   ═══════════════════════════════════════════════════════════════════ */
function SkillsSection() {
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

/* ═══════════════════════════════════════════════════════════════════
   COMMUNICATION PROTOCOLS — ECE Specific
   ═══════════════════════════════════════════════════════════════════ */
function ProtocolsSection() {
  const protocols = [
    { name: "UART", layer: "Physical", speed: "Up to 5 Mbps", color: "primary", icon: Cable },
    { name: "SPI", layer: "Physical", speed: "Up to 60 MHz", color: "primary", icon: Cable },
    { name: "I2C", layer: "Physical", speed: "Up to 3.4 Mbps", color: "primary", icon: Cable },
    { name: "CAN Bus", layer: "Data Link", speed: "Up to 1 Mbps", color: "accent", icon: Cable },
    { name: "BLE 5.0", layer: "Network", speed: "2 Mbps", color: "accent", icon: Radio },
    { name: "MQTT", layer: "Application", speed: "Variable", color: "violet", icon: Cloud },
    { name: "LoRa", layer: "Physical", speed: "0.3-50 kbps", color: "accent", icon: Antenna },
    { name: "Wi-Fi (ESP32)", layer: "Network", speed: "Up to 150 Mbps", color: "violet", icon: Wifi },
    { name: "USB 2.0", layer: "Physical", speed: "480 Mbps", color: "primary", icon: Cable },
    { name: "TCP/IP Stack", layer: "Transport", speed: "Variable", color: "violet", icon: Layers },
    { name: "Modbus RTU", layer: "Application", speed: "Up to 115.2 kbps", color: "accent", icon: Database },
    { name: "GSM/4G", layer: "Network", speed: "Up to 100 Mbps", color: "primary", icon: Satellite },
  ];

  const osiLayers = [
    { layer: 7, name: "Application", protocols: ["MQTT", "HTTP/REST", "Modbus"], color: "#a78bfa" },
    { layer: 6, name: "Presentation", protocols: ["TLS/SSL", "JSON/PB"], color: "#8b5cf6" },
    { layer: 5, name: "Session", protocols: ["WebSocket", "RPC"], color: "#7c3aed" },
    { layer: 4, name: "Transport", protocols: ["TCP", "UDP"], color: "#22d3ee" },
    { layer: 3, name: "Network", protocols: ["IP", "ICMP", "6LoWPAN"], color: "#34d399" },
    { layer: 2, name: "Data Link", protocols: ["CAN", "Ethernet", "BLE LL"], color: "#f59e0b" },
    { layer: 1, name: "Physical", protocols: ["UART", "SPI", "I2C", "LoRa"], color: "#ef4444" },
  ];

  return (
    <AnimatedSection id="protocols" className="py-24 px-4 bg-grid-dense">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-violet/50 text-violet">ECE Core</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Communication <span className="text-violet text-glow-violet">Protocols</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The signaling stack I work with — from bare-metal bit-banging to cloud-connected telemetry
          </p>
        </div>

        {/* OSI Model Visualization */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Layers size={18} className="text-primary" /> OSI Stack Coverage
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
            {osiLayers.map((layer) => (
              <motion.div key={layer.layer} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: layer.layer * 0.05 }} viewport={{ once: true }}>
                <div className="glass-card rounded-lg p-3 text-center h-full">
                  <div className="text-[10px] font-mono text-muted-foreground mb-1">L{layer.layer}</div>
                  <div className="text-xs font-bold mb-2" style={{ color: layer.color }}>{layer.name}</div>
                  <div className="space-y-0.5">
                    {layer.protocols.map((p) => (
                      <div key={p} className="text-[9px] text-muted-foreground/70 bg-secondary/30 rounded px-1 py-0.5">{p}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Protocol Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {protocols.map((proto, i) => (
            <motion.div key={proto.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }}>
              <div className={`rounded-xl p-4 transition-all duration-300 group cursor-default ${
                proto.color === "primary" ? "glass-card" : proto.color === "accent" ? "glass-card-accent" : "glass-card-violet"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <proto.icon size={16} className={
                    proto.color === "primary" ? "text-primary" : proto.color === "accent" ? "text-accent" : "text-violet"
                  } />
                  <span className="text-sm font-bold text-foreground">{proto.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{proto.layer}</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">{proto.speed}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS — 3D
   ═══════════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  const projects = [
    {
      title: "RISC-V Single-Cycle Processor",
      description: "Designed and verified a 32-bit RISC-V core in SystemVerilog supporting RV32I base integer instruction set. Implemented 5-stage datapath with hazard detection, forwarding logic, and UVM-style testbench achieving 98% functional coverage. Synthesized on Xilinx Artix-7 FPGA at 50 MHz with documented timing closure.",
      tags: ["SystemVerilog", "RISC-V", "FPGA", "UVM", "Vivado"],
      icon: Cpu, color: "primary",
      metrics: [{ label: "Clock", value: "50 MHz" }, { label: "Coverage", value: "98%" }, { label: "LUTs", value: "2.3K" }],
    },
    {
      title: "IoT Environmental Monitor",
      description: "Built a low-power environmental monitoring system using ESP32-S3 with BME680 sensor fusion. Implemented FreeRTOS task scheduling with MQTT over TLS for real-time telemetry to a React dashboard. Achieved 12 mA active / 800 µA deep sleep, running 7+ days on 2000 mAh Li-Po.",
      tags: ["ESP32", "FreeRTOS", "MQTT", "React", "PCB"],
      icon: Wifi, color: "accent",
      metrics: [{ label: "Power", value: "12 mA" }, { label: "Battery", value: "7+ days" }, { label: "Latency", value: "<200ms" }],
    },
    {
      title: "Autonomous Line-Following Robot",
      description: "Developed a PID-controlled differential-drive robot using STM32F4 and custom 4-layer PCB with IR sensor array. Implemented closed-loop control with tunable Kp/Ki/Kd gains via UART, achieving ±2 mm tracking accuracy at 1.2 m/s. Designed H-bridge motor driver with ESD protection.",
      tags: ["STM32", "PID Control", "PCB", "Embedded C", "Motor"],
      icon: Bot, color: "primary",
      metrics: [{ label: "Speed", value: "1.2 m/s" }, { label: "Accuracy", value: "±2mm" }, { label: "Layers", value: "4-layer" }],
    },
    {
      title: "Full-Stack Simulation Dashboard",
      description: "Architected a real-time signal visualization platform using Next.js + FastAPI with WebSocket streaming. Renders oscilloscope-style waveforms from ADC data, supports FFT analysis, and provides interactive gain/offset controls. PostgreSQL + Prisma ORM, Docker Compose deployment.",
      tags: ["Next.js", "FastAPI", "WebSocket", "PostgreSQL", "Docker"],
      icon: Code2, color: "accent",
      metrics: [{ label: "Latency", value: "<50ms" }, { label: "FFT", value: "Real-time" }, { label: "Containers", value: "3" }],
    },
    {
      title: "Analog Front-End Characterization Suite",
      description: "Designed a Python/MATLAB toolchain for automated characterization of analog circuits — op-amp GBW, CMRR, PSRR. Integrated with Keithley sourcemeters via SCPI/GPIB, generating datasheet-quality PDF reports. Reduced manual measurement time by 80% across 15+ DUTs.",
      tags: ["Python", "MATLAB", "SCPI", "Signal Processing", "Automation"],
      icon: Gauge, color: "primary",
      metrics: [{ label: "Time Saved", value: "80%" }, { label: "DUTs", value: "15+" }, { label: "Params", value: "12" }],
    },
    {
      title: "Smart Energy Meter with Prepaid Billing",
      description: "Engineered a prepaid energy meter using ATMega328P with ACS712 current sensing and ZMPT101B voltage sensing at ±1% accuracy. Implemented EEPROM credit management, OLED display, and GSM low-balance alerts. Custom 2-layer PCB with opto-isolation rated 230V/16A.",
      tags: ["ATMega328P", "Sensors", "GSM", "PCB", "Power Electronics"],
      icon: Zap, color: "accent",
      metrics: [{ label: "Accuracy", value: "±1%" }, { label: "Rating", value: "230V/16A" }, { label: "Alerts", value: "SMS" }],
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

        {/* 3D Project Scene */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="300px" />}>
            <ProjectsScene3D />
          </Suspense>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="perspective-card">
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
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LAB EQUIPMENT & TOOLS — ECE Specific
   ═══════════════════════════════════════════════════════════════════ */
function LabSection() {
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

/* ═══════════════════════════════════════════════════════════════════
   EDUCATION — Timeline
   ═══════════════════════════════════════════════════════════════════ */
function EducationSection() {
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

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-violet/40" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="relative flex items-start gap-6 flex-row">
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-6 animate-pulse-glow" />
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const links = [
    { icon: Mail, label: "Email", value: "arpit.yadav@outlook.com", href: "mailto:arpit.yadav@outlook.com", color: "primary" },
    { icon: Github, label: "GitHub", value: "github.com/arpit-yadav", href: "https://github.com/arpit-yadav", color: "primary" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/arpit-yadav", href: "https://linkedin.com/in/arpit-yadav", color: "accent" },
    { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX", color: "accent" },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 px-4 bg-grid-dense">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Let&apos;s Connect</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-primary text-glow-cyan">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to internships, collaborations, and challenging engineering problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {links.map((link, i) => (
            <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                <div className={`rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group cursor-pointer ${
                  link.color === "primary" ? "glass-card" : "glass-card-accent"
                }`}>
                  <div className={`p-3 rounded-lg ${
                    link.color === "primary" ? "bg-primary/10 text-primary group-hover:bg-primary/20" : "bg-accent/10 text-accent group-hover:bg-accent/20"
                  } transition-colors`}>
                    <link.icon size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{link.label}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">{link.value}</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Terminal CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card rounded-xl p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="text-muted-foreground text-xs ml-2">arpit@portfolio:~</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <p><span className="text-primary">$</span> echo &quot;Seeking roles in VLSI, Embedded, and Full-Stack&quot;</p>
            <p className="text-accent">Seeking roles in VLSI, Embedded, and Full-Stack</p>
            <p><span className="text-primary">$</span> cat availability.txt</p>
            <p className="text-foreground">Open for Summer 2026 internships and full-time roles starting 2027</p>
            <p><span className="text-primary">$</span> <span className="animate-pulse">_</span></p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-primary" />
          <span className="font-mono text-sm text-primary font-bold">AY_</span>
          <span className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Arpit Yadav</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/arpit-yadav" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={18} /></a>
          <a href="https://linkedin.com/in/arpit-yadav" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
          <a href="mailto:arpit.yadav@outlook.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
        </div>
        <p className="text-[10px] text-muted-foreground/40">Designed with a simulation-first mindset</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ProtocolsSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <LabSection />
        <div className="section-divider" />
        <EducationSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
