'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, Zap, BarChart3 } from 'lucide-react'
import TerminalWidget from '@/components/ui/TerminalWidget'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/lembheharsh18',
    handle: '@lembheharsh18',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/harsh-lembhe-53b900277',
    handle: 'Harsh Lembhe',
  },
  {
    icon: Zap,
    label: 'LeetCode',
    href: 'https://leetcode.com/u/harsh_lembhe18',
    handle: 'Knight',
  },
  {
    icon: BarChart3,
    label: 'Codeforces',
    href: 'https://codeforces.com/profile/Harsh_Lembhe18',
    handle: 'Expert',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:lembheharsh0508@gmail.com',
    handle: 'lembheharsh0508',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 block"
            style={{ color: 'var(--text-muted)' }}
          >
            ❯ COMMAND CENTER
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Connect With Me</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            Use the terminal to explore, or reach out directly below.
          </p>
        </motion.div>

        {/* ── Main Grid: Terminal + Info ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-16">
          {/* Terminal */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWidget className="w-full" />
          </motion.div>

          {/* Contact Info Panel */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Quick links header */}
            <p
              className="text-[10px] font-mono uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              QUICK ACCESS
            </p>

            {/* Email card */}
            <a
              href="mailto:lembheharsh0508@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl transition-all group"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--border)' }}
              >
                <Mail className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Email
                </p>
                <p
                  className="text-sm truncate group-hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text-primary)' }}
                >
                  lembheharsh0508@gmail.com
                </p>
              </div>
            </a>

            {/* Phone card */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--border)' }}
              >
                <Phone className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Phone
                </p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  +91 8625923006
                </p>
              </div>
            </div>

            {/* Location card */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--border)' }}
              >
                <MapPin className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Location
                </p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Terminal hint */}
            <p
              className="text-[10px] font-mono text-center pt-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Try: help · about · resume · social
            </p>
          </motion.div>
        </div>

        {/* ── Social Links Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="h-px mb-10"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--border), transparent)',
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all group"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <social.icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {social.label}
                  </p>
                  <p
                    className="text-[10px] group-hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
