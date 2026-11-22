"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function HeroScene() {
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);

  // Generate particle cloud
  const particleCount = 750;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color("#3B82F6"); // Royal Blue
    const c2 = new THREE.Color("#8B5CF6"); // Hyacinth Blue
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in spherical shell
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      tempColor.lerpColors(c1, c2, Math.random());
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x;
    const my = state.pointer.y;

    // Smooth central sculpture rotation with mouse influence
    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x = t * 0.25 + my * 0.4;
      mainMeshRef.current.rotation.y = t * 0.35 + mx * 0.6;
    }

    // Outer rings counter-rotation
    if (ringRef1.current) {
      ringRef1.current.rotation.x = -t * 0.2 + my * 0.2;
      ringRef1.current.rotation.z = t * 0.15;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.2;
      ringRef2.current.rotation.z = -t * 0.18 + mx * 0.3;
    }

    // Drifting particle cloud
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05 + mx * 0.1;
      particlesRef.current.rotation.x = -t * 0.03 + my * 0.08;
    }

    // Mouse-reactive dynamic lights
    if (lightRef1.current) {
      lightRef1.current.position.x = THREE.MathUtils.lerp(lightRef1.current.position.x, mx * 5, 0.05);
      lightRef1.current.position.y = THREE.MathUtils.lerp(lightRef1.current.position.y, my * 5 + 1, 0.05);
    }
    if (lightRef2.current) {
      lightRef2.current.position.x = THREE.MathUtils.lerp(lightRef2.current.position.x, -mx * 4, 0.05);
      lightRef2.current.position.y = THREE.MathUtils.lerp(lightRef2.current.position.y, -my * 4 - 1, 0.05);
    }

    // Gentle camera parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mx * 0.8, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, my * 0.6, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#FFFFFF"]} />

      {/* Lighting Rig */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
      <pointLight ref={lightRef1} position={[4, 3, 3]} intensity={12} distance={15} color="#3B82F6" />
      <pointLight ref={lightRef2} position={[-4, -3, 2]} intensity={14} distance={15} color="#8B5CF6" />

      {/* Central 3D Sculpture with Float Physics */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Core Torus Knot */}
        <mesh ref={mainMeshRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.35, 0.38, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            roughness={0.12}
            metalness={0.92}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            color="#171B3A"
          />
        </mesh>

        {/* Outer Orbiting Thin Ring */}
        <mesh ref={ringRef1} position={[0, 0, 0]}>
          <torusGeometry args={[2.4, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Second Orbiting Ring */}
        <mesh ref={ringRef2} position={[0, 0, 0]}>
          <torusGeometry args={[2.9, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Ambient Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
