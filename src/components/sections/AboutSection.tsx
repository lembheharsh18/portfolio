'use client'

import { motion } from 'framer-motion'
import { Code2, Cpu, Rocket, GraduationCap, Download, MapPin, ExternalLink } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'B.E. AI & Data Science',
    subtitle: 'PICT, Pune (2023-2027) • CGPA 9.43',
  },
  {
    icon: Code2,
    title: 'Full Stack Developer',
    subtitle: 'Spring Boot • React • Next.js • MERN',
  },
  {
    icon: Cpu,
    title: 'AI/ML Enthusiast',
    subtitle: 'GenAI • RAG • LLMs • Pinecone',
  },
  {
    icon: Rocket,
    title: 'Competitive Programmer',
    subtitle: 'CF Expert • CC 4★ • LC Knight',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
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
            Who I Am
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile Photo Column */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group" data-cursor="View">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: 'var(--text-muted)' }}
              />

              {/* Border frame */}
              <div className="absolute -inset-1 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--text-muted), var(--border))' }}>
                <div className="w-full h-full rounded-2xl" style={{ background: 'var(--bg)' }} />
              </div>

              {/* Profile Image Container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden">
                <img src="/pfp.png" alt="Harsh Lembhe" className="w-full h-full object-cover" />

                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)' }} />

                {/* Floating badge */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Available for work</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6" style={{ borderTop: '2px solid var(--text-muted)', borderRight: '2px solid var(--text-muted)' }} />
              <div className="absolute -bottom-3 -left-3 w-6 h-6" style={{ borderBottom: '2px solid var(--text-muted)', borderLeft: '2px solid var(--text-muted)' }} />
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 relative">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl" style={{ borderTop: '2px solid var(--border-hover)', borderRight: '2px solid var(--border-hover)' }} />

              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Hey, I&apos;m <span style={{ color: 'var(--text-primary)', opacity: 0.9 }}>Harsh Lembhe</span>
              </h3>

              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                A passionate Full Stack Developer and AI enthusiast building intelligent, scalable applications.
                I specialize in RAG pipelines, enterprise backend systems, and competitive programming —
                ranked Expert on Codeforces and Knight on LeetCode.
              </p>

              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Currently pursuing B.E. in Artificial Intelligence and Data Science at PICT, Pune
                with a CGPA of 9.43/10. I build everything from secure API infrastructures with
                Spring Boot to real-time community platforms with the MERN stack.
              </p>

              <div className="flex items-center gap-4 mb-8" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Pune, India</span>
                </div>
                <span style={{ color: 'var(--border)' }}>•</span>
                <a
                  href="https://github.com/lembheharsh18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                  data-cursor="Open"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="Download"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                  style={{
                    border: '1px solid var(--border-hover)',
                    color: 'var(--text-primary)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="Contact"
                >
                  Let&apos;s Connect
                </motion.a>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass rounded-xl p-4 group transition-all duration-300"
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'var(--border)' }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
