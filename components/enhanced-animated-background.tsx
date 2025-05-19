"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function EnhancedAnimatedBackground() {
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
    const baseColor = "#000018" // Dark blue base

    // Create flowing gradient points with more vibrant colors
    const flowPoints = []
    const pointCount = 8 // Increased number of points

    // Create different types of gradient points
    for (let i = 0; i < pointCount; i++) {
      flowPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 300, // Larger radius
        xSpeed: (Math.random() - 0.5) * 0.3,
        ySpeed: (Math.random() - 0.5) * 0.3,
        intensity: Math.random() * 0.2 + 0.05, // Increased intensity
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        // Add color variation
        colorType: Math.floor(Math.random() * 3), // 0: white, 1: blue, 2: purple
      })
    }

    // Add glare points (bright, focused points of light)
    const glarePoints = []
    const glareCount = 3

    for (let i = 0; i < glareCount; i++) {
      glarePoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        xSpeed: (Math.random() - 0.5) * 0.5,
        ySpeed: (Math.random() - 0.5) * 0.5,
        intensity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
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

        // Create gradient based on color type
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * pulseFactor)

        if (point.colorType === 0) {
          // White gradient
          gradient.addColorStop(0, `rgba(255, 255, 255, ${point.intensity * pulseFactor})`)
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${point.intensity * 0.5 * pulseFactor})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        } else if (point.colorType === 1) {
          // Blue gradient
          gradient.addColorStop(0, `rgba(100, 200, 255, ${point.intensity * pulseFactor})`)
          gradient.addColorStop(0.5, `rgba(50, 100, 255, ${point.intensity * 0.5 * pulseFactor})`)
          gradient.addColorStop(1, "rgba(0, 0, 255, 0)")
        } else {
          // Purple gradient
          gradient.addColorStop(0, `rgba(180, 100, 255, ${point.intensity * pulseFactor})`)
          gradient.addColorStop(0.5, `rgba(120, 50, 255, ${point.intensity * 0.5 * pulseFactor})`)
          gradient.addColorStop(1, "rgba(80, 0, 255, 0)")
        }

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Update and draw glare points
      glarePoints.forEach((point) => {
        point.x += point.xSpeed
        point.y += point.ySpeed
        point.pulsePhase += point.pulseSpeed

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.xSpeed *= -1
        if (point.y < 0 || point.y > canvas.height) point.ySpeed *= -1

        // Calculate pulse factor
        const pulseFactor = 0.7 + 0.3 * Math.sin(point.pulsePhase)
        const size = point.size * pulseFactor

        // Create glare effect
        const glare = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size)
        glare.addColorStop(0, `rgba(255, 255, 255, ${point.intensity * pulseFactor})`)
        glare.addColorStop(0.2, `rgba(200, 220, 255, ${point.intensity * 0.7 * pulseFactor})`)
        glare.addColorStop(0.4, `rgba(150, 180, 255, ${point.intensity * 0.4 * pulseFactor})`)
        glare.addColorStop(1, "rgba(100, 150, 255, 0)")

        ctx.fillStyle = glare
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add lens flare lines
        const flareCount = 4
        const flareLength = size * 2

        ctx.save()
        ctx.translate(point.x, point.y)
        ctx.rotate(time * 0.2)

        for (let i = 0; i < flareCount; i++) {
          const angle = (i * Math.PI) / flareCount

          const gradient = ctx.createLinearGradient(0, 0, Math.cos(angle) * flareLength, Math.sin(angle) * flareLength)

          gradient.addColorStop(0, `rgba(255, 255, 255, ${point.intensity * 0.8 * pulseFactor})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2 + 3 * pulseFactor

          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(Math.cos(angle) * flareLength, Math.sin(angle) * flareLength)
          ctx.stroke()
        }

        ctx.restore()
      })

      // Add flowing light streaks
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time * (i + 1) * 0.3) * canvas.width * 0.5 + canvas.width * 0.5
        const y = Math.cos(time * (i + 0.5) * 0.3) * canvas.height * 0.5 + canvas.height * 0.5
        const size = Math.sin(time * 1.5) * 150 + 350
        const angle = time * 0.2 + (i * Math.PI) / 3

        // Create more vibrant streaks
        const streak = ctx.createLinearGradient(
          x - Math.cos(angle) * size,
          y - Math.sin(angle) * size,
          x + Math.cos(angle) * size,
          y + Math.sin(angle) * size,
        )

        // Different colors for different streaks
        if (i % 3 === 0) {
          streak.addColorStop(0, "rgba(255, 255, 255, 0)")
          streak.addColorStop(0.5, "rgba(255, 255, 255, 0.1)")
          streak.addColorStop(1, "rgba(255, 255, 255, 0)")
        } else if (i % 3 === 1) {
          streak.addColorStop(0, "rgba(100, 200, 255, 0)")
          streak.addColorStop(0.5, "rgba(100, 200, 255, 0.08)")
          streak.addColorStop(1, "rgba(100, 200, 255, 0)")
        } else {
          streak.addColorStop(0, "rgba(180, 100, 255, 0)")
          streak.addColorStop(0.5, "rgba(180, 100, 255, 0.08)")
          streak.addColorStop(1, "rgba(180, 100, 255, 0)")
        }

        ctx.fillStyle = streak
        ctx.beginPath()
        ctx.ellipse(x, y, size * 1.5, size / 3, angle, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add occasional subtle star-like points
      if (Math.random() < 0.2) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 1.5 + 0.5

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 10)
        glow.addColorStop(0, "rgba(255, 255, 255, 0.15)")
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
      animate={{ opacity: 0.9 }}
      transition={{ duration: 1 }}
    />
  )
}
