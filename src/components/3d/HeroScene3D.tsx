"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Rotating IC Chip ─── */
function ICChip() {
  const groupRef = useRef<THREE.Group>(null);
  const pinsRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  const pinCount = 28;
  const pinPositions = useMemo(() => {
    const positions: THREE.Matrix4[] = [];
    const sidePins = pinCount / 4;
    const chipSize = 1.2;
    const pinLength = 0.4;
    const pinWidth = 0.06;
    const gap = chipSize / (sidePins + 1);

    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < sidePins; i++) {
        const matrix = new THREE.Matrix4();
        const offset = -chipSize / 2 + gap * (i + 1);

        switch (side) {
          case 0: // top
            matrix.setPosition(offset, 0, -chipSize / 2 - pinLength / 2);
            break;
          case 1: // right
            matrix.setPosition(chipSize / 2 + pinLength / 2, 0, offset);
            break;
          case 2: // bottom
            matrix.setPosition(offset, 0, chipSize / 2 + pinLength / 2);
            break;
          case 3: // left
            matrix.setPosition(-chipSize / 2 - pinLength / 2, 0, offset);
            break;
        }
        positions.push(matrix);
      }
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pinsRef.current) {
      pinPositions.forEach((pos, i) => {
        pinsRef.current!.setMatrixAt(i, pos);
      });
      pinsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Chip body */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Chip marking dot */}
      <mesh position={[-0.4, 0.11, -0.4]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#4a4a6a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Chip text marking (simplified as a thin plate) */}
      <mesh position={[0, 0.105, 0]}>
        <boxGeometry args={[0.8, 0.01, 0.6]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Pins */}
      <instancedMesh ref={pinsRef} args={[undefined, undefined, pinCount]}>
        <boxGeometry args={[0.05, 0.08, 0.35]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </instancedMesh>
    </group>
  );
}

/* ─── Floating PCB Board ─── */
function PCBBoard() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={[-3, 0.5, -1]} castShadow>
        <boxGeometry args={[2.5, 0.08, 1.8]} />
        <meshStandardMaterial
          color="#0a5c36"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Copper traces (simplified as thin boxes) */}
      {[0, 0.3, 0.6, -0.3, -0.6].map((x, i) => (
        <mesh
          key={i}
          position={[-3 + x, 0.55, -1 + (i % 2 === 0 ? 0.2 : -0.2)]}
          rotation={[-Math.PI / 4 + Math.sin(0) * 0.1, 0, Math.sin(0) * 0.15]}
        >
          <boxGeometry args={[0.03, 0.005, 1.2]} />
          <meshStandardMaterial
            color="#d4a017"
            metalness={0.95}
            roughness={0.1}
            emissive="#d4a017"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      {/* SMD components */}
      {[-2.3, -1.8, -2.0, -3.5, -3.8].map((x, i) => (
        <mesh
          key={`smd-${i}`}
          position={[x, 0.58, -1 + (i % 2 === 0 ? 0.4 : -0.3)]}
          rotation={[-Math.PI / 4, 0, 0]}
        >
          <boxGeometry args={[0.15, 0.06, 0.08]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </Float>
  );
}

/* ─── Oscilloscope Waveform Rings ─── */
function WaveformRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ─── Floating Signal Particles ─── */
function SignalParticles() {
  const count = 200;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;
      const speed = 0.5 + Math.random() * 1.5;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const matrix = new THREE.Matrix4();
      const yOff = Math.sin(time * p.speed + p.offset) * 0.3;
      matrix.setPosition(p.x, p.y + yOff, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/* ─── Glowing Orb (distorted sphere) ─── */
function GlowingOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={[0, -0.5, -2]} scale={0.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#0a0a2e"
          emissive="#22d3ee"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ─── Main 3D Hero Scene ─── */
export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#22d3ee" />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#34d399" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#22d3ee" distance={15} />
        <pointLight position={[3, -2, -2]} intensity={0.4} color="#34d399" distance={10} />

        <ICChip />
        <PCBBoard />
        <GlowingOrb />
        <SignalParticles />

        <WaveformRing radius={3.5} speed={0.2} color="#22d3ee" />
        <WaveformRing radius={4.2} speed={-0.15} color="#34d399" />
        <WaveformRing radius={5} speed={0.1} color="#6366f1" />

        <fog attach="fog" args={["#0a0a1a", 8, 25]} />
      </Canvas>
    </div>
  );
}
