'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const cursorRef = useRef<HTMLDivElement>(null)

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
              border: isHovering ? '1px solid rgba(0, 240, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.3)',
              background: isHovering
                ? 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)'
                : 'transparent',
              boxShadow: isHovering ? '0 0 20px rgba(0, 240, 255, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />

          {/* Hover text */}
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-medium text-neon-cyan uppercase tracking-wider"
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
              ? '#00f0ff'
              : 'linear-gradient(135deg, #00f0ff, #7000ff)',
            boxShadow: isHovering
              ? '0 0 15px rgba(0, 240, 255, 0.8)'
              : '0 0 10px rgba(0, 240, 255, 0.5)',
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
