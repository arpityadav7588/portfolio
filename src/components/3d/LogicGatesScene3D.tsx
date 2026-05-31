"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Logic Gate ─── */
function GateBody({
  position,
  type,
  color,
}: {
  position: [number, number, number];
  type: string;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Gate body */}
        <mesh ref={ref}>
          <boxGeometry args={[1.2, 0.8, 0.3]} />
          <meshStandardMaterial
            color="#0d0d2b"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Gate border glow */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[1.24, 0.84, 0.28]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Label */}
        <Html center position={[0, 0, 0.2]} transform>
          <div className="text-center select-none pointer-events-none">
            <div className="text-xs font-mono font-bold" style={{ color }}>
              {type}
            </div>
          </div>
        </Html>
        {/* Input pins */}
        <mesh position={[-0.75, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.75, -0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Output pin */}
        <mesh position={[0.75, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Status LED */}
        <mesh position={[0, 0.35, 0.16]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Connection Wire ─── */
function Wire({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  );
}

/* ─── Floating Binary ─── */
function FloatingBit({ position, char }: { position: [number, number, number]; char: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15;
    }
  });

  return (
    <Html position={position} ref={ref as any} transform>
      <div
        className="font-mono text-sm font-bold select-none pointer-events-none"
        style={{
          color: char === "1" ? "#22d3ee" : "#333355",
          textShadow: char === "1" ? "0 0 10px rgba(34,211,238,0.5)" : "none",
        }}
      >
        {char}
      </div>
    </Html>
  );
}

/* ─── Main Scene ─── */
export default function LogicGatesScene3D() {
  return (
    <div className="w-full h-[350px] md:h-[450px]">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 4, 4]} intensity={0.5} color="#22d3ee" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#34d399" />

        <GateBody position={[-2.5, 0.8, 0]} type="AND" color="#22d3ee" />
        <GateBody position={[-2.5, -0.8, 0]} type="OR" color="#34d399" />
        <GateBody position={[0, 0, 0]} type="XOR" color="#a78bfa" />
        <GateBody position={[2.5, 0, 0]} type="NAND" color="#f59e0b" />

        {/* Wires connecting gates */}
        <Wire start={[-1.8, 0.8, 0]} end={[-0.6, 0.2, 0]} color="#22d3ee" />
        <Wire start={[-1.8, -0.8, 0]} end={[-0.6, -0.2, 0]} color="#34d399" />
        <Wire start={[0.6, 0, 0]} end={[1.8, 0, 0]} color="#a78bfa" />

        {/* Floating binary bits */}
        {[
          [-3.5, 1.5, -1], [-3.8, 0.5, -1], [-3.3, -0.5, -1], [-3.7, -1.5, -1],
          [3.5, 0.8, -1], [3.2, -0.5, -1], [3.8, 1.2, -1],
          [-0.5, 1.8, -1], [0.5, -1.5, -1], [1.5, 1.2, -1],
        ].map((pos, i) => (
          <FloatingBit
            key={i}
            position={pos as [number, number, number]}
            char={i % 2 === 0 ? "1" : "0"}
          />
        ))}

        <fog attach="fog" args={["#0a0a1a", 6, 16]} />
      </Canvas>
    </div>
  );
}
