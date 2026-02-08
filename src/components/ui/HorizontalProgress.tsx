'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HorizontalProgressProps {
  value: number
  max: number
  label: string
  sublabel?: string
  color?: string
}

export default function HorizontalProgress({
  value,
  max,
  label,
  sublabel,
  color = '#00f0ff',
}: HorizontalProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const percentage = (displayValue / max) * 100

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-semibold text-white">
            {label}
          </span>
          {sublabel && (
            <span className="text-gray-500 text-sm">
              {sublabel}
            </span>
          )}
        </div>
        <span
          className="font-heading text-xl font-bold"
          style={{ color }}
        >
          {displayValue}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-3 w-full rounded-full overflow-hidden bg-white/5">
        {/* Animated Progress */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ left: '-20%' }}
          animate={isInView ? { left: '120%' } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}
