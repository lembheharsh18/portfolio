'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approx 100vh)
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass flex items-center justify-center group cursor-pointer hover:border-neon-cyan/50 transition-all duration-300"
          style={{
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:text-neon-cyan transition-colors" />
          
          {/* Glow ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border border-neon-cyan/0 group-hover:border-neon-cyan/50"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
