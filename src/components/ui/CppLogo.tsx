'use client'

import { motion } from 'framer-motion'

export default function CppLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -10, 0],
        rotateY: [0, 15, 0, -15, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 blur-xl bg-neon-cyan/30 rounded-2xl" />

      {/* Main Logo Container */}
      <div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl glass flex items-center justify-center"
        style={{
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1)',
        }}
      >
        {/* C++ Text */}
        <div className="relative">
          <span
            className="font-heading text-4xl md:text-5xl font-black"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #659AD2 50%, #00599C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))',
            }}
          >
            C++
          </span>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-cyan"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-electric-purple"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* "MAIN WEAPON" Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-widest text-neon-cyan/70">
          Main Weapon
        </span>
      </motion.div>
    </motion.div>
  )
}
