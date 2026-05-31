"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Oscilloscope Screen — Dark Tech Blue Enhanced ─── */
function OscilloscopeScreen() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#3B82F6") },
        uColor2: { value: new THREE.Color("#14B8A6") },
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
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;

        float sineWave(float x, float freq, float amp, float phase) {
          return amp * sin(x * freq + phase);
        }

        void main() {
          vec2 uv = vUv;
          
          // Background — deep navy screen
          vec3 bgColor = vec3(0.059, 0.09, 0.165);
          
          // Minor grid lines
          float gridX = smoothstep(0.02, 0.0, abs(fract(uv.x * 10.0) - 0.5) - 0.48);
          float gridY = smoothstep(0.02, 0.0, abs(fract(uv.y * 8.0) - 0.5) - 0.48);
          float grid = max(gridX, gridY) * 0.15;
          
          // Major grid lines (every 5 divisions)
          float majorGridX = smoothstep(0.008, 0.0, abs(fract(uv.x * 2.0) - 0.5) - 0.495);
          float majorGridY = smoothstep(0.008, 0.0, abs(fract(uv.y * 1.6) - 0.5) - 0.495);
          float majorGrid = max(majorGridX, majorGridY) * 0.25;
          
          // Center crosshair (brighter)
          float centerX = smoothstep(0.005, 0.0, abs(uv.x - 0.5));
          float centerY = smoothstep(0.005, 0.0, abs(uv.y - 0.5));
          float crosshair = max(centerX, centerY) * 0.3;
          
          // Tick marks on center crosshair
          float tickX = 0.0;
          for (float i = -5.0; i <= 5.0; i += 1.0) {
            float tx = 0.5 + i * 0.05;
            tickX += smoothstep(0.003, 0.0, abs(uv.x - tx)) * smoothstep(0.015, 0.01, abs(uv.y - 0.5));
          }
          float tickY = 0.0;
          for (float i = -4.0; i <= 4.0; i += 1.0) {
            float ty = 0.5 + i * 0.0625;
            tickY += smoothstep(0.003, 0.0, abs(uv.y - ty)) * smoothstep(0.015, 0.01, abs(uv.x - 0.5));
          }
          float ticks = (tickX + tickY) * 0.3;
          
          // Waveform 1 — Electric Blue main signal
          float wave1Y = 0.5 + sineWave(uv.x, 12.0, 0.25, uTime * 3.0) 
                         + sineWave(uv.x, 6.0, 0.1, uTime * 1.5);
          float wave1 = smoothstep(0.015, 0.0, abs(uv.y - wave1Y));
          float wave1Glow = smoothstep(0.08, 0.0, abs(uv.y - wave1Y)) * 0.3;
          
          // Waveform 2 — Teal secondary signal
          float wave2Y = 0.5 + sineWave(uv.x, 8.0, 0.2, uTime * 2.0 + 1.5)
                         + sineWave(uv.x, 20.0, 0.05, uTime * 4.0);
          float wave2 = smoothstep(0.01, 0.0, abs(uv.y - wave2Y));
          float wave2Glow = smoothstep(0.06, 0.0, abs(uv.y - wave2Y)) * 0.2;
          
          // Composite
          vec3 color = bgColor;
          color += vec3(grid) * uColor1 * 0.5;
          color += vec3(majorGrid) * uColor1;
          color += vec3(crosshair) * uColor1;
          color += vec3(ticks) * uColor1 * 0.5;
          color += wave1 * uColor1 * 1.5;
          color += wave1Glow * uColor1;
          color += wave2 * uColor2 * 1.2;
          color += wave2Glow * uColor2;
          
          // Screen edge vignette
          float vignette = 1.0 - smoothstep(0.3, 0.8, length(uv - 0.5) * 1.4);
          color *= vignette;
          
          // Scanline effect
          float scanline = 0.95 + 0.05 * sin(uv.y * 300.0);
          color *= scanline;
          
          // Slight phosphor glow
          color += uColor1 * 0.02 * vignette;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        {/* Oscilloscope body — Slate Blue */}
        <mesh position={[0, 0, -0.15]}>
          <boxGeometry args={[3.2, 2.2, 0.4]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Screen bezel */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.8, 1.9, 0.02]} />
          <meshStandardMaterial color="#0F172A" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Screen with shader */}
        <mesh ref={meshRef} position={[0, 0, 0.08]}>
          <planeGeometry args={[2.6, 1.7]} />
          <shaderMaterial
            ref={materialRef}
            uniforms={shaderData.uniforms}
            vertexShader={shaderData.vertexShader}
            fragmentShader={shaderData.fragmentShader}
          />
        </mesh>
        {/* Knobs */}
        {[-1.2, -0.8, -0.4].map((x, i) => (
          <mesh key={i} position={[x, -1.0, 0.1]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Knob labels */}
        {["VOLTS", "TIME", "TRIG"].map((label, i) => (
          <mesh key={`label-${i}`} position={[-1.2 + i * 0.4, -1.25, 0.1]}>
            <boxGeometry args={[0.3, 0.12, 0.01]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        ))}
        {/* Brand marking — Electric Blue glow */}
        <mesh position={[0.8, -1.0, 0.1]}>
          <boxGeometry args={[0.6, 0.15, 0.01]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* CH1/CH2 indicators */}
        <mesh position={[-0.9, 0.75, 0.09]}>
          <boxGeometry args={[0.3, 0.08, 0.005]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.5, 0.75, 0.09]}>
          <boxGeometry args={[0.3, 0.08, 0.005]} />
          <meshStandardMaterial color="#14B8A6" emissive="#14B8A6" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Main Scene ─── */
export default function OscilloscopeScene3D() {
  return (
    <div className="w-full h-[350px] md:h-[450px]">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#3B82F6" />
        <pointLight position={[-2, -1, 2]} intensity={0.2} color="#14B8A6" />

        <OscilloscopeScreen />

        <fog attach="fog" args={["#0F172A", 6, 14]} />
      </Canvas>
    </div>
  );
}
