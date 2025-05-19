"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, MeshWobbleMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import { Code, Cloud, Database, Layers } from "lucide-react"

const services = [
  {
    title: "Web & Mobile Development",
    icon: Code,
    color: "#22d3ee",
  },
  {
    title: "AI/ML Integration",
    icon: Layers,
    color: "#a855f7",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "#3b82f6",
  },
  {
    title: "API & System Architecture",
    icon: Database,
    color: "#6366f1",
  },
]

function ServiceIcon({ position, color, index }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Icon base */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.2}
          speed={1}
          opacity={0.7}
          transparent
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Icon glow */}
      <pointLight color={color} intensity={1} distance={3} decay={2} />
    </group>
  )
}

function ServiceTitle({ position, title, color }) {
  return (
    <Text
      position={position}
      fontSize={0.2}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter_Bold.json"
      maxWidth={2}
      textAlign="center"
    >
      {title}
    </Text>
  )
}

function ServicesScene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <group ref={groupRef}>
      {services.map((service, index) => {
        const angle = (index / services.length) * Math.PI * 2
        const radius = 3
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        return (
          <Float key={service.title} speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <ServiceIcon position={[x, 0, z]} color={service.color} index={index} />
            <ServiceTitle position={[x, -1.5, z]} title={service.title} color={service.color} />
          </Float>
        )
      })}
    </group>
  )
}

export default function Services3D() {
  return (
    <motion.div
      className="w-full h-[400px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ServicesScene />
      </Canvas>
    </motion.div>
  )
}
