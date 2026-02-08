'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Users, Calendar } from 'lucide-react'

const experiences = [
  {
    company: 'Microcut Technology',
    role: 'Software Intern',
    period: 'Feb 2026 - May 2026',
    description: 'Developed ShopFlow ERP - a comprehensive enterprise resource planning system for managing workshop inventories.',
    icon: Briefcase,
    type: 'work',
  },
  {
    company: 'PASC (PICT ACM Student Chapter)',
    role: 'Council Member',
    period: 'Present',
    description: 'Organized "Compute and Compete" event - a technical competition fostering innovation and coding excellence.',
    icon: Users,
    type: 'community',
  },
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to timeline fill
  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Career Path
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            My journey in tech and community leadership
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Track (background) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/10 rounded-full" />

          {/* Timeline Fill (animated) */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-1 -translate-x-1/2 rounded-full origin-top"
            style={{
              height: timelineHeight,
              background: 'linear-gradient(180deg, #00f0ff 0%, #7000ff 100%)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(112, 0, 255, 0.3)',
            }}
          />

          {/* Experience Nodes */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-void border-2 border-neon-cyan z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  style={{
                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)',
                  }}
                />

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 ${
                    index % 2 === 0
                      ? 'md:mr-[calc(50%+2rem)] md:text-right'
                      : 'md:ml-[calc(50%+2rem)]'
                  }`}
                >
                  <motion.div
                    className="glass rounded-2xl p-6 relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: `radial-gradient(circle at ${index % 2 === 0 ? '100%' : '0%'} 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                        <exp.icon className="w-5 h-5 text-neon-cyan" />
                      </div>
                      <span className="text-neon-cyan text-sm font-medium">
                        {exp.type === 'work' ? 'Work Experience' : 'Community'}
                      </span>
                    </div>

                    {/* Company */}
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
                      {exp.company}
                    </h3>

                    {/* Role */}
                    <p className="text-electric-purple font-semibold mb-2">
                      {exp.role}
                    </p>

                    {/* Period */}
                    <div
                      className={`flex items-center gap-2 text-gray-500 text-sm mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline End Node */}
          <motion.div
            className="absolute left-8 md:left-1/2 bottom-0 -translate-x-1/2 w-3 h-3 rounded-full bg-electric-purple"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            style={{
              boxShadow: '0 0 15px rgba(112, 0, 255, 0.8)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
