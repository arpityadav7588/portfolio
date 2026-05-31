"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── PCB Board ─── */
function PCBBoard() {
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <group rotation={[-Math.PI / 5, 0.2, 0]}>
        {/* PCB substrate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 3, 0.08]} />
          <meshStandardMaterial color="#0F172A" metalness={0.3} roughness={0.8} />
        </mesh>
        {/* Copper traces — animated pulse */}
        <SignalTraces />
        {/* Copper pads */}
        <CopperPads />
        {/* SMD components */}
        <SMDComponents />
      </group>
    </Float>
  );
}

/* ─── Animated Signal Traces ─── */
function SignalTraces() {
  const tracesRef = useRef<THREE.Group>(null);

  const tracePaths = useMemo(() => {
    const paths: { points: THREE.Vector3[]; color: string }[] = [];
    // Horizontal traces
    for (let i = 0; i < 6; i++) {
      const y = -1.2 + i * 0.45;
      const pts: THREE.Vector3[] = [];
      for (let x = -1.8; x <= 1.8; x += 0.15) {
        pts.push(new THREE.Vector3(x, y + Math.sin(x * 3 + i) * 0.05, 0.045));
      }
      paths.push({ points: pts, color: i % 2 === 0 ? "#3B82F6" : "#14B8A6" });
    }
    // Vertical traces
    for (let i = 0; i < 4; i++) {
      const x = -1.2 + i * 0.7;
      const pts: THREE.Vector3[] = [];
      for (let y = -1.3; y <= 1.3; y += 0.15) {
        pts.push(new THREE.Vector3(x + Math.sin(y * 2 + i) * 0.04, y, 0.045));
      }
      paths.push({ points: pts, color: "#818CF8" });
    }
    return paths;
  }, []);

  // Pulse effect: shift color intensity per frame
  const pulseMaterials = useRef<THREE.LineBasicMaterial[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulseMaterials.current.forEach((mat, i) => {
      // Create a traveling pulse effect
      const pulse = 0.3 + 0.7 * Math.max(0, Math.sin(t * 2 - i * 0.8));
      mat.opacity = pulse;
    });
  });

  return (
    <group ref={tracesRef}>
      {tracePaths.map((trace, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(trace.points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              ref={(el) => { if (el) pulseMaterials.current[i] = el; }}
              color={trace.color}
              transparent
              opacity={0.5}
            />
          </line>
        );
      })}
    </group>
  );
}

/* ─── Copper Pads ─── */
function CopperPads() {
  const pads = useMemo(() => {
    const arr: { pos: [number, number, number] }[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        pos: [
          -1.5 + (i % 4) * 1.0,
          -1.0 + Math.floor(i / 4) * 0.9,
          0.05,
        ],
      });
    }
    return arr;
  }, []);

  return (
    <>
      {pads.map((pad, i) => (
        <mesh key={`pad-${i}`} position={pad.pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial
            color="#94A3B8"
            metalness={0.95}
            roughness={0.1}
            emissive="#3B82F6"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── SMD Components ─── */
function SMDComponents() {
  const components = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: [number, number, number]; color: string }[] = [];
    const smdPositions = [
      { x: -1.3, y: -0.5 }, { x: 0.3, y: 0.8 }, { x: 1.0, y: -0.8 },
      { x: -0.5, y: 0.2 }, { x: 0.8, y: 0.5 }, { x: -0.8, y: -1.0 },
      { x: 1.3, y: 0.1 }, { x: 0.0, y: -0.3 },
    ];
    for (const p of smdPositions) {
      arr.push({
        pos: [p.x, p.y, 0.055],
        scale: [0.15 + Math.random() * 0.1, 0.06 + Math.random() * 0.03, 0.06],
        color: i => i % 3 === 0 ? "#1E293B" : i % 3 === 1 ? "#334155" : "#1E293B",
      });
    }
    return arr;
  }, []);

  return (
    <>
      {[
        { pos: [-1.3, -0.5, 0.055] as [number, number, number], s: [0.18, 0.07, 0.06] as [number, number, number] },
        { pos: [0.3, 0.8, 0.055] as [number, number, number], s: [0.2, 0.06, 0.06] as [number, number, number] },
        { pos: [1.0, -0.8, 0.055] as [number, number, number], s: [0.15, 0.08, 0.06] as [number, number, number] },
        { pos: [-0.5, 0.2, 0.055] as [number, number, number], s: [0.22, 0.06, 0.06] as [number, number, number] },
        { pos: [0.8, 0.5, 0.055] as [number, number, number], s: [0.16, 0.07, 0.06] as [number, number, number] },
        { pos: [-0.8, -1.0, 0.055] as [number, number, number], s: [0.18, 0.06, 0.06] as [number, number, number] },
        { pos: [1.3, 0.1, 0.055] as [number, number, number], s: [0.14, 0.08, 0.06] as [number, number, number] },
        { pos: [0.0, -0.3, 0.055] as [number, number, number], s: [0.2, 0.07, 0.06] as [number, number, number] },
      ].map((comp, i) => (
        <mesh key={`smd-${i}`} position={comp.pos} scale={comp.s}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#1E293B" : "#334155"}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Background Particles ─── */
function CircuitParticles() {
  const count = 30;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6 - 2,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const matrix = new THREE.Matrix4();
      const yOff = Math.sin(t * p.speed + p.offset) * 0.3;
      matrix.setPosition(p.x, p.y + yOff, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}

/* ─── Main Circuit Board Scene ─── */
export default function CircuitBoardScene3D() {
  return (
    <div className="w-full h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[4, 4, 4]} intensity={0.4} color="#3B82F6" />
        <pointLight position={[-3, -2, 3]} intensity={0.2} color="#14B8A6" />
        <pointLight position={[0, 0, 4]} intensity={0.3} color="#818CF8" />

        <PCBBoard />
        <CircuitParticles />

        <fog attach="fog" args={["#0F172A", 7, 15]} />
      </Canvas>
    </div>
  );
}
