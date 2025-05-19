"use client"

import { useEffect, useRef } from "react"

export default function DigitalGrid() {
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
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Grid properties
    const gridSize = 30
    const gridOpacity = 0.07

    // Animation properties
    let time = 0
    const waveSpeed = 0.002
    const waveHeight = 0.5

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`
        ctx.lineWidth = 1

        // Create wave effect
        for (let x = 0; x < canvas.width; x += 2) {
          const distFromCenter = Math.abs(x - canvas.width / 2) / (canvas.width / 2)
          const wave = Math.sin(x * 0.01 + time) * waveHeight * (1 - distFromCenter)

          if (x === 0) {
            ctx.moveTo(x, y + wave)
          } else {
            ctx.lineTo(x, y + wave)
          }
        }

        ctx.stroke()
      }

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`
        ctx.lineWidth = 1

        // Create wave effect
        for (let y = 0; y < canvas.height; y += 2) {
          const distFromCenter = Math.abs(y - canvas.height / 2) / (canvas.height / 2)
          const wave = Math.sin(y * 0.01 + time) * waveHeight * (1 - distFromCenter)

          if (y === 0) {
            ctx.moveTo(x + wave, y)
          } else {
            ctx.lineTo(x + wave, y)
          }
        }

        ctx.stroke()
      }

      // Occasionally add glowing nodes at intersections
      if (Math.random() < 0.05) {
        const nodeX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize
        const nodeY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize

        const glow = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, gridSize / 2)
        glow.addColorStop(0, "rgba(34, 211, 238, 0.8)")
        glow.addColorStop(1, "rgba(34, 211, 238, 0)")

        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(nodeX, nodeY, gridSize / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update time for animation
      time += waveSpeed

      requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50" />
}
