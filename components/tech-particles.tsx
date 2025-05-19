"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function TechParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const animationFrameIdRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150)
    const colors = ["#22d3ee", "#a855f7", "#3b82f6", "#ffffff"]

    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setParticles(newParticles)
    particlesRef.current = newParticles

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [dimensions.width, dimensions.height])

  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || !containerRef.current) return

    const animate = () => {
      particlesRef.current = particlesRef.current.map((particle) => {
        let { x, y, speedX, speedY } = particle

        // Move particles
        x += speedX
        y += speedY

        // Boundary check
        if (x < 0 || x > dimensions.width) {
          speedX *= -1
          x += speedX
        }

        if (y < 0 || y > dimensions.height) {
          speedY *= -1
          y += speedY
        }

        // Attract particles to mouse when hovering
        if (isHoveringRef.current) {
          const dx = mousePositionRef.current.x - x
          const dy = mousePositionRef.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const attractionForce = 0.2
            speedX += (dx / distance) * attractionForce
            speedY += (dy / distance) * attractionForce

            // Limit speed
            const maxSpeed = 2
            const currentSpeed = Math.sqrt(speedX * speedX + speedY * speedY)
            if (currentSpeed > maxSpeed) {
              speedX = (speedX / currentSpeed) * maxSpeed
              speedY = (speedY / currentSpeed) * maxSpeed
            }
          }
        }

        return {
          ...particle,
          x,
          y,
          speedX,
          speedY,
        }
      })

      setParticles([...particlesRef.current])
      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animationFrameIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
    }
  }, [dimensions, particles.length])

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top } = containerRef.current.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - left,
        y: e.clientY - top,
      }
    }

    const handleMouseEnter = () => {
      isHoveringRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Connection lines between nearby particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle, i) => {
          return particles
            .slice(i + 1)
            .filter((otherParticle) => {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              return distance < 100
            })
            .map((otherParticle, j) => {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const opacity = 0.2 * (1 - distance / 100)

              return (
                <line
                  key={`${particle.id}-${otherParticle.id}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke={particle.color}
                  strokeWidth="0.5"
                  strokeOpacity={opacity}
                />
              )
            })
        })}
      </svg>
    </div>
  )
}
