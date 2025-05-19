"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import { motion } from "framer-motion"

function CubeFace({ position, rotation, text, color }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.501]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} opacity={0.7} transparent emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 0, 0.51]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {text}
      </Text>
    </group>
  )
}

function RotatingCube({ mousePosition }) {
  const cubeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!cubeRef.current) return

    // Base rotation
    cubeRef.current.rotation.y += 0.005
    cubeRef.current.rotation.x += 0.002

    // Mouse influence when hovered
    if (hovered && mousePosition.current) {
      cubeRef.current.rotation.y += (mousePosition.current.x * 0.01 - cubeRef.current.rotation.y) * 0.1
      cubeRef.current.rotation.x += (mousePosition.current.y * 0.01 - cubeRef.current.rotation.x) * 0.1
    }
  })

  return (
    <group ref={cubeRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#000023" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Front */}
      <CubeFace position={[0, 0, 0.5]} rotation={[0, 0, 0]} text="REACT" color="#61dafb" />

      {/* Back */}
      <CubeFace position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]} text="NODE" color="#68a063" />

      {/* Left */}
      <CubeFace position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} text="NEXT" color="#ffffff" />

      {/* Right */}
      <CubeFace position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} text="THREE" color="#049ef4" />

      {/* Top */}
      <CubeFace position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} text="TYPESCRIPT" color="#3178c6" />

      {/* Bottom */}
      <CubeFace position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} text="TAILWIND" color="#38bdf8" />
    </group>
  )
}

export default function TechCube() {
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mousePosition.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    }
  }

  return (
    <motion.div
      className="w-full h-[300px] md:h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube mousePosition={mousePosition} />
      </Canvas>
    </motion.div>
  )
}
