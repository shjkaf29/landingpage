"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlowingTextProps {
  children: ReactNode
  className?: string
  glowColor?: string
  animationDuration?: number
}

export default function GlowingText({
  children,
  className = "",
  glowColor = "white",
  animationDuration = 3,
}: GlowingTextProps) {
  const colorMap = {
    white: "from-white via-white/80 to-white/90",
    cyan: "from-cyan-400 via-blue-400 to-purple-400",
    purple: "from-purple-400 via-blue-400 to-cyan-400",
    blue: "from-blue-400 via-cyan-400 to-white",
  }

  const glowMap = {
    white: "rgba(255, 255, 255, 0.8)",
    cyan: "rgba(34, 211, 238, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
    blue: "rgba(96, 165, 250, 0.8)",
  }

  const gradientClass = colorMap[glowColor as keyof typeof colorMap] || colorMap.white
  const glowValue = glowMap[glowColor as keyof typeof glowMap] || glowMap.white

  return (
    <motion.span
      className={`relative inline-block bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent ${className}`}
      animate={{
        textShadow: [
          `0 0 4px ${glowValue}, 0 0 10px ${glowValue.replace("0.8", "0.4")}`,
          `0 0 8px ${glowValue}, 0 0 20px ${glowValue.replace("0.8", "0.6")}`,
          `0 0 4px ${glowValue}, 0 0 10px ${glowValue.replace("0.8", "0.4")}`,
        ],
      }}
      transition={{
        duration: animationDuration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.span>
  )
}
