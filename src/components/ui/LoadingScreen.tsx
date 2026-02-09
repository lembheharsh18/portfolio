'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glitch overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-neon-cyan/5"
              animate={{
                opacity: [0, 0.1, 0, 0.05, 0],
                x: [0, -5, 5, -2, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold gradient-text">
              HL
            </h1>
            {/* Glitch effect layers */}
            <motion.h1
              className="absolute inset-0 font-heading text-4xl md:text-6xl font-bold text-neon-cyan opacity-50"
              animate={{ x: [0, -3, 3, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              HL
            </motion.h1>
            <motion.h1
              className="absolute inset-0 font-heading text-4xl md:text-6xl font-bold text-electric-purple opacity-50"
              animate={{ x: [0, 3, -3, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.1 }}
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              HL
            </motion.h1>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="font-mono text-sm text-gray-400 mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-neon-cyan">&gt;</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              INITIALIZING SYSTEM
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 md:w-80">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #00f0ff, #7000ff)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono">
              <span className="text-gray-500">LOADING</span>
              <span className="text-neon-cyan">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </div>

          {/* Boot sequence messages */}
          <motion.div
            className="absolute bottom-8 left-8 font-mono text-xs text-gray-600 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress > 20 && <div className="text-green-500">✓ Core systems online</div>}
            {progress > 50 && <div className="text-green-500">✓ Neural networks loaded</div>}
            {progress > 80 && <div className="text-green-500">✓ Interface ready</div>}
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-cyan/30" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-electric-purple/30" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-electric-purple/30" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-cyan/30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
