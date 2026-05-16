'use client'

import { motion } from 'framer-motion'
import ParticleNetwork from '@/components/ui/ParticleNetwork'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <ParticleNetwork />

      {/* Violet/Teal ambient glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-neon-cyan/20 floating-shape"
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[25%] right-[15%] w-2 h-2 rotate-45 bg-electric-purple/25 floating-shape-alt"
          animate={{ y: [0, -25, 0], rotate: [45, 225, 405], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[20%] w-4 h-4 rounded-full border border-neon-cyan/15 floating-shape-alt"
          animate={{ y: [0, -15, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-blush/20 floating-shape"
          animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-3 h-3 rotate-45 border border-electric-purple/15 floating-shape"
          animate={{ y: [0, -20, 0], rotate: [45, 135, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-neon-cyan/30"
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Avatar circle with pulsating ring */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          {/* Pulsating outer ring */}
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-neon-cyan/30"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-5 rounded-full border border-electric-purple/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center overflow-hidden">
            <img src="/pfp.png" alt="Harsh Lembhe" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <span className="font-heading text-3xl font-bold text-white absolute">HL</span>
          </div>
        </motion.div>

        {/* Name with animated gradient */}
        <motion.h1
          className="font-heading text-4xl md:text-6xl font-bold gradient-text-animated mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Harsh Lembhe
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Full-Stack Developer & Competitive Programmer
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          AI &amp; Data Science student obsessed with building scalable systems, solving complex problems,
          and making them scale gracefully.
        </motion.p>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: Github, href: 'https://github.com/lembheharsh18', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/lembheharsh18', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:lembheharsh0508@gmail.com', label: 'Email' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={s.label}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>

        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs text-neon-cyan">Available for opportunities</span>
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
          <span className="text-xs text-gray-600 uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
