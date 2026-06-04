"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Layers, Cable, Radio, Cloud, Antenna, Wifi, Satellite, Database
} from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";

export function ProtocolsSection() {
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
    { layer: 7, name: "Application", protocols: ["MQTT", "HTTP/REST", "Modbus"], color: "#818CF8" },
    { layer: 6, name: "Presentation", protocols: ["TLS/SSL", "JSON/PB"], color: "#6366F1" },
    { layer: 5, name: "Session", protocols: ["WebSocket", "RPC"], color: "#4F46E5" },
    { layer: 4, name: "Transport", protocols: ["TCP", "UDP"], color: "#3B82F6" },
    { layer: 3, name: "Network", protocols: ["IP", "ICMP", "6LoWPAN"], color: "#14B8A6" },
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
