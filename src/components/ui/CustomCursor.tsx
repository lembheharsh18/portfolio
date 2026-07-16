'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface TrailDot {
  id: number
  x: number
  y: number
  opacity: number
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [trail, setTrail] = useState<TrailDot[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailIdRef = useRef(0)

  // Smooth spring-based cursor position
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Outer ring with more lag for elastic effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Add trail dot
      const newDot: TrailDot = {
        id: trailIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.4,
      }
      setTrail((prev) => [...prev.slice(-8), newDot])

      // Check for interactive elements
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(!!isClickable)

      // Get custom hover text if available
      const cursorText =
        target.dataset.cursor ||
        target.closest('[data-cursor]')?.getAttribute('data-cursor') ||
        ''
      setHoverText(cursorText)
    },
    [cursorX, cursorY]
  )

  // Fade out trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((dot) => ({ ...dot, opacity: dot.opacity - 0.08 }))
          .filter((dot) => dot.opacity > 0)
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', () => setIsVisible(false))
    window.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', () => setIsVisible(false))
      window.removeEventListener('mouseenter', () => setIsVisible(true))
    }
  }, [handleMouseMove])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            background: `rgba(180, 180, 180, ${dot.opacity})`,
            boxShadow: `0 0 6px rgba(200, 200, 200, ${dot.opacity * 0.3})`,
            transition: 'opacity 0.1s',
          }}
        />
      ))}

      {/* Outer ring - elastic follow effect */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: isHovering ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
              background: isHovering
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)'
                : 'transparent',
              boxShadow: isHovering ? '0 0 15px rgba(255, 255, 255, 0.15)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />

          {/* Hover text */}
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot - follows cursor exactly */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            opacity: isVisible ? 1 : 0,
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
          style={{
            background: isHovering
              ? 'rgba(255, 255, 255, 0.9)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(180,180,180,0.9))',
            boxShadow: isHovering
              ? '0 0 10px rgba(255, 255, 255, 0.4)'
              : '0 0 8px rgba(255, 255, 255, 0.3)',
          }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
