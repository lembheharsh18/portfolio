'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OrbitalMenu from '@/components/ui/OrbitalMenu'
import FlipClock from '@/components/ui/FlipClock'

export default function CommandCenter() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Glass background */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'rgba(5, 5, 5, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* HUD Frame */}
      <nav className="relative max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left Side - Identity Hub */}
        <div className="flex items-center gap-4">
          <OrbitalMenu />
          
          {/* Name - Hidden on small screens */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-heading text-sm text-gray-400 uppercase tracking-wider">
              Operator
            </span>
            <h1 className="font-heading text-xl font-bold gradient-text -mt-1">
              Harsh Lembhe
            </h1>
          </motion.div>
        </div>

        {/* Center - Status Indicator */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)' }}
            />
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Status: Available
            </span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            IST Timezone
          </span>
        </motion.div>

        {/* Right Side - 3D Chronometer */}
        <FlipClock />
      </nav>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-electric-purple/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-electric-purple/30 pointer-events-none" />
    </motion.header>
  )
}
