"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Glowing Vertical Line ─── */
function TimelineLine() {
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 8, 16]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ─── Timeline Node ─── */
function TimelineNode({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index * 1.5) * 0.2;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Connection arm to center line */}
      <mesh position={[-position[0] / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, Math.abs(position[0]), 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

/* ─── Floating Data Particles ─── */
function DataParticles() {
  const count = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      temp.push({
        x: side * (0.5 + Math.random() * 2),
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 2,
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
      const yOff = Math.sin(t * p.speed + p.offset) * 0.2;
      matrix.setPosition(p.x, p.y + yOff, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

/* ─── Rotating Group ─── */
function TimelineGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  const nodes: { pos: [number, number, number]; color: string }[] = [
    { pos: [1.5, 3, 0], color: "#3B82F6" },
    { pos: [-1.2, 1, 0.8], color: "#14B8A6" },
    { pos: [1.8, -1, -0.5], color: "#818CF8" },
    { pos: [-1.5, -3, 0.3], color: "#3B82F6" },
    { pos: [1.0, -0.5, 1.2], color: "#14B8A6" },
  ];

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef}>
        <TimelineLine />
        {nodes.map((node, i) => (
          <TimelineNode key={i} position={node.pos} color={node.color} index={i} />
        ))}
        <DataParticles />
      </group>
    </Float>
  );
}

/* ─── Main Timeline Scene ─── */
export default function TimelineScene3D() {
  return (
    <div className="w-full h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 4, 4]} intensity={0.4} color="#3B82F6" />
        <pointLight position={[-2, -3, 3]} intensity={0.2} color="#14B8A6" />
        <pointLight position={[0, 0, 5]} intensity={0.2} color="#818CF8" />

        <TimelineGroup />

        <fog attach="fog" args={["#0F172A", 7, 16]} />
      </Canvas>
    </div>
  );
}
