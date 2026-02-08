'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FlipDigitProps {
  digit: string
  prevDigit: string
}

function FlipDigit({ digit, prevDigit }: FlipDigitProps) {
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (digit !== prevDigit) {
      setIsFlipping(true)
      const timer = setTimeout(() => setIsFlipping(false), 300)
      return () => clearTimeout(timer)
    }
  }, [digit, prevDigit])

  return (
    <div className="relative w-10 h-14 md:w-12 md:h-16 perspective-500">
      {/* Background card */}
      <div 
        className="absolute inset-0 rounded-lg bg-black/80 border border-white/10"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      />
      
      {/* Static bottom half */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
        <span 
          className="font-heading text-3xl md:text-4xl font-bold text-neon-cyan"
          style={{
            textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)',
          }}
        >
          {digit}
        </span>
      </div>

      {/* Flip animation overlay */}
      {isFlipping && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-black/90 flex items-center justify-center overflow-hidden origin-bottom"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          transition={{ duration: 0.15, ease: 'easeIn' }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span 
            className="font-heading text-3xl md:text-4xl font-bold text-neon-cyan"
            style={{
              textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.5)',
            }}
          >
            {prevDigit}
          </span>
        </motion.div>
      )}

      {/* Center line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-black/50" />

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>
  )
}

function FlipClockUnit({ value, label }: { value: string; label: string }) {
  const [prevValue, setPrevValue] = useState(value)
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue)
      setCurrentValue(value)
    }
  }, [value, currentValue])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        <FlipDigit digit={value[0]} prevDigit={prevValue[0]} />
        <FlipDigit digit={value[1]} prevDigit={prevValue[1]} />
      </div>
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}

export default function FlipClock() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState({ hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Return static placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 md:gap-3 opacity-0">
        <FlipClockUnit value="00" label="HRS" />
        <FlipClockUnit value="00" label="MIN" />
        <FlipClockUnit value="00" label="SEC" />
      </div>
    )
  }

  return (
    <motion.div
      className="flex items-center gap-2 md:gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <FlipClockUnit value={time.hours} label="HRS" />
      
      {/* Separator */}
      <div className="flex flex-col gap-2 pb-4">
        <motion.div 
          className="w-2 h-2 rounded-full bg-neon-cyan"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)' }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-neon-cyan"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)' }}
        />
      </div>

      <FlipClockUnit value={time.minutes} label="MIN" />

      {/* Separator */}
      <div className="flex flex-col gap-2 pb-4">
        <motion.div 
          className="w-2 h-2 rounded-full bg-electric-purple"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ boxShadow: '0 0 8px rgba(112, 0, 255, 0.8)' }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-electric-purple"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          style={{ boxShadow: '0 0 8px rgba(112, 0, 255, 0.8)' }}
        />
      </div>

      <FlipClockUnit value={time.seconds} label="SEC" />
    </motion.div>
  )
}
