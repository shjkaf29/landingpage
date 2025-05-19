"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Calendar,
  CheckSquare,
  Code,
  FileText,
  LayoutDashboard,
  MessageSquare,
  RefreshCw,
  Repeat,
  Users,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import GlowingText from "./glowing-text"

// Agile sprint phases with practical details
const agilePhases = [
  {
    id: "planning",
    title: "Sprint Planning",
    icon: Calendar,
    description: "Collaborative session to define sprint goals and select backlog items",
    artifacts: ["Sprint Backlog", "Sprint Goal", "Capacity Planning"],
    activities: [
      "Review and prioritize product backlog",
      "Define sprint goals and objectives",
      "Estimate story points for selected items",
      "Commit to deliverables for the sprint",
    ],
    color: "#ffffff",
  },
  {
    id: "development",
    title: "Daily Work",
    icon: Code,
    description: "Focused development with daily stand-ups to track progress and remove blockers",
    artifacts: ["Sprint Board", "Burndown Chart", "Code Repository"],
    activities: [
      "Daily stand-up meetings (15 minutes)",
      "Pair programming and code reviews",
      "Continuous integration and testing",
      "Documentation and knowledge sharing",
    ],
    color: "#ffffff",
  },
  {
    id: "review",
    title: "Sprint Review",
    icon: CheckSquare,
    description: "Demonstration of completed work to stakeholders for feedback and validation",
    artifacts: ["Working Software", "Demo Environment", "Feedback Log"],
    activities: [
      "Demonstrate completed features to stakeholders",
      "Gather feedback on functionality and usability",
      "Validate that work meets acceptance criteria",
      "Discuss potential product backlog adjustments",
    ],
    color: "#ffffff",
  },
  {
    id: "retrospective",
    title: "Sprint Retrospective",
    icon: RefreshCw,
    description: "Team reflection to identify improvements for the next sprint",
    artifacts: ["Action Items", "Team Health Metrics", "Process Improvements"],
    activities: [
      "Reflect on what went well in the sprint",
      "Identify challenges and areas for improvement",
      "Create actionable items for process enhancement",
      "Celebrate team achievements and successes",
    ],
    color: "#ffffff",
  },
  {
    id: "refinement",
    title: "Backlog Refinement",
    icon: FileText,
    description: "Ongoing process to keep the product backlog prioritized and ready for future sprints",
    artifacts: ["Updated Product Backlog", "User Stories", "Acceptance Criteria"],
    activities: [
      "Clarify and detail upcoming backlog items",
      "Break down large stories into smaller tasks",
      "Update priorities based on business needs",
      "Ensure stories are ready for the next sprint",
    ],
    color: "#ffffff",
  },
]

// Agile artifacts with visual representations
const agileArtifacts = [
  {
    name: "Sprint Board",
    description: "Visual tracking of work items through the sprint",
    icon: LayoutDashboard,
    visual: (
      <div className="grid grid-cols-3 gap-2 h-full">
        <div className="bg-white/10 p-2 rounded-md">
          <div className="text-xs font-medium mb-2 text-white/80">To Do</div>
          <div className="space-y-2">
            <div className="bg-white/5 p-1 rounded text-xs">User authentication</div>
            <div className="bg-white/5 p-1 rounded text-xs">Payment integration</div>
          </div>
        </div>
        <div className="bg-white/10 p-2 rounded-md">
          <div className="text-xs font-medium mb-2 text-white/80">In Progress</div>
          <div className="space-y-2">
            <div className="bg-white/5 p-1 rounded text-xs">Dashboard UI</div>
          </div>
        </div>
        <div className="bg-white/10 p-2 rounded-md">
          <div className="text-xs font-medium mb-2 text-white/80">Done</div>
          <div className="space-y-2">
            <div className="bg-white/5 p-1 rounded text-xs">Login screen</div>
            <div className="bg-white/5 p-1 rounded text-xs">API setup</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "User Stories",
    description: "Requirements from the user's perspective",
    icon: FileText,
    visual: (
      <div className="space-y-2 p-2 bg-white/5 rounded-md h-full">
        <div className="text-xs font-medium mb-1 text-white/80">User Story</div>
        <div className="text-xs">
          As a <span className="text-white">customer</span>,
        </div>
        <div className="text-xs">
          I want to <span className="text-white">save my payment methods</span>,
        </div>
        <div className="text-xs">
          So that <span className="text-white">I can check out faster next time</span>.
        </div>
        <div className="mt-2 text-xs font-medium text-white/80">Acceptance Criteria:</div>
        <div className="text-xs">• Support for multiple cards</div>
        <div className="text-xs">• Secure storage with encryption</div>
        <div className="text-xs">• Option to set default payment</div>
      </div>
    ),
  },
  {
    name: "Burndown Chart",
    description: "Visual representation of work completed vs remaining",
    icon: Repeat,
    visual: (
      <div className="h-full flex flex-col justify-between p-2">
        <div className="text-xs font-medium mb-1 text-white/80">Sprint Burndown</div>
        <div className="relative h-24 mt-2">
          <div className="absolute top-0 left-0 w-full h-full flex items-end">
            <div className="w-full h-full relative">
              {/* Ideal burndown line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-white/20 transform -rotate-12 origin-top-left"></div>

              {/* Actual burndown line */}
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points="0,0 20,15 40,35 60,40 80,70 100,90"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
              </svg>

              {/* Day markers */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-[8px] text-white/60">
                <span>Day 1</span>
                <span>Day 5</span>
                <span>Day 10</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[8px] text-white/60 mt-2">
          <div className="flex justify-between">
            <span>Story Points: 34</span>
            <span>Completed: 24</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Daily Stand-up",
    description: "Quick daily meeting to sync the team",
    icon: Users,
    visual: (
      <div className="space-y-2 p-2 h-full">
        <div className="text-xs font-medium mb-1 text-white/80">15-Minute Stand-up</div>
        <div className="space-y-2">
          <div className="bg-white/10 p-1 rounded-md">
            <div className="text-[10px] font-medium text-white/80">What did I do yesterday?</div>
            <div className="text-[9px]">Completed user authentication API</div>
          </div>
          <div className="bg-white/10 p-1 rounded-md">
            <div className="text-[10px] font-medium text-white/80">What will I do today?</div>
            <div className="text-[9px]">Start implementing dashboard UI</div>
          </div>
          <div className="bg-white/10 p-1 rounded-md">
            <div className="text-[10px] font-medium text-white/80">Any blockers?</div>
            <div className="text-[9px]">Waiting for design approval</div>
          </div>
        </div>
      </div>
    ),
  },
]

// Benefits of Agile
const benefits = [
  {
    title: "Faster Time to Market",
    description: "Iterative development allows for quicker product releases and feature updates",
    icon: Zap,
  },
  {
    title: "Higher Quality",
    description: "Continuous testing and feedback loops ensure robust, reliable software",
    icon: CheckSquare,
  },
  {
    title: "Client Collaboration",
    description: "Regular client involvement ensures the product meets evolving needs",
    icon: Users,
  },
  {
    title: "Adaptability",
    description: "Flexibility to pivot based on changing requirements or market conditions",
    icon: RefreshCw,
  },
]

export default function AgileProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activePhase, setActivePhase] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(0)
  const [sprintCount, setSprintCount] = useState(1)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Handle phase change
  const handlePhaseChange = (index: number) => {
    setActivePhase(index)
  }

  // Auto-rotate through phases
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)

    autoRotateRef.current = setInterval(() => {
      setActivePhase((prev) => {
        const nextPhase = (prev + 1) % agilePhases.length
        // If we're completing the cycle, increment the sprint count
        if (nextPhase === 0) {
          setSprintCount((count) => count + 1)
        }
        return nextPhase
      })
    }, 5000)
  }

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current)
      autoRotateRef.current = null
    }
  }

  // Start auto-rotate when in view
  useEffect(() => {
    if (isInView && !autoRotateRef.current) {
      startAutoRotate()
    }

    return () => {
      stopAutoRotate()
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <GlowingText glowColor="white">Agile Process</GlowingText>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We embrace Agile methodologies to deliver high-quality software with speed and precision
          </motion.p>
        </div>

        {/* Sprint Cycle Visualization */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-6 overflow-hidden">
            {/* Sprint Counter */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Repeat className="h-5 w-5 text-white/70 mr-2" />
                <h3 className="text-xl font-bold">Sprint Cycle</h3>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Sprint #{sprintCount}</div>
            </div>

            {/* Sprint Timeline */}
            <div className="relative mb-24">
              {" "}
              {/* Increased bottom margin for more space */}
              {/* Timeline bar */}
              <div className="relative h-2 bg-white/10 rounded-full mx-4 mb-12">
                {" "}
                {/* Increased bottom margin */}
                {/* Progress indicator */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/50 to-white/70 rounded-full"
                  style={{
                    width: `${(activePhase / (agilePhases.length - 1)) * 100}%`,
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
              {/* Phase markers - Positioned absolutely relative to the parent div, not the timeline */}
              <div className="absolute top-0 left-0 w-full">
                {agilePhases.map((phase, index) => {
                  // Calculate position percentage
                  const position = `${(index / (agilePhases.length - 1)) * 100}%`

                  return (
                    <button
                      key={phase.id}
                      onClick={() => handlePhaseChange(index)}
                      className="absolute transform -translate-x-1/2 transition-all duration-300"
                      style={{
                        left: position,
                        top: "-14px", // Position relative to parent div
                      }}
                      onMouseEnter={stopAutoRotate}
                      onMouseLeave={startAutoRotate}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === activePhase
                            ? "bg-white text-[#000023] shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                            : index < activePhase
                              ? "bg-white/80 text-[#000023]"
                              : "bg-white/20 text-white/70"
                        }`}
                      >
                        {(() => {
                          const IconComponent = phase.icon
                          return <IconComponent className="h-4 w-4" />
                        })()}
                      </div>

                      {/* Phase title - Positioned below the icon with increased spacing */}
                      <div
                        className={`absolute text-sm font-medium whitespace-nowrap transform -translate-x-1/2 ${
                          index === activePhase ? "text-white font-bold" : "text-white/70"
                        }`}
                        style={{
                          left: "50%",
                          top: "40px", // Increased distance from icon
                          textShadow: index === activePhase ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                        }}
                      >
                        {phase.title}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Phase Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Phase Information */}
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-lg bg-white/10 mr-4">
                        {(() => {
                          const IconComponent = agilePhases[activePhase].icon
                          return <IconComponent className="h-5 w-5 text-white" />
                        })()}
                      </div>
                      <h3 className="text-xl font-bold">{agilePhases[activePhase].title}</h3>
                    </div>

                    <p className="text-white/70 mb-6">{agilePhases[activePhase].description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Key Activities:</h4>
                      <ul className="space-y-2">
                        {agilePhases[activePhase].activities.map((activity, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-white/60 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/70">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Artifacts:</h4>
                      <div className="flex flex-wrap gap-2">
                        {agilePhases[activePhase].artifacts.map((artifact, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/80"
                          >
                            {artifact}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Artifact Visualization */}
                  <div className="w-full md:w-1/2 bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Agile Artifacts:</h4>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {agileArtifacts.map((artifact, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedArtifact(index)}
                            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap flex items-center ${
                              selectedArtifact === index
                                ? "bg-white/20 text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            {(() => {
                              const IconComponent = artifact.icon
                              return <IconComponent className="h-3 w-3 mr-1.5" />
                            })()}
                            {artifact.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-48 bg-white/5 rounded-lg p-2 border border-white/10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedArtifact}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          {agileArtifacts[selectedArtifact].visual}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-2 text-xs text-white/60">{agileArtifacts[selectedArtifact].description}</div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-white/60 text-sm">
                    Phase {activePhase + 1} of {agilePhases.length}
                  </div>
                  <button
                    onClick={() => {
                      const nextPhase = (activePhase + 1) % agilePhases.length
                      handlePhaseChange(nextPhase)
                      if (nextPhase === 0) {
                        setSprintCount((count) => count + 1)
                      }
                    }}
                    className="flex items-center text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    {activePhase === agilePhases.length - 1 ? "Start New Sprint" : "Next Phase"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Client Involvement Indicator - Redesigned without half circle */}
        <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <MessageSquare className="h-4 w-4 text-white/70 mr-2" />
            <h4 className="text-sm font-semibold text-white/90">Client Involvement</h4>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              {agilePhases.map((_, index) => (
                <div
                  key={index}
                  className={`h-full ${index === 0 || index === 2 ? "bg-gradient-to-r from-white/50 to-white/70" : "bg-transparent"}`}
                  style={{
                    width: `${100 / agilePhases.length}%`,
                    display: "inline-block",
                    marginLeft: index === 0 ? "0" : `${(index * 100) / agilePhases.length}%`,
                    position: index === 0 ? "relative" : "absolute",
                  }}
                />
              ))}
            </div>
            <div className="ml-4 text-xs text-white/60">
              High during {agilePhases[0].title} and {agilePhases[2].title}
            </div>
          </div>
        </div>

        {/* Benefits of Agile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Benefits of Our Agile Approach</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4 p-3 inline-block rounded-lg bg-white/10">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Metrics and Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Agile Success Metrics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "30%", label: "Faster Time to Market" },
              { value: "95%", label: "Client Satisfaction" },
              { value: "40%", label: "Reduced Defects" },
              { value: "25%", label: "Cost Efficiency" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {metric.value}
                </motion.div>
                <p className="text-white/70">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
