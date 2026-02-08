'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

interface HolographicCardProps {
  title: string
  tag: string
  description: string
  techStack: string[]
  github?: string
  live?: string
  accent?: 'cyan' | 'purple'
}

export default function HolographicCard({
  title,
  tag,
  description,
  techStack,
  github,
  live,
  accent = 'cyan',
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for smooth animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring config for smooth movement
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  // Glow position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const accentColor = accent === 'cyan' ? '#00f0ff' : '#7000ff'
  const accentColorLight = accent === 'cyan' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(112, 0, 255, 0.1)'

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic border glow */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, transparent, ${accentColor}40)`,
            filter: 'blur(1px)',
          }}
        />

        {/* Glass border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: `1px solid rgba(255, 255, 255, ${isHovered ? 0.2 : 0.1})`,
            transition: 'border-color 0.3s',
          }}
        />

        {/* Internal glow that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${accentColorLight} 0%, transparent 50%)`,
          }}
        />

        {/* Card content */}
        <div className="relative glass-strong rounded-2xl p-6 md:p-8 h-full">
          {/* Tag */}
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: accentColorLight,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {tag}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-heading text-2xl md:text-3xl font-bold mb-3"
            style={{
              transform: 'translateZ(40px)',
            }}
          >
            <span className="gradient-text">{title}</span>
          </h3>

          {/* Description */}
          <p
            className="text-gray-400 mb-6 leading-relaxed"
            style={{
              transform: 'translateZ(20px)',
            }}
          >
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs glass rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div
            className="flex gap-4"
            style={{
              transform: 'translateZ(30px)',
            }}
          >
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                whileHover={{ x: 3 }}
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                whileHover={{ x: 3 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)`,
            transform: 'translateX(-100%)',
          }}
          animate={isHovered ? { transform: 'translateX(100%)' } : {}}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  )
}
