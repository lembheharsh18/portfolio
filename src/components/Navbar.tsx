'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Intersection Observer for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '')
      const section = document.getElementById(sectionId)
      if (section) observer.observe(section)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
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

    setIsMobileMenuOpen(false)
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
          <span className="font-heading text-2xl font-bold gradient-text">
            Harsh Lembhe
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-electric-purple group-hover:w-full transition-all duration-300"
            whileHover={{ width: '100%' }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 font-body text-sm uppercase tracking-widest transition-colors duration-300 rounded-lg ${
                    isActive
                      ? 'text-neon-cyan'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            )
          })}
        </ul>

        {/* Resume Button - Desktop */}
        <motion.a
          href="/resume.pdf"
          download
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/50 text-neon-cyan text-sm hover:bg-neon-cyan/10 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resume
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-neon-cyan" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-void/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <ul className="flex flex-col items-center gap-6">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`font-heading text-3xl font-bold transition-colors duration-300 ${
                            isActive ? 'text-neon-cyan' : 'text-white hover:text-neon-cyan'
                          }`}
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    )
                  })}
                  <motion.li
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-block mt-4 px-6 py-3 rounded-full border border-neon-cyan text-neon-cyan font-semibold"
                    >
                      Download Resume
                    </a>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
