"use client"

import { useEffect, useRef } from "react"

export default function FloatingOrbs() {
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

    // Generate random orbs
    const orbCount = 10
    const orbs = Array.from({ length: orbCount }).map(() => {
      const size = Math.random() * 300 + 150
      const xPos = Math.random() * canvas.width
      const yPos = Math.random() * canvas.height
      const xSpeed = (Math.random() - 0.5) * 0.3
      const ySpeed = (Math.random() - 0.5) * 0.3

      // More vibrant colors with higher opacity
      const colors = [
        { from: "rgba(34, 211, 238, 0.2)", to: "rgba(0, 0, 35, 0)" },
        { from: "rgba(168, 85, 247, 0.2)", to: "rgba(0, 0, 35, 0)" },
        { from: "rgba(59, 130, 246, 0.2)", to: "rgba(0, 0, 35, 0)" },
        { from: "rgba(255, 255, 255, 0.1)", to: "rgba(0, 0, 35, 0)" },
      ]

      return {
        size,
        x: xPos,
        y: yPos,
        speedX: xSpeed,
        speedY: ySpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid overlay
      ctx.save()
      const gridSize = 30
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      ctx.restore()

      // Update and draw orbs
      orbs.forEach((orb) => {
        // Move orbs
        orb.x += orb.speedX
        orb.y += orb.speedY

        // Boundary check
        if (orb.x < -orb.size / 2) orb.x = canvas.width + orb.size / 2
        if (orb.x > canvas.width + orb.size / 2) orb.x = -orb.size / 2
        if (orb.y < -orb.size / 2) orb.y = canvas.height + orb.size / 2
        if (orb.y > canvas.height + orb.size / 2) orb.y = -orb.size / 2

        // Update pulse
        orb.pulsePhase += orb.pulseSpeed
        if (orb.pulsePhase > Math.PI * 2) orb.pulsePhase = 0

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        const pulseFactor = 0.7 + 0.3 * Math.sin(orb.pulsePhase)

        // Adjust color opacity based on pulse
        const fromColor = orb.color.from.replace(/[\d.]+\)$/, (match) => {
          const opacity = Number.parseFloat(match) * pulseFactor
          return `${opacity})`
        })

        gradient.addColorStop(0, fromColor)
        gradient.addColorStop(1, orb.color.to)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw horizontal lines
      ctx.save()
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height * (i + 1)) / 6
        const gradient = ctx.createLinearGradient(0, y, canvas.width, y)
        gradient.addColorStop(0, "rgba(0, 0, 35, 0)")
        gradient.addColorStop(0.5, "rgba(34, 211, 238, 0.3)")
        gradient.addColorStop(1, "rgba(0, 0, 35, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
