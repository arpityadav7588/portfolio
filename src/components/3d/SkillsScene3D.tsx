"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Glowing Node ─── */
function SkillNode({
  position,
  color,
  size = 0.08,
  label,
  level,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  label: string;
  level: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      {/* 3D Bar chart below the node */}
      <mesh position={[0, -0.25 - (level / 100) * 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, (level / 100) * 0.6, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* ─── Connection Lines ─── */
function ConnectionLine({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

/* ─── Rotating Octahedron Core ─── */
function CoreShape() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive="#3B82F6"
          emissiveIntensity={0.25}
          metalness={0.95}
          roughness={0.05}
          wireframe
        />
      </mesh>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

/* ─── Pulsing Energy Waves from Core ─── */
function EnergyWaves() {
  const wavesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    wavesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.3 + i * 0.4) % 2;
      const scale = 1 + phase * 2;
      mesh.scale.setScalar(scale);
      (mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.3 - phase * 0.15);
    });
  });

  const waveCount = 4;
  return (
    <>
      {Array.from({ length: waveCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) wavesRef.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1, 0.01, 8, 64]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3B82F6" : "#14B8A6"}
            emissive={i % 2 === 0 ? "#3B82F6" : "#14B8A6"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Rotating Label Ring ─── */
function LabelRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const labels = ["VLSI", "FPGA", "Embedded", "React", "Python", "PCB", "MATLAB", "C/C++", "Docker", "KiCad", "RTOS", "VHDL"];
  const radius = 3.5;

  return (
    <group ref={groupRef}>
      {labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Html
            key={i}
            position={[x, 0, z]}
            center
            transform
            style={{ pointerEvents: "none" }}
          >
            <div
              className="font-mono text-[10px] font-bold select-none whitespace-nowrap"
              style={{
                color: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#14B8A6" : "#818CF8",
                opacity: 0.6,
                textShadow: `0 0 6px ${i % 3 === 0 ? "rgba(59,130,246,0.3)" : i % 3 === 1 ? "rgba(20,184,166,0.3)" : "rgba(129,140,248,0.3)"}`,
              }}
            >
              {label}
            </div>
          </Html>
        );
      })}
    </group>
  );
}

/* ─── Skill Constellation Nodes ─── */
const SKILL_NODES: { pos: [number, number, number]; color: string; label: string; level: number }[] = [
  { pos: [2, 1.2, 0.5], color: "#3B82F6", label: "Verilog", level: 85 },
  { pos: [-1.8, 1.5, -0.3], color: "#3B82F6", label: "FPGA", level: 80 },
  { pos: [0.5, 2, 0.8], color: "#14B8A6", label: "ESP32", level: 85 },
  { pos: [-2, -0.8, 0.4], color: "#14B8A6", label: "RTOS", level: 78 },
  { pos: [1.5, -1.5, -0.6], color: "#818CF8", label: "React", level: 80 },
  { pos: [-0.5, -2, 0.2], color: "#818CF8", label: "Python", level: 85 },
  { pos: [2.2, -0.3, -0.8], color: "#F59E0B", label: "PCB", level: 75 },
  { pos: [-1.5, 0.5, -1], color: "#F59E0B", label: "MATLAB", level: 78 },
  { pos: [0, 0.5, 2], color: "#3B82F6", label: "VHDL", level: 75 },
  { pos: [1, -0.8, 1.5], color: "#14B8A6", label: "C/C++", level: 88 },
  { pos: [-1.2, -1.2, 1.2], color: "#818CF8", label: "Docker", level: 70 },
  { pos: [0.8, 1.5, -1.5], color: "#F59E0B", label: "KiCad", level: 75 },
];

const CONNECTIONS: [number, number][] = [
  [0, 2], [0, 8], [1, 7], [1, 3], [2, 5], [3, 10],
  [4, 9], [5, 9], [6, 4], [7, 11], [8, 11], [9, 5],
  [0, 1], [2, 11], [3, 9], [6, 9], [10, 5], [4, 10],
];

/* ─── Main Scene ─── */
export default function SkillsScene3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#3B82F6" />
        <pointLight position={[-3, -2, 2]} intensity={0.4} color="#14B8A6" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

        <CoreShape />

        {SKILL_NODES.map((node, i) => (
          <SkillNode key={i} position={node.pos} color={node.color} size={0.07} label={node.label} level={node.level} />
        ))}

        {CONNECTIONS.map(([a, b], i) => (
          <ConnectionLine
            key={i}
            start={SKILL_NODES[a].pos}
            end={SKILL_NODES[b].pos}
            color={SKILL_NODES[a].color}
          />
        ))}

        <EnergyWaves />
        <LabelRing />

        <fog attach="fog" args={["#0F172A", 6, 15]} />
      </Canvas>
    </div>
  );
}
