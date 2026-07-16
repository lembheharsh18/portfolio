'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'DocuChat',
    subtitle: 'RAG Document Intelligence',
    category: 'ai',
    description: 'A RAG-powered platform that lets you chat with PDFs using Google Gemini & Pinecone. Features secure API infrastructure with SHA256 hashing, OWASP-aligned security practices, and streaming LLM responses.',
    techStack: ['Next.js', 'Python', 'Gemini', 'Pinecone', 'AWS S3', 'PostgreSQL'],
    github: 'https://github.com/lembheharsh18/docuchat',
    live: '#',
    preview: '/projects/docuchat.png',
  },
  {
    title: 'CoderSphere',
    subtitle: 'Community Hub',
    category: 'web',
    description: 'Full-stack coders community platform with dynamic profiles, competitive programming ratings, real-time activity feeds, discussion forums, live chat, and social engagement tools via scalable RESTful APIs.',
    techStack: ['React', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Socket.io'],
    github: 'https://github.com/lembheharsh18/coder-sphere-connect',
    live: '#',
    preview: '/projects/codersphere.png',
  },
  {
    title: 'Portfolio v2',
    subtitle: 'Personal Website',
    category: 'web',
    description: 'This developer portfolio featuring interactive coding profile cards with live stats, Compare With Me feature, particle network animations, and a clean modern design.',
    techStack: ['Next.js', 'Framer Motion', 'TailwindCSS', 'TypeScript'],
    github: 'https://github.com/lembheharsh18/portfolio',
    live: 'https://harshlembhe.dev',
    preview: null,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Things I&apos;ve built and deployed</p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group grid md:grid-cols-5 gap-6 items-center rounded-2xl p-4 md:p-6 transition-all duration-500 relative overflow-hidden"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {/* Preview */}
              <div
                className="md:col-span-2 aspect-video rounded-xl overflow-hidden flex items-center justify-center"
                style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
              >
                {project.preview ? (
                  <img
                    src={project.preview}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      el.parentElement!.innerHTML = `<div class="text-center"><div class="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center" style="background:var(--border)"><span class="text-xl">📁</span></div><p class="text-xs" style="color:var(--text-muted)">PREVIEW</p></div>`
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ background: 'var(--border)' }}>
                      <span className="text-xl">🌐</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PREVIEW</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:col-span-3 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-lg transition-all duration-300"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        background: 'var(--bg)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
