'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

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
  { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/lembheharsh18' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/lembheharsh18' },
  { id: 'email', icon: Mail, label: 'Email', href: 'mailto:lembheharsh0508@gmail.com' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseInArea, setIsMouseInArea] = useState(false)
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const animationRef = useRef<number>()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formError, setFormError] = useState('')

  // Initialize icons with random positions
  useEffect(() => {
    const initialIcons: FloatingIcon[] = ICONS_DATA.map((data, i) => ({
      ...data,
      x: 100 + Math.cos((i * 2 * Math.PI) / ICONS_DATA.length) * 80,
      y: 100 + Math.sin((i * 2 * Math.PI) / ICONS_DATA.length) * 80,
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
        const containerSize = 200
        const iconSize = 48

        if (isMouseInArea) {
          const dx = mousePos.x - x
          const dy = mousePos.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const orbitRadius = 60

          if (distance < 120) {
            angle += 0.03
            const targetX = mousePos.x + Math.cos(angle) * orbitRadius
            const targetY = mousePos.y + Math.sin(angle) * orbitRadius
            x += (targetX - x) * 0.05
            y += (targetY - y) * 0.05
          } else {
            vx += dx * 0.0001
            vy += dy * 0.0001
            x += vx
            y += vy
          }
        } else {
          x += vx
          y += vy
          vx += (Math.random() - 0.5) * 0.02
          vy += (Math.random() - 0.5) * 0.02
          vx *= 0.99
          vy *= 0.99
        }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setFormError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address')
      return
    }

    setFormStatus('loading')

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }

      setTimeout(() => setFormStatus('idle'), 5000)
    } catch {
      setFormStatus('error')
      setFormError('Something went wrong. Please try again.')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] mb-4 block" style={{ color: 'var(--text-muted)' }}>
            Let's Talk
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <h3 className="font-heading text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Send a Message</h3>

              {/* Name Input */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none transition-all"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="John Doe"
                  disabled={formStatus === 'loading'}
                />
              </div>

              {/* Email Input */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none transition-all"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="john@example.com"
                  disabled={formStatus === 'loading'}
                />
              </div>

              {/* Message Input */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none transition-all resize-none"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Tell me about your project..."
                  disabled={formStatus === 'loading'}
                />
              </div>

              {/* Error Message */}
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm mb-4"
                >
                  <AlertCircle className="w-4 h-4" />
                  {formError}
                </motion.div>
              )}

              {/* Success Message */}
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm mb-4"
                >
                  <CheckCircle className="w-4 h-4" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg)',
                }}
                whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
              >
                {formStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Floating Icons & Info */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gravity Well */}
            <div
              ref={containerRef}
              className="relative w-[200px] h-[200px] rounded-full"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsMouseInArea(true)}
              onMouseLeave={() => setIsMouseInArea(false)}
            >
              <div className="absolute inset-0 rounded-full" style={{ border: '1px solid var(--border)' }} />
              <div className="absolute inset-6 rounded-full" style={{ border: '1px solid var(--border)' }} />
              <div className="absolute inset-12 rounded-full" style={{ border: '1px solid var(--border-hover)' }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-xl font-bold gradient-text">Connect</span>
              </div>

              {icons.map((icon) => (
                <motion.a
                  key={icon.id}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute w-12 h-12 rounded-xl glass flex items-center justify-center group"
                  style={{
                    left: icon.x - 24,
                    top: icon.y - 24,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <icon.icon className="w-5 h-5 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }} />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                    {icon.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 w-full max-w-sm">
              <a
                href="mailto:lembheharsh0508@gmail.com"
                className="flex items-center gap-4 p-4 glass rounded-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--border)' }}>
                  <Mail className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Email</p>
                  <p className="group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    lembheharsh0508@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--border)' }}>
                  <Phone className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Phone</p>
                  <p style={{ color: 'var(--text-primary)' }}>+91 8625923006</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
