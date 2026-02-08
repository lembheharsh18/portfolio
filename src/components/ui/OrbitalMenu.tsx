'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

const orbitItems = [
  { id: 'github', icon: Github, label: 'GitHub', href: '#', angle: -60 },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '#', angle: -20 },
  { id: 'email', icon: Mail, label: 'Email', href: 'mailto:lembheharsh0508@gmail.com', angle: 20 },
  { id: 'resume', icon: FileText, label: 'Resume', href: '#', angle: 60 },
]

export default function OrbitalMenu() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Profile Picture */}
      <motion.div
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: isExpanded 
            ? '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3)'
            : '0 0 10px rgba(0, 240, 255, 0.3)',
        }}
      >
        {/* Profile image placeholder - gradient avatar */}
        <div className="w-full h-full bg-gradient-to-br from-neon-cyan via-electric-purple to-neon-cyan flex items-center justify-center">
          <span className="font-heading text-xl font-bold text-void">HL</span>
        </div>
        
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/50" />
      </motion.div>

      {/* Orbital Icons */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {orbitItems.map((item, index) => {
              // Calculate position based on angle
              const radius = 50
              const angleRad = (item.angle * Math.PI) / 180
              const x = Math.cos(angleRad) * radius
              const y = Math.sin(angleRad) * radius - 20

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full glass flex items-center justify-center group"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: x + 7, 
                    y: y + 7, 
                    scale: 1,
                    opacity: 1 
                  }}
                  exit={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0 
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
                  }}
                  style={{
                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)',
                  }}
                >
                  <item.icon className="w-4 h-4 text-white group-hover:text-neon-cyan transition-colors" />
                  
                  {/* Tooltip */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.a>
              )
            })}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
