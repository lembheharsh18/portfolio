'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HolographicCard from '@/components/ui/HolographicCard'

const projects = [
  {
    title: 'DocuChat',
    tag: 'GenAI SaaS',
    category: 'ai',
    description: 'A RAG-based platform to chat with PDFs using Google Gemini & Pinecone. Features semantic search and intelligent document understanding.',
    techStack: ['Next.js', 'Python', 'AWS S3', 'Pinecone', 'Gemini'],
    github: 'https://github.com/lembheharsh18/docuchat',
    live: '#',
    accent: 'cyan' as const,
  },
  {
    title: 'ShopFlow ERP',
    tag: 'Enterprise System',
    category: 'enterprise',
    description: 'Comprehensive ERP built for Microcut Technology to manage workshop inventories, orders, and real-time analytics.',
    techStack: ['Spring Boot', 'React', 'MySQL', 'Docker'],
    github: '#',
    live: '#',
    accent: 'purple' as const,
  },
  {
    title: 'FinRAG Assistant',
    tag: 'AI Finance',
    category: 'ai',
    description: 'AI-powered financial document analysis tool with RAG architecture for intelligent Q&A on financial reports.',
    techStack: ['Next.js', 'FastAPI', 'Firebase', 'LangChain'],
    github: 'https://github.com/lembheharsh18/finrag',
    live: '#',
    accent: 'cyan' as const,
  },
  {
    title: 'CoderSphere',
    tag: 'Social Platform',
    category: 'web',
    description: 'Developer-focused social platform with real-time chat, post sharing, and community features.',
    techStack: ['React', 'Node.js', 'Socket.io', 'Prisma'],
    github: 'https://github.com/lembheharsh18/coder-sphere-connect',
    live: '#',
    accent: 'purple' as const,
  },
  {
    title: 'Portfolio v2',
    tag: 'Personal Website',
    category: 'web',
    description: 'This cyberpunk-themed portfolio featuring interactive animations, 3D effects, and modern design patterns.',
    techStack: ['Next.js', 'Framer Motion', 'TailwindCSS'],
    github: 'https://github.com/lembheharsh18/portfolio',
    live: '#',
    accent: 'cyan' as const,
  },
  {
    title: 'AI Code Reviewer',
    tag: 'Developer Tool',
    category: 'ai',
    description: 'Automated code review tool powered by LLMs that provides suggestions, identifies bugs, and improves code quality.',
    techStack: ['Python', 'OpenAI', 'GitHub API', 'FastAPI'],
    github: '#',
    live: '#',
    accent: 'purple' as const,
  },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'web', label: 'Web Apps' },
  { id: 'enterprise', label: 'Enterprise' },
]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  )

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-electric-purple/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Mission Log
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Systems I've architected and deployed into production
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-neon-cyan to-electric-purple text-void'
                  : 'glass text-gray-400 hover:text-white hover:border-neon-cyan/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <HolographicCard
                  title={project.title}
                  tag={project.tag}
                  description={project.description}
                  techStack={project.techStack}
                  github={project.github}
                  live={project.live}
                  accent={project.accent}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* More Projects Hint */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            More projects available on{' '}
            <a
              href="https://github.com/lembheharsh18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
