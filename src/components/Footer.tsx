'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Profiles', href: '#profiles' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/lembheharsh18', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/lembheharsh18', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:lembheharsh0508@gmail.com', label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-heading text-2xl font-bold gradient-text">
                Harsh Lembhe
              </span>
            </motion.a>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Full Stack Developer specializing in AI-powered systems and enterprise solutions.
              Let's build something amazing together.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center transition-all duration-300 hover:opacity-70"
                  style={{ color: 'var(--text-secondary)' }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm inline-flex items-center gap-2 group transition-opacity hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="w-0 h-px group-hover:w-4 transition-all duration-300" style={{ background: 'var(--text-primary)' }} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:lembheharsh0508@gmail.com"
                className="block text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                lembheharsh0508@gmail.com
              </a>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Pune, Maharashtra, India
              </p>
              <motion.a
                href="#contact"
                className="inline-block mt-4 px-5 py-2 text-sm font-medium rounded-full transition-colors"
                style={{
                  border: '1px solid var(--border-hover)',
                  color: 'var(--text-primary)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send a Message
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Harsh Lembhe. Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 inline" style={{ color: 'var(--text-secondary)' }} />
            </motion.span>
            using Next.js
          </p>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70 group"
            style={{ color: 'var(--text-secondary)' }}
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
