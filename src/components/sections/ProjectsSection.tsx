'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Gamepad2, ChevronRight } from 'lucide-react'

const projects = [
  {
    title: 'DocuChat',
    subtitle: 'RAG Document Intelligence',
    category: 'AI',
    description:
      'A RAG-powered platform that lets you chat with PDFs using Google Gemini & Pinecone. Features secure API infrastructure with SHA256 hashing, OWASP-aligned security practices, and streaming LLM responses.',
    techStack: ['Next.js', 'Python', 'Gemini', 'Pinecone', 'AWS S3', 'PostgreSQL'],
    github: 'https://github.com/lembheharsh18/docuchat',
    live: '',
  },
  {
    title: 'CoderSphere',
    subtitle: 'Community Hub',
    category: 'WEB',
    description:
      'Full-stack coders community platform with dynamic profiles, competitive programming ratings, real-time activity feeds, discussion forums, live chat, and social engagement tools via scalable RESTful APIs.',
    techStack: ['React', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Socket.io'],
    github: 'https://github.com/lembheharsh18/coder-sphere-connect',
    live: '',
  },
  {
    title: 'Portfolio v2',
    subtitle: 'Personal Website',
    category: 'WEB',
    description:
      'This developer portfolio featuring interactive coding profile cards with live stats, an interactive terminal, particle network animations, and a clean modern design.',
    techStack: ['Next.js', 'Framer Motion', 'TailwindCSS', 'TypeScript'],
    github: 'https://github.com/lembheharsh18/portfolio',
    live: 'https://harshlembhe.dev',
  },
]

export default function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = projects[selectedIndex]

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      // Only handle if projects section is in viewport
      const section = document.getElementById('projects')
      if (!section) return
      const rect = section.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % projects.length)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + projects.length) % projects.length)
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Gamepad2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span
              className="text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: 'var(--text-muted)' }}
            >
              ARCADE
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Select Your Game</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Things I&apos;ve built and deployed
          </p>
        </motion.div>

        {/* Game Console Container */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--text-primary) 0px, var(--text-primary) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Top status bar */}
          <div
            className="flex items-center justify-between px-5 py-2.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--accent-green)' }}
              />
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                SYSTEM ONLINE
              </span>
            </div>
            <span
              className="text-[10px] font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              {projects.length} GAMES LOADED
            </span>
          </div>

          <div className="grid md:grid-cols-3">
            {/* ── Game Select List ── */}
            <div
              className="md:col-span-1 p-4"
              style={{ borderRight: '1px solid var(--border)' }}
            >
              <p
                className="text-[10px] font-mono uppercase tracking-widest mb-3 px-1"
                style={{ color: 'var(--text-muted)' }}
              >
                SELECT GAME
              </p>

              <div className="space-y-1.5">
                {projects.map((project, i) => (
                  <motion.button
                    key={project.title}
                    className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all"
                    style={{
                      background:
                        selectedIndex === i ? 'var(--border)' : 'transparent',
                    }}
                    onClick={() => setSelectedIndex(i)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="text-[10px] font-mono tabular-nums"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{
                          color:
                            selectedIndex === i
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)',
                        }}
                      >
                        {project.title}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {project.category}
                      </p>
                    </div>

                    {selectedIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <ChevronRight
                          className="w-4 h-4 shrink-0"
                          style={{ color: 'var(--text-primary)' }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ── Game Info Panel ── */}
            <div className="md:col-span-2 p-6 md:p-8 min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Title + links */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p
                        className="text-[10px] font-mono uppercase tracking-widest mb-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        NOW VIEWING
                      </p>
                      <h3
                        className="font-heading text-2xl md:text-3xl font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {selected.title}
                      </h3>
                      <p
                        className="text-sm mt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {selected.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {selected.github && (
                        <a
                          href={selected.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-70"
                          style={{
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {selected.live && (
                        <a
                          href={selected.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-70"
                          style={{
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px mb-5"
                    style={{ background: 'var(--border)' }}
                  />

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {selected.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <p
                      className="text-[10px] font-mono uppercase tracking-widest mb-3"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      TECH STACK
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono rounded-lg transition-colors"
                          style={{
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    {selected.live && (
                      <motion.a
                        href={selected.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{
                          background: 'var(--text-primary)',
                          color: 'var(--bg)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ▶ LAUNCH
                      </motion.a>
                    )}
                    {selected.github && (
                      <motion.a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{
                          border: '1px solid var(--border-hover)',
                          color: 'var(--text-primary)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ◈ SOURCE CODE
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            className="flex items-center justify-between px-5 py-2"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <span
              className="text-[10px] font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              ↑ ↓ NAVIGATE
            </span>
            <span
              className="text-[10px] font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              CLICK TO SELECT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
