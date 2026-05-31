"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Project Card ─── */
function ProjectCard3D({
  position,
  color,
  rotationSpeed,
}: {
  position: [number, number, number];
  color: string;
  rotationSpeed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Card body — Slate Blue */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 1.1, 0.04]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Card border glow */}
        <mesh>
          <boxGeometry args={[1.64, 1.14, 0.02]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Top accent bar */}
        <mesh position={[0, 0.48, 0.03]}>
          <boxGeometry args={[1.4, 0.06, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        {/* Content lines (simulating text) */}
        {[-0.1, -0.25, -0.4].map((y, i) => (
          <mesh key={i} position={[0, y, 0.03]}>
            <boxGeometry args={[1.0 - i * 0.2, 0.04, 0.01]} />
            <meshStandardMaterial
              color="#334155"
              emissive={color}
              emissiveIntensity={0.05}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
        {/* Metric dots */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={`dot-${i}`} position={[x, -0.35, 0.03]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

/* ─── Background Grid ─── */
function InfiniteGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#3B82F6", "#1E293B"]}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* ─── Main Scene — Dark Tech Blue ─── */
export default function ProjectsScene3D() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[-5, 3, 3]} intensity={0.3} color="#14B8A6" />

        <ProjectCard3D position={[-2.5, 0, 0]} color="#3B82F6" rotationSpeed={0.15} />
        <ProjectCard3D position={[0, 0.5, -1]} color="#14B8A6" rotationSpeed={-0.12} />
        <ProjectCard3D position={[2.5, 0, 0]} color="#818CF8" rotationSpeed={0.1} />

        <InfiniteGrid />

        <fog attach="fog" args={["#0F172A", 8, 20]} />
      </Canvas>
    </div>
  );
}
