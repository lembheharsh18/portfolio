'use client'

import { motion } from 'framer-motion'
import HolographicCard from '@/components/ui/HolographicCard'

const projects = [
  {
    title: 'DocuChat',
    tag: 'GenAI SaaS',
    description: 'A RAG-based platform to chat with PDFs using Google Gemini & Pinecone.',
    techStack: ['Next.js', 'Python', 'AWS S3'],
    github: '#',
    live: '#',
    accent: 'cyan' as const,
  },
  {
    title: 'ShopFlow ERP',
    tag: 'Industrial System',
    description: 'Comprehensive ERP built for Microcut Technology to manage workshop inventories.',
    techStack: ['Spring Boot', 'React', 'MySQL'],
    github: '#',
    live: '#',
    accent: 'purple' as const,
  },
]

export default function ProjectsSection() {
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
          className="text-center mb-16"
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
        </div>

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
              href="#"
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
