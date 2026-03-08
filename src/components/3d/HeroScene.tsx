"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

function FloatingIcosahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={position}>
        <MeshDistortMaterial
          color="#06b6d4"
          roughness={0.15}
          metalness={0.9}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Icosahedron>
    </Float>
  );
}

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[0.8, 0.3, 16, 32]} position={position}>
        <MeshWobbleMaterial
          color="#3b82f6"
          roughness={0.1}
          metalness={0.8}
          factor={0.3}
          speed={1.5}
          transparent
          opacity={0.6}
        />
      </Torus>
    </Float>
  );
}

function FloatingOctahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
      <Octahedron ref={meshRef} args={[0.6]} position={position}>
        <MeshDistortMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.85}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.5}
        />
      </Octahedron>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Sphere ref={meshRef} args={[3, 32, 32]} position={[0, 0, -2]}>
      <meshBasicMaterial
        color="#0e7490"
        wireframe
        transparent
        opacity={0.08}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0f2fe" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#06b6d4" />
        <pointLight position={[5, 3, -3]} intensity={0.3} color="#8b5cf6" />

        <FloatingIcosahedron position={[2.5, 1, 0]} />
        <FloatingTorus position={[-2.8, -0.5, -1]} />
        <FloatingOctahedron position={[-1, 2, -0.5]} />
        <FloatingOctahedron position={[1.5, -2, 0.5]} />
        <WireframeSphere />
        <Particles />
      </Canvas>
    </div>
  );
}
