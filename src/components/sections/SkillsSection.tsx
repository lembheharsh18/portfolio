'use client'

import { motion } from 'framer-motion'
import TagCloud3D from '@/components/ui/TagCloud3D'
import { Sparkles } from 'lucide-react'

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
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
            Tech Arsenal
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Technologies and tools I wield to build intelligent systems
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Tag Cloud */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TagCloud3D />
          </motion.div>

          {/* Specialization Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* GenAI Specialization */}
            <div className="glass rounded-2xl p-6 border border-amber-400/20 group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <h3 className="font-heading text-xl font-bold text-amber-400">
                  GenAI Specialist
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building RAG pipelines, fine-tuning LLMs, and creating intelligent AI-powered applications that transform data into insights.
              </p>
            </div>

            {/* Spring Boot Specialization */}
            <div className="glass rounded-2xl p-6 border border-amber-400/20 group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <h3 className="font-heading text-xl font-bold text-amber-400">
                  Spring Boot Expert
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Architecting robust, scalable backend systems with microservices, RESTful APIs, and enterprise-grade security patterns.
              </p>
            </div>

            {/* Full Stack Note */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                Full Stack Versatility
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                From React frontends to PostgreSQL databases, Docker containers to AWS deployments — end-to-end development expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
