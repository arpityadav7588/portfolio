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

/* ─── Hexagonal Platform under each pipeline node ─── */
function HexPlatform({ position, color, status }: { position: [number, number, number]; color: string; status: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = status === "active" ? 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0.2;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  const glowColor = status === "completed" ? "#14B8A6" : status === "active" ? "#F59E0B" : "#334155";

  return (
    <mesh ref={ref} position={[position[0], position[1] - 0.6, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.5, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={glowColor}
        emissiveIntensity={0.2}
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
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
    if (ringRef.current) {
      const rotSpeed = status === "active" ? 2 : status === "completed" ? 0.8 : 0.3;
      ringRef.current.rotation.z = state.clock.elapsedTime * rotSpeed;
      const pulse = status === "active"
        ? 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.2
        : 1;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  const statusColor = status === "completed" ? "#14B8A6" : status === "active" ? "#F59E0B" : "#334155";

  return (
    <group ref={nodeRef} position={position}>
      {/* Node sphere */}
      <mesh>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={statusColor}
          emissiveIntensity={status === "upcoming" ? 0.3 : 0.7}
          transparent
          opacity={status === "upcoming" ? 0.5 : 0.9}
        />
      </mesh>

      {/* Rotating ring around every node */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.012, 8, 32]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={status === "upcoming" ? 0.15 : 0.4}
          transparent
          opacity={status === "upcoming" ? 0.2 : 0.45}
        />
      </mesh>

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

      {/* Active status indicator — amber glow */}
      {status === "active" && (
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={1.0}
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

      {/* Hexagonal platform below */}
      <HexPlatform position={position} color={color} status={status} />

      {/* Label */}
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
  const count = 50;
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

/* ─── Energy Beam between nodes ─── */
function EnergyBeam({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.sqrt(dx * dx + dy * dy);
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const angle = Math.atan2(dy, dx);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 3 + start[0]) * 0.2;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <mesh ref={ref} position={[midX, midY, 0]} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, 0.02, 0.02]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.35}
      />
    </mesh>
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

/* ─── Grid Floor below the pipeline ─── */
function GridFloor() {
  const gridRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const arr: { points: THREE.Vector3[]; color: string }[] = [];
    const size = 16;
    const divisions = 20;
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      const pos = -size / 2 + i * step;
      arr.push({
        points: [new THREE.Vector3(pos, 0, -size / 2), new THREE.Vector3(pos, 0, size / 2)],
        color: "#3B82F6",
      });
      arr.push({
        points: [new THREE.Vector3(-size / 2, 0, pos), new THREE.Vector3(size / 2, 0, pos)],
        color: "#3B82F6",
      });
    }
    return arr;
  }, []);

  return (
    <group ref={gridRef} position={[0, -2.2, 0]}>
      {lines.map((line, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(line.points);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={line.color} transparent opacity={0.06} />
          </line>
        );
      })}
    </group>
  );
}

/* ─── Rotating Pipeline Group ─── */
function PipelineGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      // Slight tilt for better 3D perspective
      groupRef.current.rotation.x = 0.15 + Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
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

  const nodePositions = pipelineProjects.map((_, i) => {
    const x = startX + i * nodeSpacing;
    const yOffset = i % 2 === 0 ? 1.0 : -1.0;
    return [x, yOffset, 0] as [number, number, number];
  });

  return (
    <Float speed={0.5} rotationIntensity={0.03} floatIntensity={0.1}>
      <group ref={groupRef}>
        <PipelineTrack />

        {/* Signal pulses traveling along the track */}
        <SignalPulse offset={0} speed={0.8} color="#3B82F6" />
        <SignalPulse offset={3} speed={0.6} color="#14B8A6" />
        <SignalPulse offset={6} speed={1.0} color="#818CF8" />

        {/* Pipeline nodes (alternating above/below track) */}
        {pipelineProjects.map((proj, i) => (
          <PipelineNode
            key={i}
            position={nodePositions[i]}
            color={proj.color}
            index={i}
            label={proj.label}
            status={proj.status}
          />
        ))}

        {/* Energy beams between nodes */}
        {pipelineProjects.slice(0, -1).map((proj, i) => (
          <EnergyBeam
            key={`beam-${i}`}
            start={nodePositions[i]}
            end={nodePositions[i + 1]}
            color={proj.color}
          />
        ))}

        {/* Flow arrows between nodes */}
        {pipelineProjects.slice(0, -1).map((_, i) => {
          const x = startX + i * nodeSpacing + nodeSpacing / 2;
          return <FlowArrow key={`arrow-${i}`} position={[x, 0, 0]} color={pipelineProjects[i].color} />;
        })}

        <DataChips />
        <GridFloor />
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
