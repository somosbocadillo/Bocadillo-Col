"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Floating Ingredient Component
function FloatingIngredient({ 
  type, 
  position, 
  scale, 
  color, 
  speedMultiplier = 1 
}: { 
  type: "bun-top" | "bun-bottom" | "cheese" | "tomato" | "lettuce"; 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  color: string;
  speedMultiplier?: number;
}) {
  const meshRef = useRef<THREE.Object3D>(null);
  
  // Random starting offsets for phase-shifting
  const randomOffset = useRef({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
  });

  // Generate random sesame seed positions on the upper hemisphere
  const sesameSeeds = useMemo(() => {
    const seeds = [];
    // Deterministic pseudo-random seed generator
    let seed = 42;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    for (let i = 0; i < 35; i++) {
      const theta = Math.acos(1 - random() * 0.6); // keep seeds on the upper 60% of the dome
      const phi = random() * Math.PI * 2;
      const rot = random() * Math.PI * 2;
      seeds.push({ theta, phi, rot });
    }
    return seeds;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime() * speedMultiplier;
    const { x: mouseX, y: mouseY } = state.pointer; // Mouse normalized coordinates (-1 to 1)

    // Base floating motion (sinusoidal offset)
    const floatY = Math.sin(t + randomOffset.current.y) * 0.15;
    const floatX = Math.cos(t + randomOffset.current.x) * 0.1;

    // Target position combines baseline floating + subtle mouse influence
    const targetX = position[0] + floatX + mouseX * 0.4;
    const targetY = position[1] + floatY + mouseY * 0.4;
    const targetZ = position[2];

    // Lerp positions for fluid smoothness
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    // Base floating rotation (subtle oscillation)
    const floatRotX = Math.sin(t + randomOffset.current.x) * 0.08;
    const floatRotY = Math.cos(t + randomOffset.current.y) * 0.08;

    // Target rotation: limit the rotation to prevent thin edges from showing
    const targetRotX = floatRotX + (mouseY * 0.25);
    const targetRotY = floatRotY + (mouseX * 0.25);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);

  });

  // Render different geometries based on ingredient type
  if (type === "bun-top") {
    return (
      <group ref={meshRef} position={position} scale={scale}>
        {/* Outer Dome hemisphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Flat Bottom Circle Cap - gives a realistic flat base (toasted color) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial color="#e2c59d" roughness={0.5} metalness={0.0} side={THREE.DoubleSide} />
        </mesh>

        {/* 3D Sesame Seeds scattered naturally across the top bun surface */}
        {sesameSeeds.map((seed, idx) => (
          <group key={idx} rotation={[0, seed.phi, 0]}>
            <group rotation={[0, 0, seed.theta]}>
              <mesh position={[0, 1.01, 0]} rotation={[0, seed.rot, 0]} castShadow>
                <boxGeometry args={[0.022, 0.012, 0.055]} />
                <meshStandardMaterial color="#fdf7ea" roughness={0.6} metalness={0.0} />
              </mesh>
            </group>
          </group>
        ))}
      </group>
    );
  }

  if (type === "bun-bottom") {
    return (
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.3, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    );
  }

  if (type === "cheese") {
    return (
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.0} />
      </mesh>
    );
  }

  if (type === "tomato") {
    return (
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0.4, 0.1, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.2, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.0} />
      </mesh>
    );
  }

  if (type === "lettuce") {
    return (
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0.1, -0.3, -0.2]} castShadow receiveShadow>
        {/* Low-poly deformed shape representing lettuce */}
        <dodecahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} flatShading />
      </mesh>
    );
  }

  return null;
}

export default function Hero3D() {
  return (
    <div className="hero-3d-canvas-container">
      <Canvas
        camera={{ position: [0, -0.3, 8.8], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        
        {/* Main dramatic lighting */}
        <directionalLight 
          position={[5, 8, 4]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        {/* Fill lighting */}
        <pointLight position={[-5, -4, 2]} intensity={0.4} color="#eee3d0" />

        {/* Hamburger Ingredients Stack */}
        {/* Bun Top */}
        <FloatingIngredient 
          type="bun-top" 
          position={[0, 1.8, 0]} 
          scale={[1.6, 1.1, 1.6]} 
          color="#c67e3a" 
          speedMultiplier={0.7} 
        />

        {/* Lettuce */}
        <FloatingIngredient 
          type="lettuce" 
          position={[-0.2, 0.9, 0.2]} 
          scale={[1.9, 0.3, 1.9]} 
          color="#2e8b3e" 
          speedMultiplier={0.9} 
        />

        {/* Tomato */}
        <FloatingIngredient 
          type="tomato" 
          position={[0.3, 0.2, 0.1]} 
          scale={[1.6, 1, 1.6]} 
          color="#d12517" 
          speedMultiplier={0.8} 
        />

        {/* Cheese */}
        <FloatingIngredient 
          type="cheese" 
          position={[-0.1, -0.4, 0]} 
          scale={[1.1, 1, 1.1]} 
          color="#f2af13" 
          speedMultiplier={0.85} 
        />

        {/* Meat Patty (represented as a textured brown cylinder) */}
        <FloatingIngredient 
          type="tomato" // uses cylinder geometry
          position={[0.0, -1.0, 0.1]} 
          scale={[1.65, 1.7, 1.65]} 
          color="#422513" 
          speedMultiplier={0.75} 
        />

        {/* Bun Bottom */}
        <FloatingIngredient 
          type="bun-bottom" 
          position={[0, -1.9, 0]} 
          scale={[1.5, 1.3, 1.5]} 
          color="#b06d2c" 
          speedMultiplier={0.65} 
        />
      </Canvas>
    </div>
  );
}
