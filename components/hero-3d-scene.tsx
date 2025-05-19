"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, Text, Sparkles, MeshDistortMaterial } from "@react-three/drei"
import { Vector3, MathUtils } from "three"
import { motion } from "framer-motion"

function TechSphere({ position, color = "#ffffff", speed = 1, distort = 0.4, radius = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.001 * speed

    if (hovered) {
      meshRef.current.material.distort = MathUtils.lerp(meshRef.current.material.distort, distort * 1.4, 0.1)
    } else {
      meshRef.current.material.distort = MathUtils.lerp(meshRef.current.material.distort, distort, 0.1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.2}
        distort={distort}
      />
    </mesh>
  )
}

function FloatingText({ position, children, color = "#ffffff", size = 0.5, rotation = [0, 0, 0] }) {
  const textRef = useRef()

  useFrame((state) => {
    if (!textRef.current) return
    textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <Text
      ref={textRef}
      position={position}
      rotation={rotation}
      fontSize={size}
      color={color}
      font="/fonts/Inter_Bold.json"
      anchorX="center"
      anchorY="middle"
      maxWidth={2}
      textAlign="center"
    >
      {children}
    </Text>
  )
}

function HexGrid({ count = 20, cellSize = 1, height = 0.1, color = "#ffffff" }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  // Create hex grid
  const hexagons = []
  const width = viewport.width * 0.8
  const rows = Math.ceil(count / 5)
  const cols = Math.ceil(count / rows)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (hexagons.length >= count) break

      const x = (j - cols / 2) * cellSize * 1.5
      const z = (i - rows / 2) * cellSize * 1.732
      // Offset every other row
      const offset = i % 2 === 0 ? 0 : cellSize * 0.75

      hexagons.push(
        <mesh key={`${i}-${j}`} position={[x + offset, 0, z]}>
          <cylinderGeometry args={[cellSize / 2, cellSize / 2, height, 6, 1, false]} />
          <meshStandardMaterial
            color={color}
            opacity={0.2 + Math.random() * 0.3}
            transparent={true}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>,
      )
    }
  }

  return (
    <group ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      {hexagons}
    </group>
  )
}

function MouseFollower() {
  const { viewport, camera, mouse } = useThree()
  const [vec] = useState(() => new Vector3())
  const sphereRef = useRef()

  useFrame(() => {
    if (!sphereRef.current) return

    // Convert mouse position to 3D space
    vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)

    // Smooth follow
    sphereRef.current.position.x = MathUtils.lerp(sphereRef.current.position.x, vec.x, 0.1)
    sphereRef.current.position.y = MathUtils.lerp(sphereRef.current.position.y, vec.y, 0.1)
  })

  return (
    <mesh ref={sphereRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <TechSphere position={[-2, 0, 0]} color="#ffffff" speed={0.8} distort={0.3} radius={1.2} />
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <TechSphere position={[2, -0.5, 1]} color="#ffffff" speed={1.2} distort={0.5} radius={0.8} />
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <TechSphere position={[0, 1.5, -1]} color="#ffffff" speed={1} distort={0.2} radius={0.6} />
      </Float>

      <FloatingText position={[-2, 1.8, 0]} color="#ffffff" size={0.3}>
        INNOVATION
      </FloatingText>

      <FloatingText position={[2, 0.8, 1]} color="#ffffff" size={0.3}>
        TECHNOLOGY
      </FloatingText>

      <FloatingText position={[0, 2.5, -1]} color="#ffffff" size={0.3}>
        FUTURE
      </FloatingText>

      <HexGrid count={30} cellSize={0.8} height={0.05} color="#ffffff" />

      <Sparkles count={100} scale={10} size={2} speed={0.3} opacity={0.2} color="#ffffff" />

      <MouseFollower />

      <Environment preset="night" />
    </>
  )
}

export default function Hero3DScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Scene />
      </Canvas>
    </motion.div>
  )
}
