"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function DynamicAnimatedBackground() {
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
    const baseColor = "#000023"

    // Create multiple gradient layers for a more dynamic effect
    const gradientLayers = [
      {
        colors: ["#000023", "#010135", "#000045", "#000023"],
        speed: 0.02,
        opacity: 1,
        size: 1.2,
      },
      {
        colors: ["#000030", "#010145", "#00015a", "#000030"],
        speed: 0.03,
        opacity: 0.7,
        size: 1.5,
      },
      {
        colors: ["#22d3ee", "#0c4a6e", "#1e40af", "#22d3ee"],
        speed: 0.04,
        opacity: 0.05,
        size: 2,
      },
      {
        colors: ["#a855f7", "#4c1d95", "#1e1b4b", "#a855f7"],
        speed: 0.05,
        opacity: 0.03,
        size: 2.5,
      },
    ]

    // Create wave points for dynamic movement
    const wavePoints = []
    const waveCount = 5

    for (let i = 0; i < waveCount; i++) {
      wavePoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        xSpeed: (Math.random() - 0.5) * 0.5,
        ySpeed: (Math.random() - 0.5) * 0.5,
        intensity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      // Clear canvas with base color
      ctx.fillStyle = baseColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update wave points
      wavePoints.forEach((point) => {
        point.x += point.xSpeed
        point.y += point.ySpeed

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.xSpeed *= -1
        if (point.y < 0 || point.y > canvas.height) point.ySpeed *= -1
      })

      // Draw each gradient layer
      gradientLayers.forEach((layer) => {
        time += layer.speed * 0.01

        // Create multiple radial gradients that move
        wavePoints.forEach((point) => {
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            point.radius * layer.size * (1 + 0.2 * Math.sin(time * 5)),
          )

          // Add color stops with dynamic positioning
          layer.colors.forEach((color, index) => {
            const position = index / (layer.colors.length - 1)
            const adjustedPosition = (position + Math.sin(time * 2) * 0.1) % 1
            gradient.addColorStop(adjustedPosition, color)
          })

          // Draw gradient
          ctx.globalAlpha = layer.opacity * point.intensity
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        })
      })

      // Add subtle noise texture for depth
      if (Math.random() < 0.3) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < 0.001) {
            const brightness = Math.random() * 20
            data[i] = Math.min(data[i] + brightness, 255) // R
            data[i + 1] = Math.min(data[i + 1] + brightness, 255) // G
            data[i + 2] = Math.min(data[i + 2] + brightness, 255) // B
          }
        }

        ctx.putImageData(imageData, 0, 0)
      }

      // Add flowing light streaks
      ctx.globalAlpha = 0.1
      for (let i = 0; i < 3; i++) {
        const x = Math.sin(time * (i + 1)) * canvas.width * 0.5 + canvas.width * 0.5
        const y = Math.cos(time * (i + 0.5)) * canvas.height * 0.5 + canvas.height * 0.5
        const size = Math.sin(time * 2) * 100 + 200

        const streak = ctx.createLinearGradient(x - size, y - size, x + size, y + size)

        streak.addColorStop(0, "rgba(34, 211, 238, 0)")
        streak.addColorStop(0.5, "rgba(34, 211, 238, 0.1)")
        streak.addColorStop(1, "rgba(34, 211, 238, 0)")

        ctx.fillStyle = streak
        ctx.beginPath()
        ctx.ellipse(x, y, size * 2, size / 2, Math.sin(time) * Math.PI, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

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
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
