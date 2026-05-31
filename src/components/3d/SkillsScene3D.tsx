"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Radar Chart for Skills ─── */
function SkillAxis({ angle, length, label }: { angle: number; length: number; label: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + angle) * 0.02;
    }
  });

  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;

  return (
    <group ref={ref}>
      {/* Axis line */}
      <mesh>
        <cylinderGeometry args={[0.008, 0.008, length, 8]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      <group rotation={[0, 0, angle]} position={[length / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.008, 0.008, length, 8]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Glowing Node ─── */
function SkillNode({
  position,
  color,
  size = 0.08,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.9}
      />
    </mesh>
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
          color="#0a0a2e"
          emissive="#22d3ee"
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.05}
          wireframe
        />
      </mesh>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#0d0d2b"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

/* ─── Skill Constellation Nodes ─── */
const SKILL_NODES: { pos: [number, number, number]; color: string; label: string }[] = [
  { pos: [2, 1.2, 0.5], color: "#22d3ee", label: "Verilog" },
  { pos: [-1.8, 1.5, -0.3], color: "#22d3ee", label: "FPGA" },
  { pos: [0.5, 2, 0.8], color: "#34d399", label: "ESP32" },
  { pos: [-2, -0.8, 0.4], color: "#34d399", label: "RTOS" },
  { pos: [1.5, -1.5, -0.6], color: "#a78bfa", label: "React" },
  { pos: [-0.5, -2, 0.2], color: "#a78bfa", label: "Python" },
  { pos: [2.2, -0.3, -0.8], color: "#f59e0b", label: "PCB" },
  { pos: [-1.5, 0.5, -1], color: "#f59e0b", label: "MATLAB" },
  { pos: [0, 0.5, 2], color: "#22d3ee", label: "VHDL" },
  { pos: [1, -0.8, 1.5], color: "#34d399", label: "C/C++" },
  { pos: [-1.2, -1.2, 1.2], color: "#a78bfa", label: "Docker" },
  { pos: [0.8, 1.5, -1.5], color: "#f59e0b", label: "KiCad" },
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
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#22d3ee" />
        <pointLight position={[-3, -2, 2]} intensity={0.4} color="#34d399" />

        <CoreShape />

        {SKILL_NODES.map((node, i) => (
          <SkillNode key={i} position={node.pos} color={node.color} size={0.07} />
        ))}

        {CONNECTIONS.map(([a, b], i) => (
          <ConnectionLine
            key={i}
            start={SKILL_NODES[a].pos}
            end={SKILL_NODES[b].pos}
            color={SKILL_NODES[a].color}
          />
        ))}

        <fog attach="fog" args={["#0a0a1a", 6, 15]} />
      </Canvas>
    </div>
  );
}
