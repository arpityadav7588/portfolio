"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Glowing Vertical Line ─── */
function TimelineLine() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

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
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index * 1.5) * 0.2;
      ref.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const glowPulse = 0.15 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.1;
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = glowPulse;
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
      {/* Glow around node */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
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

/* ─── Glowing Connection Lines Between Nodes ─── */
function NodeConnection({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const lineRef = useRef<THREE.Line>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2 + start[0]) * 0.1;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
}

/* ─── Floating Data Particles ─── */
function DataParticles() {
  const count = 70;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      temp.push({
        x: side * (0.5 + Math.random() * 2.5),
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 2.5,
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
      const xOff = Math.cos(t * p.speed * 0.5 + p.offset) * 0.1;
      matrix.setPosition(p.x + xOff, p.y + yOff, p.z);
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

/* ─── Timeline Traveling Particle ─── */
function TimelineTravelParticle({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.5 + offset) % 1;
      ref.current.position.y = 4 - t * 8;
    }
  });

  return (
    <mesh ref={ref} position={[0, 4, 0]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color="#14B8A6"
        emissive="#14B8A6"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
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
        {/* Glowing connection lines between sequential nodes */}
        {nodes.slice(0, -1).map((node, i) => (
          <NodeConnection
            key={`conn-${i}`}
            start={node.pos}
            end={nodes[i + 1].pos}
            color={node.color}
          />
        ))}
        <DataParticles />
        {/* Traveling particles along the timeline */}
        <TimelineTravelParticle offset={0} />
        <TimelineTravelParticle offset={0.33} />
        <TimelineTravelParticle offset={0.66} />
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
