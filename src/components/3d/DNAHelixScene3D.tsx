"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Helix Strand ─── */
function HelixStrand({ color, offset }: { color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 3;
    const height = 8;
    const radius = 0.8;
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * Math.PI * 2 + offset;
      const x = Math.cos(angle) * radius;
      const y = t * height - height / 2;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.CatmullRomCurve3(points);
  }, [offset]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.04, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref} geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

/* ─── Connecting Rungs ─── */
function HelixRungs() {
  const groupRef = useRef<THREE.Group>(null);

  const rungs = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: [number, number, number]; length: number }[] = [];
    const turns = 3;
    const height = 8;
    const radius = 0.8;
    const rungCount = 20;

    for (let i = 0; i < rungCount; i++) {
      const t = i / rungCount;
      const angle = t * turns * Math.PI * 2;
      const y = t * height - height / 2;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const midX = (x1 + x2) / 2;
      const midZ = (z1 + z2) / 2;
      const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
      const rotY = -angle + Math.PI / 2;

      arr.push({
        pos: [midX, y, midZ],
        rot: [0, rotY, 0],
        length,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {rungs.map((rung, i) => (
        <mesh key={i} position={rung.pos} rotation={rung.rot}>
          <cylinderGeometry args={[0.02, 0.02, rung.length, 8]} />
          <meshStandardMaterial
            color="#818CF8"
            emissive="#818CF8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      {/* Glowing nodes at connection points */}
      {rungs.map((rung, i) => {
        const angle = (i / 20) * 3 * Math.PI * 2;
        const r = 0.8;
        return [
          [Math.cos(angle) * r, rung.pos[1], Math.sin(angle) * r],
          [Math.cos(angle + Math.PI) * r, rung.pos[1], Math.sin(angle + Math.PI) * r],
        ].map((pos, j) => (
          <mesh key={`node-${i}-${j}`} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={j === 0 ? "#3B82F6" : "#14B8A6"}
              emissive={j === 0 ? "#3B82F6" : "#14B8A6"}
              emissiveIntensity={0.6}
            />
          </mesh>
        ));
      })}
    </group>
  );
}

/* ─── Background Particles ─── */
function HelixParticles() {
  const count = 80;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6 - 2,
        speed: 0.2 + Math.random() * 0.5,
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
      const xOff = Math.cos(t * p.speed * 0.6 + p.offset) * 0.15;
      matrix.setPosition(p.x + xOff, p.y + yOff, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial
        color="#818CF8"
        emissive="#818CF8"
        emissiveIntensity={0.4}
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}

/* ─── Floating Orbital Particles Around Helix ─── */
function OrbitalParticles() {
  const count = 20;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const orbitals = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;
      temp.push({
        angle,
        y,
        radius: 1.2 + Math.random() * 0.5,
        speed: 0.3 + Math.random() * 0.4,
        ySpeed: 0.1 + Math.random() * 0.2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    orbitals.forEach((o, i) => {
      const matrix = new THREE.Matrix4();
      const a = o.angle + t * o.speed;
      const x = Math.cos(a) * o.radius;
      const z = Math.sin(a) * o.radius;
      const yOff = o.y + Math.sin(t * o.ySpeed) * 0.5;
      matrix.setPosition(x, yOff, z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial
        color="#14B8A6"
        emissive="#14B8A6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

/* ─── Main DNA Helix Scene ─── */
export default function DNAHelixScene3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[4, 4, 4]} intensity={0.4} color="#3B82F6" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#14B8A6" />
        <pointLight position={[0, 0, 5]} intensity={0.2} color="#818CF8" />

        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group>
            <HelixStrand color="#3B82F6" offset={0} />
            <HelixStrand color="#14B8A6" offset={Math.PI} />
            <HelixRungs />
          </group>
        </Float>

        <HelixParticles />
        <OrbitalParticles />

        <fog attach="fog" args={["#0F172A", 8, 18]} />
      </Canvas>
    </div>
  );
}
