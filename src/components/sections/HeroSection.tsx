'use client'

import { motion } from 'framer-motion'
import ParticleNetwork from '@/components/ui/ParticleNetwork'
import TypewriterSequence from '@/components/ui/TypewriterSequence'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Void black background */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* Particle Network (Stars that connect on mouse move) */}
      <ParticleNetwork />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Terminal-style header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)' }}
            />
            <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              System Online • Secure Connection
            </span>
          </div>
        </motion.div>

        {/* Typewriter Sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <TypewriterSequence />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Full Stack Developer specializing in{' '}
          <span className="text-neon-cyan">AI-powered systems</span> and{' '}
          <span className="text-electric-purple">enterprise solutions</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full font-semibold text-void bg-gradient-to-r from-neon-cyan to-electric-purple hover:shadow-neon-cyan transition-all duration-300 hover:scale-105"
          >
            View Operations
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300"
          >
            Establish Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5 text-neon-cyan" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 md:left-8 flex flex-col gap-1 opacity-30">
        <div className="w-20 h-px bg-gradient-to-r from-neon-cyan to-transparent" />
        <div className="w-12 h-px bg-gradient-to-r from-neon-cyan to-transparent" />
        <div className="w-6 h-px bg-gradient-to-r from-neon-cyan to-transparent" />
      </div>
      <div className="absolute top-20 right-4 md:right-8 flex flex-col gap-1 opacity-30 items-end">
        <div className="w-20 h-px bg-gradient-to-l from-electric-purple to-transparent" />
        <div className="w-12 h-px bg-gradient-to-l from-electric-purple to-transparent" />
        <div className="w-6 h-px bg-gradient-to-l from-electric-purple to-transparent" />
      </div>
    </section>
  )
}
