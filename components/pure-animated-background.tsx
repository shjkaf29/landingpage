"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function PureAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient animation
    let time = 0
    const baseColor = "#000018" // Even darker blue

    // Create flowing gradient points
    const flowPoints = []
    const pointCount = 6

    for (let i = 0; i < pointCount; i++) {
      flowPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        xSpeed: (Math.random() - 0.5) * 0.4,
        ySpeed: (Math.random() - 0.5) * 0.4,
        intensity: Math.random() * 0.15 + 0.05, // White gradient intensity
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      // Clear canvas with base color
      ctx.fillStyle = baseColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update time
      time += 0.005

      // Update flow points
      flowPoints.forEach((point) => {
        point.x += point.xSpeed
        point.y += point.ySpeed
        point.pulsePhase += point.pulseSpeed

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.xSpeed *= -1
        if (point.y < 0 || point.y > canvas.height) point.ySpeed *= -1

        // Calculate pulse factor
        const pulseFactor = 0.7 + 0.3 * Math.sin(point.pulsePhase)

        // Create white gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * pulseFactor)

        // Pure white gradient with varying opacity
        gradient.addColorStop(0, `rgba(255, 255, 255, ${point.intensity * pulseFactor})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${point.intensity * 0.5 * pulseFactor})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Add flowing light streaks (white only)
      for (let i = 0; i < 3; i++) {
        const x = Math.sin(time * (i + 1) * 0.5) * canvas.width * 0.5 + canvas.width * 0.5
        const y = Math.cos(time * (i + 0.5) * 0.5) * canvas.height * 0.5 + canvas.height * 0.5
        const size = Math.sin(time * 2) * 100 + 300
        const angle = time * 0.2 + (i * Math.PI) / 3

        const streak = ctx.createLinearGradient(
          x - Math.cos(angle) * size,
          y - Math.sin(angle) * size,
          x + Math.cos(angle) * size,
          y + Math.sin(angle) * size,
        )

        streak.addColorStop(0, "rgba(255, 255, 255, 0)")
        streak.addColorStop(0.5, "rgba(255, 255, 255, 0.07)")
        streak.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = streak
        ctx.beginPath()
        ctx.ellipse(x, y, size * 1.5, size / 3, angle, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add occasional subtle star-like points
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 1 + 0.5

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 10)
        glow.addColorStop(0, "rgba(255, 255, 255, 0.1)")
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, size * 10, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ duration: 1 }}
    />
  )
}
