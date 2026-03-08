"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Neural network nodes ───────────────────────────── */
function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, connections } = useMemo(() => {
    const count = 60;
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 2,
      ]);
    }

    // Build connections for nearby nodes
    const conns: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i][0] - pos[j][0];
        const dy = pos[i][1] - pos[j][1];
        const dz = pos[i][2] - pos[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3.5) conns.push([i, j]);
      }
    }

    return { positions: pos, connections: conns };
  }, []);

  // Connection lines geometry
  const lineGeometry = useMemo(() => {
    const pts: number[] = [];
    for (const [a, b] of connections) {
      pts.push(...positions[a], ...positions[b]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [connections, positions]);

  // Particle positions
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(positions.length * 3);
    positions.forEach(([x, y, z], i) => {
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    });
    return arr;
  }, [positions]);

  // Background star particles
  const starPositions = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.018;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
        />
      </lineSegments>

      {/* Neural node points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#22d3ee"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Stars background */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#7dd3fc"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ── Pulsing ring ────────────────────────────────────── */
function PulsingRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
      ref.current.scale.set(s, s, 1);
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[4, 0.015, 4, 120]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} />
    </mesh>
  );
}

function PulsingRing2() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.04;
      ref.current.scale.set(s, s, 1);
      ref.current.rotation.z = -state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -3.5]}>
      <torusGeometry args={[6, 0.01, 4, 160]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.04} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#06b6d4" />

        <NeuralNodes />
        <PulsingRing />
        <PulsingRing2 />
      </Canvas>
    </div>
  );
}
