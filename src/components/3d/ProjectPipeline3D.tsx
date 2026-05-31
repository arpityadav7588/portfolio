"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─── Pipeline Track — Horizontal glowing line ─── */
function PipelineTrack() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main track line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Track glow underneath */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[14, 0.12, 0.12]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.15}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* ─── Signal Pulse traveling along the track ─── */
function SignalPulse({ offset = 0, speed = 1, color = "#3B82F6" }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      const x = ((t % 14) - 7);
      ref.current.position.x = x;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={[-7, 0.06, 0]}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* ─── Pipeline Node — Each project station ─── */
function PipelineNode({
  position,
  color,
  index,
  label,
  status,
}: {
  position: [number, number, number];
  color: string;
  index: number;
  label: string;
  status: "completed" | "active" | "upcoming";
}) {
  const nodeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (nodeRef.current) {
      const bob = Math.sin(state.clock.elapsedTime * 1.2 + index * 0.8) * 0.08;
      nodeRef.current.position.y = position[1] + bob;
    }
    if (ringRef.current && status === "active") {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.2;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={nodeRef} position={position}>
      {/* Node sphere */}
      <mesh>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={status === "upcoming" ? 0.3 : 0.7}
          transparent
          opacity={status === "upcoming" ? 0.5 : 0.9}
        />
      </mesh>

      {/* Pulse ring for active projects */}
      {status === "active" && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.015, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Completed checkmark indicator */}
      {status === "completed" && (
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#14B8A6"
            emissive="#14B8A6"
            emissiveIntensity={0.8}
          />
        </mesh>
      )}

      {/* Vertical connector to track */}
      <mesh position={[0, -position[1] / 2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, Math.abs(position[1]), 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Label — only show on wider screens / low index count */}
      <Html center position={[0, -0.5, 0]} transform occlude={false}>
        <div className="text-center select-none pointer-events-none whitespace-nowrap">
          <div
            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{
              color,
              textShadow: `0 0 8px ${color}66`,
              background: "rgba(15, 23, 42, 0.7)",
              border: `1px solid ${color}33`,
            }}
          >
            {label}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ─── Floating Data Chips around the pipeline ─── */
function DataChips() {
  const count = 30;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const chips = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 3,
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    chips.forEach((p, i) => {
      const matrix = new THREE.Matrix4();
      const yOff = Math.sin(t * p.speed + p.offset) * 0.15;
      matrix.setPosition(p.x, p.y + yOff, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.06, 0.06, 0.02]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.4}
        transparent
        opacity={0.25}
      />
    </instancedMesh>
  );
}

/* ─── Arrow indicators between nodes ─── */
function FlowArrow({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, -Math.PI / 2]}>
      <coneGeometry args={[0.08, 0.2, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ─── Rotating Pipeline Group ─── */
function PipelineGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
    }
  });

  const pipelineProjects = [
    { label: "RISC-V Core", color: "#3B82F6", status: "completed" as const },
    { label: "IoT Monitor", color: "#14B8A6", status: "completed" as const },
    { label: "PID Robot", color: "#818CF8", status: "completed" as const },
    { label: "Sim Dashboard", color: "#3B82F6", status: "active" as const },
    { label: "AFE Suite", color: "#14B8A6", status: "active" as const },
    { label: "Energy Meter", color: "#F59E0B", status: "upcoming" as const },
  ];

  const nodeSpacing = 2.2;
  const startX = -((pipelineProjects.length - 1) * nodeSpacing) / 2;

  return (
    <Float speed={0.5} rotationIntensity={0.03} floatIntensity={0.1}>
      <group ref={groupRef}>
        <PipelineTrack />

        {/* Signal pulses traveling along the track */}
        <SignalPulse offset={0} speed={0.8} color="#3B82F6" />
        <SignalPulse offset={3} speed={0.6} color="#14B8A6" />
        <SignalPulse offset={6} speed={1.0} color="#818CF8" />

        {/* Pipeline nodes (alternating above/below track) */}
        {pipelineProjects.map((proj, i) => {
          const x = startX + i * nodeSpacing;
          const yOffset = i % 2 === 0 ? 1.0 : -1.0;
          return (
            <PipelineNode
              key={i}
              position={[x, yOffset, 0]}
              color={proj.color}
              index={i}
              label={proj.label}
              status={proj.status}
            />
          );
        })}

        {/* Flow arrows between nodes */}
        {pipelineProjects.slice(0, -1).map((_, i) => {
          const x = startX + i * nodeSpacing + nodeSpacing / 2;
          return <FlowArrow key={`arrow-${i}`} position={[x, 0, 0]} color={pipelineProjects[i].color} />;
        })}

        <DataChips />
      </group>
    </Float>
  );
}

/* ─── Main 3D Project Pipeline Scene ─── */
export default function ProjectPipeline3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[-5, 3, 3]} intensity={0.3} color="#14B8A6" />
        <pointLight position={[0, -3, 4]} intensity={0.15} color="#818CF8" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />

        <PipelineGroup />

        <fog attach="fog" args={["#0F172A", 8, 22]} />
      </Canvas>
    </div>
  );
}
