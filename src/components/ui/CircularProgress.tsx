'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface CircularProgressProps {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  rank: string
  label: string
  color?: string
}

export default function CircularProgress({
  value,
  max,
  size = 200,
  strokeWidth = 12,
  rank,
  label,
  color = '#00f0ff',
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (displayValue / max) * 100
  const strokeDashoffset = circumference - (progress / 100) * circumference

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
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 blur-xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-gray-400 text-sm uppercase tracking-wider mb-1">
          {label}
        </span>
        <span
          className="font-heading text-xl font-bold"
          style={{ color }}
        >
          {rank}
        </span>
        <span className="font-heading text-3xl font-bold text-white mt-1">
          {displayValue}
        </span>
      </div>
    </motion.div>
  )
}
