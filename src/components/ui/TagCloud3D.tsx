'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface Tag {
  text: string
  x: number
  y: number
  z: number
  isSpecial: boolean
}

const TAGS = [
  { text: 'C++', isSpecial: false },
  { text: 'Java', isSpecial: false },
  { text: 'Spring Boot', isSpecial: true },
  { text: 'RAG', isSpecial: false },
  { text: 'Next.js', isSpecial: false },
  { text: 'React', isSpecial: false },
  { text: 'Docker', isSpecial: false },
  { text: 'AWS', isSpecial: false },
  { text: 'PostgreSQL', isSpecial: false },
  { text: 'Python', isSpecial: false },
  { text: 'GenAI', isSpecial: true },
]

export default function TagCloud3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragSpeed, setDragSpeed] = useState({ x: 0, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Initialize tag positions on a sphere
  useEffect(() => {
    const radius = 150
    const initialTags: Tag[] = TAGS.map((tag, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / TAGS.length)
      const theta = Math.sqrt(TAGS.length * Math.PI) * phi

      return {
        text: tag.text,
        isSpecial: tag.isSpecial,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      }
    })
    setTags(initialTags)
  }, [])

  // Rotate point around axes
  const rotatePoint = useCallback((x: number, y: number, z: number, angleX: number, angleY: number) => {
    // Rotate around Y axis
    const cosY = Math.cos(angleY)
    const sinY = Math.sin(angleY)
    const x1 = x * cosY - z * sinY
    const z1 = x * sinY + z * cosY

    // Rotate around X axis
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)
    const y1 = y * cosX - z1 * sinX
    const z2 = y * sinX + z1 * cosX

    return { x: x1, y: y1, z: z2 }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isInView) return

    const animate = () => {
      setRotation((prev) => {
        let newX = prev.x
        let newY = prev.y

        if (isDragging) {
          newX += dragSpeed.x * 0.002
          newY += dragSpeed.y * 0.002
        } else {
          // Auto rotation
          newY += 0.003
          newX += 0.001

          // Dampen drag speed
          setDragSpeed((prev) => ({
            x: prev.x * 0.95,
            y: prev.y * 0.95,
          }))
        }

        return { x: newX, y: newY }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, isDragging, dragSpeed])

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouseRef.current.x
    const deltaY = e.clientY - lastMouseRef.current.y

    setDragSpeed({ x: deltaX, y: deltaY })
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Calculate tag positions
  const getTagStyle = (tag: Tag) => {
    const rotated = rotatePoint(tag.x, tag.y, tag.z, rotation.x, rotation.y)
    const scale = (rotated.z + 200) / 400
    const opacity = Math.max(0.3, Math.min(1, scale))

    return {
      transform: `translate(-50%, -50%) translate3d(${rotated.x}px, ${rotated.y}px, 0) scale(${scale})`,
      opacity,
      zIndex: Math.round(rotated.z + 200),
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-80 h-80 md:w-96 md:h-96 cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl" />

      {/* Tags */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {tags.map((tag) => {
          const style = getTagStyle(tag)
          const isGold = tag.isSpecial

          return (
            <div
              key={tag.text}
              className={`absolute whitespace-nowrap font-heading font-bold text-lg md:text-xl transition-all duration-100 select-none ${
                isGold
                  ? 'text-amber-400'
                  : 'text-white/80 hover:text-neon-cyan'
              }`}
              style={{
                ...style,
                textShadow: isGold
                  ? '0 0 10px rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.5), 0 0 30px rgba(251, 191, 36, 0.3)'
                  : undefined,
              }}
            >
              {tag.text}
              {isGold && (
                <span className="ml-1 text-xs text-amber-400/70">★</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-500 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Drag to rotate
      </motion.div>
    </motion.div>
  )
}
