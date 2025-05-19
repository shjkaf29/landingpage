"use client"

import { type ReactNode, useEffect, useRef } from "react"

interface GradientBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  glowIntensity?: "low" | "medium" | "high"
  animated?: boolean
  borderRadius?: string
}

export default function GradientBorder({
  children,
  className = "",
  borderWidth = 1,
  glowIntensity = "medium",
  animated = true,
  borderRadius = "rounded-xl",
}: GradientBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Map glow intensity to actual values
  const glowMap = {
    low: 5,
    medium: 10,
    high: 15,
  }

  const glowSize = glowMap[glowIntensity]

  useEffect(() => {
    if (!animated) return

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

    let time = 0
    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient border
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Animate gradient colors
      const hueShift = (Math.sin(time) + 1) * 180

      gradient.addColorStop(0, `hsla(${hueShift}, 100%, 80%, 0.8)`)
      gradient.addColorStop(0.5, `hsla(${hueShift + 60}, 100%, 70%, 0.8)`)
      gradient.addColorStop(1, `hsla(${hueShift + 120}, 100%, 80%, 0.8)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = borderWidth

      // Draw rounded rectangle
      const radius = Number.parseInt(borderRadius.replace(/[^\d]/g, "") || "16")
      const x = borderWidth / 2
      const y = borderWidth / 2
      const width = canvas.width - borderWidth
      const height = canvas.height - borderWidth

      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()

      ctx.stroke()

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [animated, borderWidth, borderRadius])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        borderRadius: borderRadius.includes("rounded") ? undefined : borderRadius,
      }}
    >
      {/* Static gradient border for non-animated version */}
      {!animated && (
        <div
          className={`absolute inset-0 -z-10 ${borderRadius} bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-cyan-400/30`}
          style={{
            padding: `${borderWidth}px`,
            boxShadow: `0 0 ${glowSize}px rgba(100, 200, 255, 0.5)`,
          }}
        />
      )}

      {/* Animated gradient border */}
      {animated && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 -z-10 ${borderRadius}`}
          style={{
            filter: `blur(${glowSize / 3}px)`,
          }}
        />
      )}

      {/* Content */}
      <div className={`relative z-0 ${borderRadius} bg-white/5 backdrop-blur-sm overflow-hidden`}>{children}</div>
    </div>
  )
}
