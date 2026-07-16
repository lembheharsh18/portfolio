'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const offset = 80 // Navbar height offset
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <motion.a
          href="#home"
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <span className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Harsh Lembhe
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
            style={{ background: 'var(--text-primary)' }}
            whileHover={{ width: '100%' }}
          />
        </motion.a>

        {/* Resume Button */}
        <motion.a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors"
          style={{
            border: '1px solid var(--border-hover)',
            color: 'var(--text-primary)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resume
        </motion.a>
      </nav>
    </motion.header>
  )
}
