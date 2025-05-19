"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Cloud, Database, Layers, Menu, X } from "lucide-react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ServiceCard from "@/components/service-card"
import CursorLight from "@/components/cursor-light"
import GlowingText from "@/components/glowing-text"
import EnhancedAnimatedBackground from "@/components/enhanced-animated-background"
import AgileProcess from "@/components/agile-process"
import GradientBorder from "@/components/gradient-border"
import GlareEffect from "@/components/glare-effect"

// Dynamically import 3D components to avoid SSR issues
const Hero3DScene = dynamic(() => import("@/components/hero-3d-scene"), { ssr: false })
const TechCube = dynamic(() => import("@/components/tech-cube"), { ssr: false })
const TechStack3D = dynamic(() => import("@/components/tech-stack-3d"), { ssr: false })
const Services3D = dynamic(() => import("@/components/services-3d"), { ssr: false })
const TechStack = dynamic(() => import("@/components/tech-stack"), { ssr: false })

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax effect for about section
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Handle navigation menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-[#000018]">
      {/* Hover light effect (not cursor replacement) */}
      <CursorLight />

      {/* Enhanced animated background with dark blue and gradients */}
      <EnhancedAnimatedBackground />

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-[#000023]/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <GlowingText glowColor="white" animationDuration={2}>
                TechSolutions
              </GlowingText>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Services", "About", "Process", "Technologies", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-sm font-medium tracking-wide text-white/80 transition-all duration-300 hover:text-white"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-white/60 via-cyan-400/60 to-white/20 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <GradientBorder borderWidth={1} glowIntensity="medium" className="overflow-hidden">
                <Button className="relative overflow-hidden bg-transparent backdrop-blur-lg group">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </GradientBorder>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#000023]/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {["Services", "About", "Process", "Technologies", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white/80 py-2 hover:text-white"
                    onClick={closeMenu}
                  >
                    {item}
                  </Link>
                ))}
                <Button className="bg-white/10 hover:bg-white/20 text-white w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        {/* 3D Hero Scene */}
        <Hero3DScene />

        {/* Glare effect */}
        <GlareEffect intensity="medium" speed="slow" color="blue" />

        <div className="container mx-auto px-4 py-20 md:py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white"
              initial={{ letterSpacing: "normal" }}
              whileInView={{ letterSpacing: "0.01em" }}
              transition={{ duration: 1.5 }}
            >
              Building Tomorrow&apos;s Software,{" "}
              <GlowingText glowColor="blue" animationDuration={2}>
                Today
              </GlowingText>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We craft scalable, secure, and stunning digital solutions for startups, enterprises, and dreamers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <GradientBorder borderWidth={2} glowIntensity="high" className="overflow-hidden">
                <Button className="group relative overflow-hidden bg-transparent backdrop-blur-lg px-8 py-6 text-lg">
                  <span className="relative z-10 flex items-center">
                    Let&apos;s Build Together
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </GradientBorder>
              <GradientBorder borderWidth={1} glowIntensity="medium" className="overflow-hidden">
                <Button
                  variant="outline"
                  className="bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-6 text-lg"
                >
                  Our Work
                </Button>
              </GradientBorder>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero background elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000018]/80 to-transparent z-10"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 md:py-32">
        <GlareEffect intensity="low" speed="medium" color="purple" className="opacity-50" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our <GlowingText glowColor="white">Services</GlowingText>
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive digital solutions tailored to your unique needs
            </motion.p>
          </div>

          {/* 3D Services Visualization */}
          <div className="mb-12">
            <Services3D />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Web & Mobile Development"
              description="Responsive, fast, and beautiful applications built with cutting-edge technologies."
              icon={<Code className="h-10 w-10 text-white" />}
              delay={0.1}
            />
            <ServiceCard
              title="AI/ML Integration"
              description="Harness the power of artificial intelligence to transform your business processes."
              icon={<Layers className="h-10 w-10 text-white" />}
              delay={0.2}
            />
            <ServiceCard
              title="Cloud & DevOps"
              description="Scalable infrastructure and automated workflows for seamless operations."
              icon={<Cloud className="h-10 w-10 text-white" />}
              delay={0.3}
            />
            <ServiceCard
              title="API & System Architecture"
              description="Robust, secure, and efficient systems designed for performance and scalability."
              icon={<Database className="h-10 w-10 text-white" />}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              style={{ y }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GradientBorder borderWidth={2} glowIntensity="medium" className="overflow-hidden">
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Team working on code"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000023]/80 to-transparent"></div>

                  {/* Scan line effect */}
                  <motion.div
                    className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                </div>
              </GradientBorder>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <GlowingText glowColor="blue">Us</GlowingText>
              </h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We are a team of passionate developers, designers, and strategists dedicated to creating exceptional
                  digital experiences that drive business growth.
                </p>
                <p>
                  With over a decade of experience in the industry, we've helped startups and enterprises alike
                  transform their ideas into reality through innovative technology solutions.
                </p>
                <p>
                  Our approach combines technical expertise with creative thinking to deliver products that not only
                  meet but exceed expectations.
                </p>
              </div>

              {/* 3D Tech Cube */}
              <div className="mt-8 mb-8">
                <TechCube />
              </div>

              <div className="mt-8">
                <GradientBorder borderWidth={1} glowIntensity="medium" className="inline-block overflow-hidden">
                  <Button className="relative overflow-hidden bg-transparent backdrop-blur-lg group">
                    <span className="relative z-10">Learn More About Our Team</span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </GradientBorder>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agile Process Section */}
      <section id="process" className="relative">
        <GlareEffect intensity="low" speed="slow" color="white" className="opacity-30" />
        <AgileProcess />
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our <GlowingText glowColor="blue">Tech Stack</GlowingText>
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We leverage cutting-edge technologies to build powerful, scalable solutions
            </motion.p>
          </div>

          {/* 3D Tech Stack */}
          <div className="mb-12">
            <TechStack3D />
          </div>

          <TechStack />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-32">
        <GlareEffect intensity="low" speed="medium" color="blue" className="opacity-40" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Client <GlowingText glowColor="white">Success Stories</GlowingText>
            </motion.h2>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hear what our clients have to say about working with us
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechStart Inc.",
                quote:
                  "Working with this team has been transformative for our business. They delivered a solution that exceeded our expectations and helped us scale rapidly.",
              },
              {
                name: "Michael Chen",
                role: "Founder, DataFlow",
                quote:
                  "Their expertise in AI integration saved us months of development time. The system they built is robust, scalable, and exactly what we needed.",
              },
              {
                name: "Jessica Williams",
                role: "Product Manager, EnterpriseX",
                quote:
                  "From concept to deployment, the team demonstrated exceptional skill and professionalism. They're truly partners in our success.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GradientBorder borderWidth={1} glowIntensity="medium" className="h-full group" animated={true}>
                  <div className="p-6 h-full">
                    <div className="flex flex-col h-full relative z-10">
                      <div className="mb-4">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-white/80 mb-6 flex-grow">{testimonial.quote}</p>
                      <div>
                        <p className="font-medium text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/60">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Animated corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-white/20 to-transparent transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </GradientBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="relative py-20 md:py-32">
        <GlareEffect intensity="medium" speed="slow" color="purple" className="opacity-30" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to <GlowingText glowColor="blue">Get Started</GlowingText>?
              </motion.h2>
              <motion.p
                className="text-lg text-white/70 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get your custom solution started today
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GradientBorder borderWidth={2} glowIntensity="high" className="overflow-hidden">
                <div className="p-8 relative">
                  {/* Floating blobs */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>

                  <form className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/80">
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 transition-all focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 transition-all focus:ring-1 focus:ring-white/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-white/80">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 transition-all focus:ring-1 focus:ring-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-white/80">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 transition-all min-h-[120px] focus:ring-1 focus:ring-white/20"
                      />
                    </div>
                    <GradientBorder borderWidth={1} glowIntensity="medium" className="inline-block overflow-hidden">
                      <Button className="relative overflow-hidden bg-transparent backdrop-blur-lg group w-full sm:w-auto px-8 py-6 text-lg">
                        <span className="relative z-10 flex items-center">
                          Send Message
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </GradientBorder>
                  </form>
                </div>
              </GradientBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
                <GlowingText glowColor="blue">TechSolutions</GlowingText>
              </Link>
              <p className="text-white/60 max-w-md">
                Building innovative digital solutions that transform businesses and create exceptional user experiences.
              </p>
              <div className="flex space-x-4 mt-6">
                {["twitter", "github", "linkedin", "instagram"].map((social) => (
                  <Link
                    key={social}
                    href={`https://${social}.com`}
                    className="group text-white/60 hover:text-white transition-colors"
                    aria-label={`${social} profile`}
                  >
                    <GradientBorder
                      borderWidth={1}
                      glowIntensity="low"
                      className="rounded-full overflow-hidden"
                      borderRadius="rounded-full"
                    >
                      <div className="h-10 w-10 flex items-center justify-center relative">
                        <span className="sr-only">{social}</span>
                        <svg className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                        </svg>
                      </div>
                    </GradientBorder>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {["Web Development", "Mobile Apps", "AI Integration", "Cloud Solutions", "API Development"].map(
                  (service) => (
                    <li key={service}>
                      <Link href="#" className="group text-white/60 hover:text-white transition-colors relative">
                        {service}
                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400/60 to-white/20 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Contact", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="group text-white/60 hover:text-white transition-colors relative">
                      {item}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-purple-400/60 to-white/20 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} TechSolutions. All rights reserved.</p>
          </div>
        </div>

        {/* Animated light streaks */}
        <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden opacity-20 pointer-events-none">
          <div className="binary-rain"></div>
        </div>
      </footer>
    </div>
  )
}
