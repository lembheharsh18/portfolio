'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleNetwork from '@/components/ui/ParticleNetwork'
import { useTheme } from '@/components/ThemeProvider'
import { ChevronDown, Github, Linkedin, Mail, Sun, Moon, Zap, BarChart3, Terminal } from 'lucide-react'

export default function HeroSection() {
  const { theme, toggleTheme } = useTheme()
  const [time, setTime] = useState<string>('')
  const [lastSolved, setLastSolved] = useState<string>('Loading...')
  const [currentlyBuilding, setCurrentlyBuilding] = useState<string>('Loading...')

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const h12 = hours % 12 || 12
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const mins = String(now.getMinutes()).padStart(2, '0')
      const secs = String(now.getSeconds()).padStart(2, '0')
      setTime(`${String(h12).padStart(2, '0')}:${mins}:${secs} ${ampm}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch last solved from LeetCode
  useEffect(() => {
    fetch('/api/leetcode/harsh_lembhe18')
      .then(r => r.json())
      .then(d => {
        if (d.recentSubmissions && d.recentSubmissions.length > 0) {
          setLastSolved(d.recentSubmissions[0].title)
        } else if (d.contestHistory && d.contestHistory.length > 0) {
          setLastSolved(d.contestHistory[d.contestHistory.length - 1].title)
        } else {
          setLastSolved('Recent Problem')
        }
      })
      .catch(() => setLastSolved('Recent Problem'))
  }, [])

  // Fetch currently building from GitHub
  useEffect(() => {
    fetch('/api/github/lembheharsh18')
      .then(r => r.json())
      .then(d => {
        if (d.latestRepo) {
          setCurrentlyBuilding(d.latestRepo)
        } else {
          setCurrentlyBuilding('Portfolio')
        }
      })
      .catch(() => setCurrentlyBuilding('Portfolio'))
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg)' }} />
      <ParticleNetwork />

      {/* Top bar — clock, theme toggle */}
      <motion.div
        className="absolute top-6 left-0 right-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <p className="font-heading text-lg md:text-xl font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
            {time}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            GMT + 5 : 30 • Pune, Maharashtra
          </p>
        </div>
      </motion.div>

      {/* Top-right controls */}
      <motion.div
        className="absolute top-6 right-6 z-20 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          EN
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center">
        {/* Status pills above profile */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Last solved pill */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          >
            <Zap className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>LAST SOLVED</p>
              <p className="text-sm font-medium truncate max-w-[180px]" style={{ color: 'var(--text-primary)' }}>
                {lastSolved}
              </p>
            </div>
          </div>

          {/* Try terminal pill */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            <Terminal className="w-4 h-4" />
            <span>try terminal</span>
          </a>
        </motion.div>

        {/* Profile card */}
        <motion.div
          className="w-full rounded-2xl p-6 md:p-8 relative"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Click me link */}
          <a
            href="#about"
            className="text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--accent-green)' }}
          >
            « click me
          </a>

          {/* Social icons top-right */}
          <div className="absolute top-6 right-6 md:right-8 flex items-center gap-2">
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/lembheharsh18', label: 'LinkedIn' },
              { icon: Zap, href: 'https://leetcode.com/u/harsh_lembhe18', label: 'LeetCode' },
              { icon: BarChart3, href: 'https://codeforces.com/profile/Harsh_Lembhe18', label: 'Codeforces' },
              { icon: Github, href: 'https://github.com/lembheharsh18', label: 'GitHub' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Profile content */}
          <div className="flex items-start gap-6 mt-6">
            {/* Profile photo */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0" style={{ border: '1px solid var(--border)' }}>
              <img
                src="/pfp.png"
                alt="Harsh Lembhe"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Harsh
                </h1>
                {/* Verified badge */}
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
              </div>

              <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                Full-Stack Developer
              </p>

              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  lembheharsh0508@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--accent-green)' }}>
            Building scalable systems &amp; solving complex problems.
          </p>
        </motion.div>

        {/* Bottom status pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Currently building pill */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          >
            <Github className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>CURRENTLY BUILDING</p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {currentlyBuilding}
              </p>
            </div>
          </div>

          {/* Available badge */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
            <span className="text-xs" style={{ color: 'var(--accent-green)' }}>Available for opportunities</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
