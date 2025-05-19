"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
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
    let gradientAngle = 0
    let hueRotation = 0

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.max(canvas.width, canvas.height)

      // Rotate gradient angle
      gradientAngle += 0.001
      hueRotation += 0.1

      const x1 = centerX + Math.cos(gradientAngle) * radius
      const y1 = centerY + Math.sin(gradientAngle) * radius
      const x2 = centerX + Math.cos(gradientAngle + Math.PI) * radius
      const y2 = centerY + Math.sin(gradientAngle + Math.PI) * radius

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)

      // Dark navy blue (#000023) to deeper indigo
      gradient.addColorStop(0, `#000023`)
      gradient.addColorStop(0.3, `#010128`)
      gradient.addColorStop(0.7, `#000035`)
      gradient.addColorStop(1, `#000023`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Add very subtle noise (0.5% opacity)
        if (Math.random() < 0.005) {
          data[i] = Math.min(data[i] + 5, 255) // R
          data[i + 1] = Math.min(data[i + 1] + 5, 255) // G
          data[i + 2] = Math.min(data[i + 2] + 5, 255) // B
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Add subtle glow spots
      const numGlowSpots = 5
      for (let i = 0; i < numGlowSpots; i++) {
        const x = Math.sin(gradientAngle * (i + 1) * 2) * canvas.width * 0.4 + canvas.width * 0.5
        const y = Math.cos(gradientAngle * (i + 1) * 2) * canvas.height * 0.4 + canvas.height * 0.5

        const glow = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.3)
        glow.addColorStop(0, "rgba(34, 211, 238, 0.03)")
        glow.addColorStop(0.5, "rgba(34, 211, 238, 0.01)")
        glow.addColorStop(1, "rgba(0, 0, 35, 0)")

        ctx.fillStyle = glow
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ opacity: 0.9 }} />
}
