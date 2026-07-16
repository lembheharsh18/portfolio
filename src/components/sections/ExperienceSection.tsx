'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Users, Calendar, CheckCircle2 } from 'lucide-react'

const experiences = [
  {
    company: 'Microcut Technology',
    role: 'Software Engineer Intern',
    period: 'Jan 2026 – Apr 2026',
    description: 'Built enterprise backend systems and automated deployment infrastructure for a manufacturing technology company.',
    bullets: [
      'Developed and maintained enterprise backend architectures using Spring Boot, Spring Security, and PostgreSQL, focusing on system architecture and robust API design.',
      'Collaborated on codebase standardization and technical documentation to improve overall maintainability.',
      'Automated deployment workflows by building CI/CD pipelines and containerizing applications using Docker and Kubernetes.',
    ],
    techUsed: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'Docker', 'Kubernetes'],
    icon: Briefcase,
    type: 'work',
  },
  {
    company: 'PASC (PICT ACM Student Chapter)',
    role: 'Council Member',
    period: 'Present',
    description: 'Leading technical initiatives and organizing competitive programming events to foster coding excellence.',
    bullets: [
      'Organized "Compute and Compete" — a technical competition fostering innovation and coding excellence among students.',
      'Contributing to community building and technical event management for one of PICT\'s most active student chapters.',
    ],
    techUsed: [],
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

  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] mb-4 block" style={{ color: 'var(--text-muted)' }}>
            Career Path
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            My journey in tech and community leadership
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Track */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full" style={{ background: 'var(--border)' }} />

          {/* Timeline Fill */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-1 -translate-x-1/2 rounded-full origin-top"
            style={{
              height: timelineHeight,
              background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--text-muted) 100%)',
              boxShadow: '0 0 15px rgba(255,255,255,0.1)',
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
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: 'var(--bg)',
                    border: '2px solid var(--text-primary)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.15)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
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
                    {/* Icon */}
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--border)' }}>
                        <exp.icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        {exp.type === 'work' ? 'Work Experience' : 'Community'}
                      </span>
                    </div>

                    {/* Company */}
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {exp.company}
                    </h3>

                    {/* Role */}
                    <p className="font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {exp.role}
                    </p>

                    {/* Period */}
                    <div
                      className={`flex items-center gap-2 text-sm mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Bullet Points */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-green)' }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags */}
                    {exp.techUsed.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.techUsed.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              background: 'var(--border)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline End Node */}
          <motion.div
            className="absolute left-8 md:left-1/2 bottom-0 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: 'var(--text-muted)',
              boxShadow: '0 0 10px rgba(255,255,255,0.1)',
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  )
}
