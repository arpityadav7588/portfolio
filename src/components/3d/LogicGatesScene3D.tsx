"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Logic Gate ─── */
function GateBody({
  position,
  type,
  color,
  truthTable,
}: {
  position: [number, number, number];
  type: string;
  color: string;
  truthTable: { a: number; b: number; out: number }[];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const signalRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
    }
    // Animate input/output signals
    signalRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 3 + i * 1.2) * 0.4;
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Gate body — Slate Blue */}
        <mesh ref={ref}>
          <boxGeometry args={[1.2, 0.8, 0.3]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Gate border glow */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[1.24, 0.84, 0.28]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Label */}
        <Html center position={[0, 0, 0.2]} transform>
          <div className="text-center select-none pointer-events-none">
            <div className="text-xs font-mono font-bold" style={{ color }}>
              {type}
            </div>
          </div>
        </Html>
        {/* Truth table display */}
        <Html center position={[0, -0.6, 0.15]} transform>
          <div className="select-none pointer-events-none" style={{ background: "rgba(15, 23, 42, 0.8)", border: `1px solid ${color}33`, borderRadius: 4, padding: "2px 4px" }}>
            <table style={{ fontSize: 7, fontFamily: "monospace", color: "#94A3B8", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color }}>
                  <th style={{ padding: "0 3px" }}>A</th>
                  <th style={{ padding: "0 3px" }}>B</th>
                  <th style={{ padding: "0 3px" }}>Out</th>
                </tr>
              </thead>
              <tbody>
                {truthTable.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: "0 3px", color: row.a ? color : "#334155" }}>{row.a}</td>
                    <td style={{ padding: "0 3px", color: row.b ? color : "#334155" }}>{row.b}</td>
                    <td style={{ padding: "0 3px", color: row.out ? "#14B8A6" : "#334155" }}>{row.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Html>
        {/* Input pins with signal animation */}
        <mesh position={[-0.75, 0.2, 0]} ref={(el) => { if (el) signalRefs.current[0] = el; }}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.75, -0.2, 0]} ref={(el) => { if (el) signalRefs.current[1] = el; }}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Output pin */}
        <mesh position={[0.75, 0, 0]} ref={(el) => { if (el) signalRefs.current[2] = el; }}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Status LED */}
        <mesh position={[0, 0.35, 0.16]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Animated Connection Wire ─── */
function Wire({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (pulseRef.current) {
      // Signal traveling along the wire
      const t = (state.clock.elapsedTime * 0.5 + start[0]) % 1;
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
    }
  });

  return (
    <group ref={ref}>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </line>
      {/* Signal pulse traveling along wire */}
      <mesh ref={pulseRef} position={start}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ─── Floating Binary — Dark Tech Blue ─── */
function FloatingBit({ position, char }: { position: [number, number, number]; char: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Html transform>
        <div
          className="font-mono text-sm font-bold select-none pointer-events-none"
          style={{
            color: char === "1" ? "#3B82F6" : "#334155",
            textShadow: char === "1" ? "0 0 10px rgba(59,130,246,0.5)" : "none",
          }}
        >
          {char}
        </div>
      </Html>
    </group>
  );
}

/* ─── Input Signal Display ─── */
function InputSignal({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float wave = step(0.5, fract(vUv.x * 4.0 - uTime * 0.5));
          float signal = smoothstep(0.02, 0.0, abs(vUv.y - mix(0.3, 0.7, wave)));
          float glow = smoothstep(0.1, 0.0, abs(vUv.y - mix(0.3, 0.7, wave))) * 0.2;
          vec3 col = uColor * (signal * 1.5 + glow);
          float alpha = signal * 0.8 + glow;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    }),
    [color]
  );

  useFrame((state) => {
    if (ref.current) {
      const mesh = ref.current.children[0] as THREE.Mesh;
      const mat = mesh.material as THREE.ShaderMaterial;
      if (mat?.uniforms?.uTime) {
        mat.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <planeGeometry args={[0.8, 0.4]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={shaderData.uniforms}
          vertexShader={shaderData.vertexShader}
          fragmentShader={shaderData.fragmentShader}
        />
      </mesh>
    </group>
  );
}

/* ─── Main Scene — Dark Tech Blue ─── */
export default function LogicGatesScene3D() {
  const andTruth = [
    { a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 0 },
    { a: 1, b: 0, out: 0 }, { a: 1, b: 1, out: 1 },
  ];
  const orTruth = [
    { a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 1 },
    { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 1 },
  ];
  const xorTruth = [
    { a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 1 },
    { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 0 },
  ];
  const nandTruth = [
    { a: 0, b: 0, out: 1 }, { a: 0, b: 1, out: 1 },
    { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 0 },
  ];

  return (
    <div className="w-full h-[350px] md:h-[450px]">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 4, 4]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#14B8A6" />

        <GateBody position={[-2.5, 0.8, 0]} type="AND" color="#3B82F6" truthTable={andTruth} />
        <GateBody position={[-2.5, -0.8, 0]} type="OR" color="#14B8A6" truthTable={orTruth} />
        <GateBody position={[0, 0, 0]} type="XOR" color="#818CF8" truthTable={xorTruth} />
        <GateBody position={[2.5, 0, 0]} type="NAND" color="#F59E0B" truthTable={nandTruth} />

        {/* Wires connecting gates */}
        <Wire start={[-1.8, 0.8, 0]} end={[-0.6, 0.2, 0]} color="#3B82F6" />
        <Wire start={[-1.8, -0.8, 0]} end={[-0.6, -0.2, 0]} color="#14B8A6" />
        <Wire start={[0.6, 0, 0]} end={[1.8, 0, 0]} color="#818CF8" />

        {/* Input signal displays */}
        <InputSignal position={[-3.8, 0.8, 0.2]} color="#3B82F6" />
        <InputSignal position={[-3.8, -0.8, 0.2]} color="#14B8A6" />

        {/* Floating binary bits */}
        {[
          [-3.5, 1.5, -1], [-3.8, 0.5, -1], [-3.3, -0.5, -1], [-3.7, -1.5, -1],
          [3.5, 0.8, -1], [3.2, -0.5, -1], [3.8, 1.2, -1],
          [-0.5, 1.8, -1], [0.5, -1.5, -1], [1.5, 1.2, -1],
        ].map((pos, i) => (
          <FloatingBit
            key={i}
            position={pos as [number, number, number]}
            char={i % 2 === 0 ? "1" : "0"}
          />
        ))}

        <fog attach="fog" args={["#0F172A", 6, 16]} />
      </Canvas>
    </div>
  );
}
