'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  glitchInterval?: number
}

export default function GlitchText({ text, className = '', glitchInterval = 5000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, glitchInterval)

    return () => clearInterval(interval)
  }, [glitchInterval])

  const handleMouseEnter = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 300)
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      {/* Main text */}
      <span 
        className="relative z-10"
        style={isGlitching ? { animation: 'glitch-skew 0.2s ease-in-out' } : undefined}
      >
        {text}
      </span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-neon-cyan opacity-80 z-0"
            initial={{ x: 0 }}
            animate={{
              x: [-2, 2, -1, 3, 0],
              y: [0, -1, 2, -1, 0],
            }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-electric-purple opacity-80 z-0"
            initial={{ x: 0 }}
            animate={{
              x: [2, -2, 1, -3, 0],
              y: [0, 1, -2, 1, 0],
            }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}
