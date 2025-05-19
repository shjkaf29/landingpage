"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import GradientBorder from "./gradient-border"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  delay: number
}

export default function ServiceCard({ title, description, icon, delay }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <GradientBorder borderWidth={1} glowIntensity="medium" className="h-full">
        <div className="p-6 h-full">
          <div className="relative z-10">
            <div className="mb-4 p-3 inline-block rounded-lg bg-white/10 border border-white/10 group-hover:border-white/30 transition-colors duration-300">
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <p className="text-white/70 group-hover:text-white/80 transition-colors duration-300">{description}</p>
          </div>
        </div>
      </GradientBorder>
    </motion.div>
  )
}
