'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink, Trophy, TrendingUp } from 'lucide-react'

const recentActivity = [
  { problem: 'Dynamic Programming', difficulty: 'Hard', date: '2 days ago' },
  { problem: 'Graph Theory', difficulty: 'Medium', date: '3 days ago' },
  { problem: 'Binary Search', difficulty: 'Easy', date: '5 days ago' },
]

const difficultyColors: Record<string, string> = {
  Easy: 'text-teal-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
}

export default function AlgoRankCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayRating, setDisplayRating] = useState(0)
  const targetRating = 1634

  useEffect(() => {
    if (!isInView) return
    
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayRating(Math.floor(eased * targetRating))

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
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow border */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(112, 0, 255, 0.3))',
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">HarshLembhe</span>
            <ExternalLink className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">#Global Rank</span>
          </div>
        </div>

        {/* Main Rating */}
        <div className="text-center mb-6">
          <div className="text-sm text-gray-500 mb-1">Max Rating</div>
          <div 
            className="font-heading text-6xl md:text-7xl font-bold text-white"
            style={{
              textShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            }}
          >
            {displayRating}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">Expert</span>
          </div>
        </div>

        {/* Difficulty Progress Bar */}
        <div className="flex h-2 rounded-full overflow-hidden mb-6">
          <div className="w-[40%] bg-teal-500" style={{ boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)' }} />
          <div className="w-[35%] bg-yellow-500" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }} />
          <div className="w-[25%] bg-red-500" style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }} />
        </div>

        {/* Recent Activity */}
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Recent Activity</div>
          <div className="space-y-2">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{item.problem}</span>
                  <span className={`text-xs ${difficultyColors[item.difficulty]}`}>
                    {item.difficulty}
                  </span>
                </div>
                <span className="text-gray-600 text-xs">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
