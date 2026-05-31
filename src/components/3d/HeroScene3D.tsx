"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Mouse-reactive Camera ─── */
function MouseCamera() {
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Subtle camera shift based on pointer
    const pointer = state.pointer;
    targetPos.current.x = pointer.x * 0.5;
    targetPos.current.y = pointer.y * 0.3;
    const cam = state.camera;
    cam.position.x += (targetPos.current.x - cam.position.x) * 0.02;
    cam.position.y += (targetPos.current.y - cam.position.y) * 0.02;
    cam.lookAt(0, 0, 0);
  });

  return null;
}

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
    const gap = chipSize / (sidePins + 1);

    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < sidePins; i++) {
        const matrix = new THREE.Matrix4();
        const offset = -chipSize / 2 + gap * (i + 1);

        switch (side) {
          case 0: matrix.setPosition(offset, 0, -chipSize / 2 - pinLength / 2); break;
          case 1: matrix.setPosition(chipSize / 2 + pinLength / 2, 0, offset); break;
          case 2: matrix.setPosition(offset, 0, chipSize / 2 + pinLength / 2); break;
          case 3: matrix.setPosition(-chipSize / 2 - pinLength / 2, 0, offset); break;
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
      {/* Chip body — Deep Navy */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Chip marking dot — Electric Blue accent */}
      <mesh position={[-0.4, 0.11, -0.4]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.3} emissive="#3B82F6" emissiveIntensity={0.2} />
      </mesh>
      {/* Chip text marking */}
      <mesh position={[0, 0.105, 0]}>
        <boxGeometry args={[0.8, 0.01, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Pins */}
      <instancedMesh ref={pinsRef} args={[undefined, undefined, pinCount]}>
        <boxGeometry args={[0.05, 0.08, 0.35]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
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
        <meshStandardMaterial color="#0F172A" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Copper traces — Electric Blue glow */}
      {[0, 0.3, 0.6, -0.3, -0.6].map((x, i) => (
        <mesh
          key={i}
          position={[-3 + x, 0.55, -1 + (i % 2 === 0 ? 0.2 : -0.2)]}
          rotation={[-Math.PI / 4, 0, 0]}
        >
          <boxGeometry args={[0.03, 0.005, 1.2]} />
          <meshStandardMaterial
            color="#3B82F6"
            metalness={0.95}
            roughness={0.1}
            emissive="#3B82F6"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
      {/* SMD components */}
      {[-2.3, -1.8, -2.0, -3.5, -3.8].map((x, i) => (
        <mesh key={`smd-${i}`} position={[x, 0.58, -1 + (i % 2 === 0 ? 0.4 : -0.3)]} rotation={[-Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.15, 0.06, 0.08]} />
          <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.3} />
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
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
    </mesh>
  );
}

/* ─── Floating Signal Particles — Electric Blue ─── */
function SignalParticles() {
  const count = 250;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 12;
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
      <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.8} transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* ─── Glowing Orb (distorted sphere) — Electric Blue core ─── */
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
          color="#0F172A"
          emissive="#3B82F6"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating Holographic Ring ─── */
function HolographicRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} position={[0, 1.5, -3]}>
        <torusGeometry args={[1.5, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#14B8A6"
          emissive="#14B8A6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

/* ─── Data Stream: Floating binary columns ─── */
function DataStream() {
  const columns = useMemo(() => {
    const arr: { x: number; z: number; bits: string[]; speed: number }[] = [];
    for (let col = 0; col < 8; col++) {
      const bits: string[] = [];
      for (let b = 0; b < 6; b++) {
        bits.push(Math.random() > 0.5 ? "1" : "0");
      }
      arr.push({
        x: -7 + col * 2,
        z: -3 - Math.random() * 4,
        bits,
        speed: 0.5 + Math.random() * 1,
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {columns.map((col, ci) => (
        <BinaryColumn key={ci} x={col.x} z={col.z} bits={col.bits} speed={col.speed} />
      ))}
    </group>
  );
}

function BinaryColumn({ x, z, bits, speed }: { x: number; z: number; bits: string[]; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {bits.map((bit, i) => (
        <Html
          key={i}
          position={[0, -2.5 + i * 1, 0]}
          transform
          center
          style={{ pointerEvents: "none" }}
        >
          <div
            className="font-mono text-xs font-bold select-none"
            style={{
              color: bit === "1" ? "#3B82F6" : "#334155",
              textShadow: bit === "1" ? "0 0 8px rgba(59,130,246,0.5)" : "none",
              opacity: 0.6,
            }}
          >
            {bit}
          </div>
        </Html>
      ))}
    </group>
  );
}

/* ─── Electric Arcs between IC chip pins ─── */
function ElectricArcs() {
  const groupRef = useRef<THREE.Group>(null);
  const arcCount = 5;

  const arcData = useMemo(() => {
    const data: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < arcCount; i++) {
      const side = i % 4;
      const chipCenter = [2.5, 0, 0];
      const chipSize = 1.2;
      const pinLength = 0.4;

      let start: [number, number, number];
      let end: [number, number, number];

      switch (side) {
        case 0:
          start = [chipCenter[0] - 0.4 + i * 0.2, chipCenter[1], chipCenter[2] - chipSize / 2 - pinLength];
          end = [chipCenter[0] - 0.3 + i * 0.15, chipCenter[1] + 0.3, chipCenter[2] - chipSize / 2 - pinLength + 0.5];
          break;
        case 1:
          start = [chipCenter[0] + chipSize / 2 + pinLength, chipCenter[1], chipCenter[2] - 0.3 + i * 0.15];
          end = [chipCenter[0] + chipSize / 2 + pinLength - 0.5, chipCenter[1] + 0.4, chipCenter[2] - 0.2 + i * 0.1];
          break;
        default:
          start = [chipCenter[0] + 0.3, chipCenter[1], chipCenter[2] + chipSize / 2 + pinLength];
          end = [chipCenter[0] + 0.1, chipCenter[1] - 0.3, chipCenter[2] + chipSize / 2 + pinLength - 0.3];
          break;
      }
      data.push({ start, end });
    }
    return data;
  }, []);

  const linesRef = useRef<THREE.Line[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    arcData.forEach((arc, i) => {
      const line = linesRef.current[i];
      if (!line) return;
      const geo = line.geometry as THREE.BufferGeometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      if (!posAttr) return;

      const midX = (arc.start[0] + arc.end[0]) / 2 + (Math.random() - 0.5) * 0.2;
      const midY = (arc.start[1] + arc.end[1]) / 2 + (Math.random() - 0.5) * 0.15;
      const midZ = (arc.start[2] + arc.end[2]) / 2 + (Math.random() - 0.5) * 0.1;

      const points = [
        new THREE.Vector3(...arc.start),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(...arc.end),
      ];
      const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
      const curvePoints = curve.getPoints(10);
      const positions = new Float32Array(curvePoints.length * 3);
      curvePoints.forEach((p, j) => {
        positions[j * 3] = p.x;
        positions[j * 3 + 1] = p.y;
        positions[j * 3 + 2] = p.z;
      });
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      posAttr.needsUpdate = true;

      // Flicker opacity
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.random() * 0.5;
    });
  });

  return (
    <group>
      {arcData.map((arc, i) => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(33); // 11 points * 3
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return (
          <line
            key={i}
            ref={(el) => { if (el) linesRef.current[i] = el; }}
            geometry={geo}
          >
            <lineBasicMaterial
              color="#3B82F6"
              transparent
              opacity={0.5}
            />
          </line>
        );
      })}
    </group>
  );
}

/* ─── Rotating Hexagonal Grid (background) ─── */
function HexagonalGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  const hexagons = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: number }[] = [];
    const size = 0.4;
    const rows = 5;
    const cols = 7;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * size * 1.8;
        const y = (r - rows / 2) * size * 1.55 + (c % 2 === 0 ? size * 0.78 : 0);
        arr.push({
          pos: [x, y, -8],
          rot: Math.random() * 0.2,
        });
      }
    }
    return arr;
  }, []);

  return (
    <group ref={ref} position={[0, 0, -5]}>
      {hexagons.map((hex, i) => (
        <mesh key={i} position={hex.pos} rotation={[0, 0, hex.rot]}>
          <circleGeometry args={[0.35, 6]} />
          <meshStandardMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.05}
            emissive="#3B82F6"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main 3D Hero Scene — Dark Tech Blue ─── */
export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        {/* Electric Blue key light */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#3B82F6" />
        {/* Teal fill light */}
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#14B8A6" />
        {/* Indigo rim light */}
        <directionalLight position={[0, -3, 5]} intensity={0.15} color="#818CF8" />
        {/* Electric Blue point light */}
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#3B82F6" distance={15} />
        {/* Teal accent point light */}
        <pointLight position={[3, -2, -2]} intensity={0.4} color="#14B8A6" distance={10} />

        <MouseCamera />

        <ICChip />
        <PCBBoard />
        <GlowingOrb />
        <SignalParticles />
        <HolographicRing />

        <WaveformRing radius={3.5} speed={0.2} color="#3B82F6" />
        <WaveformRing radius={4.2} speed={-0.15} color="#14B8A6" />
        <WaveformRing radius={5} speed={0.1} color="#818CF8" />

        {/* New enhancement elements */}
        <DataStream />
        <ElectricArcs />
        <HexagonalGrid />

        <fog attach="fog" args={["#0F172A", 8, 25]} />
      </Canvas>
    </div>
  );
}
