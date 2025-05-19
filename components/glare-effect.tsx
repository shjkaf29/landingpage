"use client"

import { useEffect, useRef } from "react"

interface GlareEffectProps {
  className?: string
  intensity?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  color?: "white" | "blue" | "purple"
}

export default function GlareEffect({
  className = "",
  intensity = "medium",
  speed = "medium",
  color = "white",
}: GlareEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Map intensity to actual values
  const intensityMap = {
    low: 0.2,
    medium: 0.4,
    high: 0.6,
  }

  // Map speed to actual values
  const speedMap = {
    slow: 0.5,
    medium: 1,
    fast: 2,
  }

  // Map color to actual values
  const colorMap = {
    white: { r: 255, g: 255, b: 255 },
    blue: { r: 100, g: 200, b: 255 },
    purple: { r: 180, g: 100, b: 255 },
  }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Get color values
    const { r, g, b } = colorMap[color]
    const alpha = intensityMap[intensity]
    const speedValue = speedMap[speed]

    let time = 0
    const animate = () => {
      time += 0.01 * speedValue

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate glare position
      const x = (Math.sin(time) * 0.5 + 0.5) * canvas.width
      const y = (Math.cos(time * 0.7) * 0.5 + 0.5) * canvas.height

      // Draw glare effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.7)

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`)
      gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`)
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add lens flare lines
      const flareCount = 4
      const flareLength = canvas.width * 0.3

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(time * 0.2)

      for (let i = 0; i < flareCount; i++) {
        const angle = (i * Math.PI) / flareCount

        const lineGradient = ctx.createLinearGradient(
          0,
          0,
          Math.cos(angle) * flareLength,
          Math.sin(angle) * flareLength,
        )

        lineGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`)
        lineGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.strokeStyle = lineGradient
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(angle) * flareLength, Math.sin(angle) * flareLength)
        ctx.stroke()
      }

      ctx.restore()

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [intensity, speed, color])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
