'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Core',
    items: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management', 'Operating Systems', 'System Design'],
    color: '#10b981',
  },
  {
    title: 'Languages',
    items: ['Python', 'C++', 'C', 'C#', 'JavaScript', 'SQL', 'Java'],
    color: '#f59e0b',
  },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Spring Boot', 'Flask', 'Django'],
    color: '#6366f1',
  },
  {
    title: 'Databases & Services',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle', 'AWS S3', 'Pinecone'],
    color: '#ec4899',
  },
  {
    title: 'Developer Tools',
    items: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'VS Code', 'Postman', 'Vercel'],
    color: '#22d3ee',
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Skills & Technologies</span>
          </h2>
          <p className="text-gray-500 text-sm">Technologies and tools I use to build things</p>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm border transition-all duration-300 cursor-default"
                    style={{
                      borderColor: `${category.color}30`,
                      color: '#d1d5db',
                      background: `${category.color}08`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                    whileHover={{
                      borderColor: `${category.color}80`,
                      background: `${category.color}15`,
                      scale: 1.05,
                      y: -2,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
