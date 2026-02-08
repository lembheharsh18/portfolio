'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Copy, Check } from 'lucide-react'

interface FloatingIcon {
  id: string
  icon: typeof Github
  label: string
  href: string
  x: number
  y: number
  vx: number
  vy: number
  angle: number
}

const ICONS_DATA = [
  { id: 'github', icon: Github, label: 'GitHub', href: '#' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '#' },
  { id: 'email', icon: Mail, label: 'Email', href: 'mailto:lembheharsh0508@gmail.com' },
]

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseInArea, setIsMouseInArea] = useState(false)
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const [copied, setCopied] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const animationRef = useRef<number>()

  // Initialize icons with random positions
  useEffect(() => {
    const initialIcons: FloatingIcon[] = ICONS_DATA.map((data, i) => ({
      ...data,
      x: 150 + Math.cos((i * 2 * Math.PI) / ICONS_DATA.length) * 120,
      y: 150 + Math.sin((i * 2 * Math.PI) / ICONS_DATA.length) * 120,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2,
    }))
    setIcons(initialIcons)
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    setIcons((prevIcons) =>
      prevIcons.map((icon) => {
        let { x, y, vx, vy, angle } = icon
        const containerSize = 300
        const iconSize = 60

        if (isMouseInArea) {
          // Orbit around cursor
          const dx = mousePos.x - x
          const dy = mousePos.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const orbitRadius = 80

          if (distance < 150) {
            // Calculate orbit position
            angle += 0.03
            const targetX = mousePos.x + Math.cos(angle) * orbitRadius
            const targetY = mousePos.y + Math.sin(angle) * orbitRadius

            // Smoothly move towards orbit position
            x += (targetX - x) * 0.05
            y += (targetY - y) * 0.05
          } else {
            // Float towards cursor area
            vx += dx * 0.0001
            vy += dy * 0.0001
            x += vx
            y += vy
          }
        } else {
          // Aimless floating
          x += vx
          y += vy

          // Add slight randomness
          vx += (Math.random() - 0.5) * 0.02
          vy += (Math.random() - 0.5) * 0.02

          // Damping
          vx *= 0.99
          vy *= 0.99
        }

        // Bounce off walls
        if (x < iconSize / 2 || x > containerSize - iconSize / 2) {
          vx *= -0.8
          x = Math.max(iconSize / 2, Math.min(containerSize - iconSize / 2, x))
        }
        if (y < iconSize / 2 || y > containerSize - iconSize / 2) {
          vy *= -0.8
          y = Math.max(iconSize / 2, Math.min(containerSize - iconSize / 2, y))
        }

        return { ...icon, x, y, vx, vy, angle }
      })
    )

    animationRef.current = requestAnimationFrame(animate)
  }, [isMouseInArea, mousePos])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lembheharsh0508@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-purple/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Let&apos;s Talk
          </span>
        </motion.div>

        {/* Gravity Well Container */}
        <div className="flex flex-col items-center gap-12">
          {/* Interactive Area */}
          <motion.div
            ref={containerRef}
            className="relative w-[300px] h-[300px] rounded-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseInArea(true)}
            onMouseLeave={() => setIsMouseInArea(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Gravity well visual */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-16 rounded-full border border-white/10" />

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text">
                Connect
              </h2>
            </div>

            {/* Floating Icons */}
            {icons.map((icon) => (
              <motion.a
                key={icon.id}
                href={icon.href}
                className="absolute w-14 h-14 rounded-xl glass flex items-center justify-center cursor-pointer group"
                style={{
                  left: icon.x - 28,
                  top: icon.y - 28,
                }}
                whileHover={{ scale: 1.2 }}
                onClick={icon.id === 'email' ? (e) => { e.preventDefault(); handleCopyEmail(); } : undefined}
              >
                <icon.icon className="w-6 h-6 text-white group-hover:text-neon-cyan transition-colors" />
                
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {icon.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Email */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-3 px-6 py-3 glass rounded-full group hover:border-neon-cyan/50 transition-colors"
            >
              <Mail className="w-5 h-5 text-neon-cyan" />
              <span className="text-gray-300">lembheharsh0508@gmail.com</span>
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan transition-colors" />
              )}
            </button>

            {/* Phone - Reveal on Hover */}
            <div
              className="relative"
              onMouseEnter={() => setShowPhone(true)}
              onMouseLeave={() => setShowPhone(false)}
            >
              <div className="flex items-center gap-3 px-6 py-3 glass rounded-full cursor-pointer">
                <Phone className="w-5 h-5 text-electric-purple" />
                <span className="text-gray-300">
                  {showPhone ? '+91 8625923006' : 'Hover to reveal phone'}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Harsh Lembhe. Architecting Intelligence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
