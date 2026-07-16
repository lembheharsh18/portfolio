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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{ background: 'var(--border)' }}
              animate={{
                opacity: [0, 0.05, 0, 0.03, 0],
                x: [0, -5, 5, -2, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>

          {/* Logo / Name with heartbeat */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="font-heading text-4xl md:text-6xl font-bold"
              style={{ color: 'var(--text-primary)' }}
              animate={{
                scale: [1, 1.15, 1, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              HL
            </motion.h1>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="font-mono text-sm flex items-center gap-2 mb-6"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ color: 'var(--text-primary)' }}>&gt;</span>
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
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, var(--text-primary), var(--text-muted))',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.15)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono">
              <span style={{ color: 'var(--text-muted)' }}>LOADING</span>
              <span style={{ color: 'var(--text-primary)' }}>{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </div>

          {/* Boot sequence messages */}
          <motion.div
            className="absolute bottom-8 left-8 font-mono text-xs space-y-1"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress > 20 && <div style={{ color: 'var(--accent-green)' }}>✓ Core systems online</div>}
            {progress > 50 && <div style={{ color: 'var(--accent-green)' }}>✓ Neural networks loaded</div>}
            {progress > 80 && <div style={{ color: 'var(--accent-green)' }}>✓ Interface ready</div>}
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-16 h-16" style={{ borderLeft: '2px solid var(--border-hover)', borderTop: '2px solid var(--border-hover)' }} />
          <div className="absolute top-4 right-4 w-16 h-16" style={{ borderRight: '2px solid var(--border-hover)', borderTop: '2px solid var(--border-hover)' }} />
          <div className="absolute bottom-4 left-4 w-16 h-16" style={{ borderLeft: '2px solid var(--border-hover)', borderBottom: '2px solid var(--border-hover)' }} />
          <div className="absolute bottom-4 right-4 w-16 h-16" style={{ borderRight: '2px solid var(--border-hover)', borderBottom: '2px solid var(--border-hover)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
