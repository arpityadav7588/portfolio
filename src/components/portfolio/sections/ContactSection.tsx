"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Phone, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { Scene3DFallback } from "../common/Scene3DFallback";
import { AnimatedSection } from "../common/AnimatedSection";

const GlobeScene3D = dynamic(
  () => import("@/components/3d/GlobeScene3D"),
  { ssr: false }
);

export function ContactSection() {
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

        {/* 3D Globe */}
        <div className="mb-12 glass-card rounded-2xl p-4 overflow-hidden">
          <Suspense fallback={<Scene3DFallback height="400px" />}>
            <GlobeScene3D />
          </Suspense>
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
