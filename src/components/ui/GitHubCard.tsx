'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Github, GitCommit } from 'lucide-react'

const intensityColors = [
  'bg-gray-800',
  'bg-green-900',
  'bg-green-700',
  'bg-green-500',
  'bg-green-400',
]

export default function GitHubCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayCommits, setDisplayCommits] = useState(0)
  const [mounted, setMounted] = useState(false)
  const targetCommits = 405

  // Generate heatmap data only once on mount to avoid hydration issues
  const heatmapData = useMemo(() => {
    if (typeof window === 'undefined') {
      // Return empty during SSR
      return Array(15).fill(null).map(() => Array(7).fill(0))
    }
    
    const weeks = 15
    const days = 7
    const data: number[][] = []
    
    for (let w = 0; w < weeks; w++) {
      const week: number[] = []
      for (let d = 0; d < days; d++) {
        week.push(Math.floor(Math.random() * 5))
      }
      data.push(week)
    }
    
    return data
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayCommits(Math.floor(eased * targetCommits))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Glow border */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.3), rgba(0, 240, 255, 0.3))',
          padding: '1px',
        }}
      />

      {/* Card content */}
      <div className="relative bg-[#0a0a0a] rounded-2xl p-6">
        {/* Scanline overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Github className="w-6 h-6 text-white" />
          <span className="font-semibold text-white">HarshLembhe</span>
        </div>

        {/* Heatmap + Stats */}
        <div className="flex gap-6">
          {/* Contribution Heatmap */}
          <div className="flex-1">
            <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${heatmapData.length}, 1fr)` }}>
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((intensity, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${intensityColors[intensity]}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={mounted && isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005 }}
                      style={intensity > 2 ? { boxShadow: '0 0 5px rgba(74, 222, 128, 0.5)' } : undefined}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col items-end justify-center">
            <div 
              className="font-heading text-5xl font-bold text-white"
              style={{
                textShadow: '0 0 20px rgba(74, 222, 128, 0.4)',
              }}
            >
              {displayCommits}
            </div>
            <div className="text-sm text-gray-500">Yearly Total</div>
            <div className="text-xs text-gray-600">Commits</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">Latest Push</span>
          <span className="text-xs text-white ml-auto">docu-chat-rag</span>
        </div>
      </div>
    </motion.div>
  )
}
