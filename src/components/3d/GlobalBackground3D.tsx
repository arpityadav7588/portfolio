"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Floating Geometric Shapes ─── */
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 12;

  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 5,
        ] as [number, number, number],
        rotation: Math.random() * Math.PI * 2,
        speed: 0.05 + Math.random() * 0.15,
        driftX: (Math.random() - 0.5) * 0.02,
        driftY: (Math.random() - 0.5) * 0.015,
        type: i % 3, // 0=icosahedron, 1=octahedron, 2=tetrahedron
        color: i % 2 === 0 ? "#3B82F6" : "#14B8A6",
        scale: 0.3 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      child.position.x = s.position[0] + Math.sin(t * s.speed + s.rotation) * 2 + t * s.driftX;
      child.position.y = s.position[1] + Math.cos(t * s.speed * 0.7 + s.rotation) * 1.5 + t * s.driftY;
      if (child.position.x > 20) child.position.x -= 40;
      if (child.position.x < -20) child.position.x += 40;
      if (child.position.y > 15) child.position.y -= 30;
      if (child.position.y < -15) child.position.y += 30;
      child.rotation.x = t * s.speed * 0.5;
      child.rotation.y = t * s.speed * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => {
        const geometry =
          s.type === 0 ? (
            <icosahedronGeometry args={[s.scale, 0]} />
          ) : s.type === 1 ? (
            <octahedronGeometry args={[s.scale, 0]} />
          ) : (
            <tetrahedronGeometry args={[s.scale, 0]} />
          );

        return (
          <mesh key={i} position={s.position} rotation={[s.rotation, s.rotation, 0]}>
            {geometry}
            <meshStandardMaterial
              color={s.color}
              wireframe
              transparent
              opacity={0.12}
              emissive={s.color}
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Particle Field ─── */
function ParticleField() {
  const count = 250;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 35,
        y: (Math.random() - 0.5) * 25,
        z: (Math.random() - 0.5) * 25 - 5,
        speed: 0.3 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
        baseY: 0,
      });
      temp[i].baseY = temp[i].y;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollFactor = scrollY * 0.001;

    particles.forEach((p, i) => {
      const matrix = new THREE.Matrix4();
      const yOff = Math.sin(t * p.speed + p.offset) * 0.5;
      const yScroll = scrollFactor * (i % 3 === 0 ? 1 : -0.5);
      matrix.setPosition(p.x, p.baseY + yOff + yScroll, p.z);
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
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

/* ─── Slow-Rotating Background Ring ─── */
function BackgroundRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.3 + Math.PI / 4;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -15]}>
      <torusGeometry args={[12, 0.05, 8, 64]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.15}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

/* ─── Main Global Background Scene ─── */
export default function GlobalBackground3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[5, 5, 10]} intensity={0.2} color="#3B82F6" distance={30} />
      <pointLight position={[-5, -3, 8]} intensity={0.15} color="#14B8A6" distance={25} />

      <FloatingShapes />
      <ParticleField />
      <BackgroundRing />

      <fog attach="fog" args={["#0F172A", 15, 40]} />
    </Canvas>
  );
}
