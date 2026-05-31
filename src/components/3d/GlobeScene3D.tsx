"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Wireframe Globe ─── */
function WireframeGlobe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.25}
          emissive="#3B82F6"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

/* ─── Connection Arcs between points ─── */
function ConnectionArcs() {
  const groupRef = useRef<THREE.Group>(null);

  // Define city-like points on sphere surface
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const locations = [
      { lat: 40, lng: -74 },   // New York
      { lat: 51, lng: 0 },     // London
      { lat: 28, lng: 77 },    // Delhi
      { lat: 35, lng: 139 },   // Tokyo
      { lat: -33, lng: 151 },  // Sydney
      { lat: 48, lng: 2 },     // Paris
      { lat: 22, lng: 114 },   // Hong Kong
      { lat: 19, lng: 72 },    // Mumbai
    ];
    const radius = 2.5;
    for (const loc of locations) {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Create arcs between pairs of points
  const arcs = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 1], [1, 5], [2, 7], [3, 6], [4, 6], [0, 2], [1, 7], [5, 2],
    ];
    return pairs.map(([a, b]) => {
      const start = points[a];
      const end = points[b];
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(2.5 + dist * 0.3);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(30);
      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      return geometry;
    });
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color="#14B8A6"
            transparent
            opacity={0.4}
          />
        </line>
      ))}
      {/* Pulsing dots at locations */}
      {points.map((pos, i) => (
        <PulsingDot key={i} position={pos} />
      ))}
    </group>
  );
}

/* ─── Pulsing Dot ─── */
function PulsingDot({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position.x * 3) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

/* ─── Background Particles ─── */
function GlobeParticles() {
  const count = 60;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10 - 3,
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
        opacity={0.4}
      />
    </instancedMesh>
  );
}

/* ─── Main Globe Scene ─── */
export default function GlobeScene3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#3B82F6" />
        <pointLight position={[-3, -2, 3]} intensity={0.2} color="#14B8A6" />

        <WireframeGlobe />
        <ConnectionArcs />
        <GlobeParticles />

        <fog attach="fog" args={["#0F172A", 8, 18]} />
      </Canvas>
    </div>
  );
}
