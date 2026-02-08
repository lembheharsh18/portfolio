'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'

interface EncryptedBlockProps {
  skill: string
  icon?: string
  isDecrypted: boolean
  onDecrypt: () => void
  delay?: number
}

export default function EncryptedBlock({ 
  skill, 
  isDecrypted, 
  onDecrypt, 
  delay = 0 
}: EncryptedBlockProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; rotation: number }[]>([])
  const [hexCode, setHexCode] = useState('0000')
  const [mounted, setMounted] = useState(false)

  // Generate hex code only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setHexCode(Math.random().toString(16).slice(2, 6).toUpperCase())
  }, [])

  const handleClick = () => {
    if (isDecrypted || isAnimating) return
    
    setIsAnimating(true)
    
    // Generate shatter particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360,
    }))
    setParticles(newParticles)
    
    // Clear particles and mark as decrypted
    setTimeout(() => {
      setParticles([])
      setIsAnimating(false)
      onDecrypt()
    }, 400)
  }

  if (!mounted) {
    return (
      <div className="aspect-square rounded-xl border-2 border-green-500/50 bg-black/60" />
    )
  }

  return (
    <motion.div
      className="relative aspect-square cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.05 }}
      onClick={handleClick}
    >
      {/* Encrypted state */}
      <AnimatePresence mode="wait">
        {!isDecrypted ? (
          <motion.div
            key="encrypted"
            className="absolute inset-0 rounded-xl border-2 border-green-500/50 bg-black/60 flex flex-col items-center justify-center gap-2 group hover:border-green-400 hover:bg-black/80 transition-all duration-200"
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="w-6 h-6 text-green-500 group-hover:text-green-400 transition-colors" />
            <div className="text-[10px] text-green-500/70 font-mono">
              {`[${hexCode}]`}
            </div>
            
            {/* Glitch lines */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <motion.div
                className="absolute left-0 right-0 h-px bg-green-500/30"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="decrypted"
            className="absolute inset-0 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 flex flex-col items-center justify-center gap-2 backdrop-blur-sm"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
            }}
          >
            <Unlock className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-semibold text-white text-center px-2">
              {skill}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shatter particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0,
              rotate: particle.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
