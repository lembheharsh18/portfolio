'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootMessages = [
  'Initializing core systems...',
  'Loading neural networks...',
  'Connecting to servers...',
  'Compiling portfolio...',
  'Rendering interface...',
  'System ready.',
]

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const duration = 2800

    const tick = () => {
      const elapsed = performance.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      // Ease-out cubic for organic deceleration
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased * 100)

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setIsLoading(false), 600)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  const messageCount = Math.floor((progress / 100) * bootMessages.length)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg)' }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--text-muted) 50%, transparent 100%)',
            }}
            initial={{ top: '-1px', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 0.4, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Dot grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* ── Morphing logo ── */}
            <div className="relative mb-12">
              {/* Outer ring */}
              <motion.div
                className="absolute -inset-7 rounded-full"
                style={{ border: '1px solid var(--border)' }}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{ border: '1px solid var(--border-hover)' }}
                initial={{ scale: 0, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Logo circle */}
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center relative"
                style={{ border: '2px solid var(--text-primary)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {/* Breathing glow (opacity-animated so CSS var works) */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow:
                      '0 0 30px rgba(var(--glow-rgb), 0.15), 0 0 60px rgba(var(--glow-rgb), 0.08)',
                  }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.span
                  className="font-heading text-2xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4,
                    type: 'spring',
                  }}
                >
                  HL
                </motion.span>
              </motion.div>
            </div>

            {/* ── Progress bar ── */}
            <motion.div
              className="w-56 md:w-72 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div
                className="h-[2px] rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
              >
                <div
                  className="h-full rounded-full relative"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background:
                      'linear-gradient(90deg, var(--text-muted), var(--text-primary))',
                    transition: 'width 0.06s linear',
                  }}
                >
                  <div className="absolute inset-0 shimmer" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {progress >= 100 ? 'COMPLETE' : 'LOADING'}
                </span>
                <span
                  className="text-[10px] font-mono font-bold tabular-nums"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </motion.div>

            {/* ── Boot messages ── */}
            <motion.div
              className="font-mono text-xs space-y-1.5 w-64 md:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {bootMessages
                .slice(0, Math.min(messageCount + 1, bootMessages.length))
                .map((msg, i) => {
                  const done = i < messageCount || progress >= 100
                  return (
                    <motion.div
                      key={msg}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        style={{
                          color: done
                            ? 'var(--accent-green)'
                            : 'var(--text-muted)',
                        }}
                      >
                        {done ? '✓' : '›'}
                      </span>
                      <span
                        style={{
                          color: done
                            ? 'var(--text-secondary)'
                            : 'var(--text-muted)',
                        }}
                      >
                        {msg}
                      </span>
                    </motion.div>
                  )
                })}

              {progress < 100 && (
                <motion.span
                  className="inline-block ml-5"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{ color: 'var(--text-primary)' }}
                >
                  ▌
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Corner brackets */}
          <div
            className="absolute top-6 left-6 w-10 h-10"
            style={{
              borderLeft: '1px solid var(--border)',
              borderTop: '1px solid var(--border)',
            }}
          />
          <div
            className="absolute top-6 right-6 w-10 h-10"
            style={{
              borderRight: '1px solid var(--border)',
              borderTop: '1px solid var(--border)',
            }}
          />
          <div
            className="absolute bottom-6 left-6 w-10 h-10"
            style={{
              borderLeft: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          />
          <div
            className="absolute bottom-6 right-6 w-10 h-10"
            style={{
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          />

          {/* Bottom branding */}
          <motion.p
            className="absolute bottom-7 text-[10px] font-mono uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
          >
            HARSH LEMBHE • PORTFOLIO
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
