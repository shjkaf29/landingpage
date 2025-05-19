"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { motion } from "framer-motion"

const technologies = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#3776ab" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
  { name: "GraphQL", color: "#e535ab" },
  { name: "MongoDB", color: "#47a248" },
  { name: "PostgreSQL", color: "#336791" },
]

function TechLogo({ name, color, position, index }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    // Subtle floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1

    // Subtle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Tech logo background */}
      <mesh>
        <planeGeometry args={[1.5, 0.6]} />
        <meshStandardMaterial color={color} opacity={0.2} transparent emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Tech name */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {name}
      </Text>

      {/* Glowing outline */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.6, 0.7]} />
        <meshBasicMaterial color={color} opacity={0.1} transparent wireframe />
      </mesh>
    </group>
  )
}

function TechScene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    // Very subtle overall rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  // Calculate positions in a grid
  const positions = []
  const cols = 5
  const rows = Math.ceil(technologies.length / cols)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j
      if (index < technologies.length) {
        const x = (j - Math.floor(cols / 2)) * 2
        const y = (i - Math.floor(rows / 2)) * 1.2
        positions.push([x, y, 0])
      }
    }
  }

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => (
        <Float key={tech.name} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <TechLogo name={tech.name} color={tech.color} position={positions[index]} index={index} />
        </Float>
      ))}
    </group>
  )
}

export default function TechStack3D() {
  return (
    <motion.div
      className="w-full h-[500px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TechScene />
      </Canvas>
    </motion.div>
  )
}
