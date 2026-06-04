"use client";

import { motion } from "framer-motion";
import { Camera, ImagePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AnimatedSection } from "../common/AnimatedSection";

export function GallerySection() {
  const photos = [
    {
      src: "/arpit-photo-1.png",
      alt: "Arpit Yadav — Professional",
      caption: "Engineering Mindset",
      desc: "Simulation-first approach to every design challenge",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      src: "/arpit-photo-2.png",
      alt: "Arpit Yadav — Portrait",
      caption: "Problem Solver",
      desc: "Bridging the gap between hardware and software",
      span: "md:col-span-1",
    },
    {
      src: "/arpit-photo-3.png",
      alt: "Arpit Yadav — Casual",
      caption: "Continuous Learner",
      desc: "Always exploring new frontiers in ECE",
      span: "md:col-span-1",
    },
  ];

  return (
    <AnimatedSection id="gallery" className="py-24 px-4 bg-grid-dense">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">Snapshots</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Photo <span className="text-accent text-glow-emerald">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the engineer behind the circuits and code
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[280px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className={`${photo.span} group relative overflow-hidden rounded-2xl cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-scanline z-10 pointer-events-none opacity-30" />
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-20" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <Camera size={12} className="text-primary" />
                  <span className="text-xs font-mono text-primary/70">IMG_{String(i + 1).padStart(3, "0")}.RAW</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-0.5">{photo.caption}</h3>
                <p className="text-[11px] text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{photo.desc}</p>
              </div>
              {/* Corner frame markers */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/40 z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-accent/40 z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-accent/40 z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/40 z-20" />
            </motion.div>
          ))}

          {/* Decorative stat card in gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="glass-card-accent rounded-2xl p-6 flex flex-col justify-center items-center text-center"
          >
            <div className="p-4 rounded-full bg-accent/10 text-accent mb-4 flex items-center justify-center">
              <ImagePlus size={28} />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">More Coming Soon</h4>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              As projects evolve and prototypes come to life, this gallery will showcase real hardware builds, lab sessions, and field deployments.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
