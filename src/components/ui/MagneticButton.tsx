'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href: string
  className?: string
}

export default function MagneticButton({ children, href, className = '' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      const magneticRange = 150
      const maxOffset = 15

      if (distance < magneticRange) {
        const strength = 1 - distance / magneticRange
        // Resistance effect - moves slower at first, then snaps
        const resistanceCurve = Math.pow(strength, 0.5)
        setPosition({
          x: distanceX * resistanceCurve * (maxOffset / magneticRange),
          y: distanceY * resistanceCurve * (maxOffset / magneticRange),
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={`relative inline-flex items-center justify-center overflow-hidden group ${className}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-electric-purple opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
        animate={{
          scale: position.x !== 0 || position.y !== 0 ? 1.2 : 1,
        }}
      />
      
      {/* Button background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full" />
      
      {/* Inner dark layer */}
      <div className="absolute inset-[2px] bg-void rounded-full group-hover:bg-transparent transition-colors duration-300" />
      
      {/* Content */}
      <span className="relative z-10 px-8 py-4 font-heading font-bold text-white group-hover:text-void transition-colors duration-300">
        {children}
      </span>
    </motion.a>
  )
}
