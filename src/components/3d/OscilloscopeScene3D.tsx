"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

/* ─── 3D Oscilloscope Screen ─── */
function OscilloscopeScreen() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#22d3ee") },
        uColor2: { value: new THREE.Color("#34d399") },
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
          
          // Background - dark screen
          vec3 bgColor = vec3(0.02, 0.02, 0.06);
          
          // Grid lines
          float gridX = smoothstep(0.02, 0.0, abs(fract(uv.x * 10.0) - 0.5) - 0.48);
          float gridY = smoothstep(0.02, 0.0, abs(fract(uv.y * 8.0) - 0.5) - 0.48);
          float grid = max(gridX, gridY) * 0.15;
          
          // Center crosshair (brighter)
          float centerX = smoothstep(0.005, 0.0, abs(uv.x - 0.5));
          float centerY = smoothstep(0.005, 0.0, abs(uv.y - 0.5));
          float crosshair = max(centerX, centerY) * 0.3;
          
          // Waveform 1 - main signal (cyan)
          float wave1Y = 0.5 + sineWave(uv.x, 12.0, 0.25, uTime * 3.0) 
                         + sineWave(uv.x, 6.0, 0.1, uTime * 1.5);
          float wave1 = smoothstep(0.015, 0.0, abs(uv.y - wave1Y));
          float wave1Glow = smoothstep(0.08, 0.0, abs(uv.y - wave1Y)) * 0.3;
          
          // Waveform 2 - secondary signal (emerald)
          float wave2Y = 0.5 + sineWave(uv.x, 8.0, 0.2, uTime * 2.0 + 1.5)
                         + sineWave(uv.x, 20.0, 0.05, uTime * 4.0);
          float wave2 = smoothstep(0.01, 0.0, abs(uv.y - wave2Y));
          float wave2Glow = smoothstep(0.06, 0.0, abs(uv.y - wave2Y)) * 0.2;
          
          // Composite
          vec3 color = bgColor;
          color += vec3(grid) * uColor1 * 0.5;
          color += vec3(crosshair) * uColor1;
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
        {/* Oscilloscope body */}
        <mesh position={[0, 0, -0.15]}>
          <boxGeometry args={[3.2, 2.2, 0.4]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Screen bezel */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.8, 1.9, 0.02]} />
          <meshStandardMaterial
            color="#0a0a1a"
            metalness={0.5}
            roughness={0.5}
          />
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
            <meshStandardMaterial
              color="#333355"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
        {/* Knob labels */}
        {["VOLTS", "TIME", "TRIG"].map((label, i) => (
          <mesh key={`label-${i}`} position={[-1.2 + i * 0.4, -1.25, 0.1]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.12, 0.01]} />
            <meshStandardMaterial color="#222244" />
          </mesh>
        ))}
        {/* Brand marking */}
        <mesh position={[0.8, -1.0, 0.1]}>
          <boxGeometry args={[0.6, 0.15, 0.01]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.3}
          />
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
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#22d3ee" />
        <pointLight position={[-2, -1, 2]} intensity={0.2} color="#34d399" />

        <OscilloscopeScreen />

        <fog attach="fog" args={["#0a0a1a", 6, 14]} />
      </Canvas>
    </div>
  );
}
