"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technologies = [
    { name: "React", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Next.js", logo: "/placeholder.svg?height=80&width=80" },
    { name: "TypeScript", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Node.js", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Python", logo: "/placeholder.svg?height=80&width=80" },
    { name: "AWS", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Docker", logo: "/placeholder.svg?height=80&width=80" },
    { name: "GraphQL", logo: "/placeholder.svg?height=80&width=80" },
    { name: "MongoDB", logo: "/placeholder.svg?height=80&width=80" },
    { name: "PostgreSQL", logo: "/placeholder.svg?height=80&width=80" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
      >
        {technologies.map((tech, index) => (
          <motion.div key={tech.name} variants={item} className="group">
            <div className="relative flex flex-col items-center">
              <div className="relative h-20 w-20 mb-4 bg-white/5 rounded-xl p-4 backdrop-blur-xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
                <Image
                  src={tech.logo || "/placeholder.svg"}
                  alt={tech.name}
                  fill
                  className="object-contain p-2 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Tech scan effect */}
                <motion.div
                  className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    repeatDelay: Math.random() * 2 + 1,
                  }}
                />
              </div>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 rounded-xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
