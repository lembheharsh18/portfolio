'use client'

import { motion } from 'framer-motion'
import { Award, Trophy, Star, ExternalLink, CheckCircle } from 'lucide-react'

const achievements = [
  {
    type: 'certification',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Expected 2026',
    icon: Award,
    color: 'cyan',
    link: '#',
    verified: false,
  },
  {
    type: 'achievement',
    title: 'Hackathon Finalist',
    issuer: 'Smart India Hackathon',
    date: '2025',
    icon: Trophy,
    color: 'purple',
    link: '#',
    verified: true,
  },
  {
    type: 'certification',
    title: 'Full Stack Development',
    issuer: 'Coursera',
    date: '2024',
    icon: CheckCircle,
    color: 'cyan',
    link: '#',
    verified: true,
  },
  {
    type: 'achievement',
    title: 'Open Source Contributor',
    issuer: 'GitHub',
    date: 'Active',
    icon: Star,
    color: 'purple',
    link: 'https://github.com/lembheharsh18',
    verified: true,
  },
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-neon-cyan text-sm uppercase tracking-[0.3em] mb-4 block">
            Recognition
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Certifications, awards, and milestones in my journey
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="glass rounded-2xl p-6 relative group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  achievement.color === 'cyan'
                    ? 'bg-gradient-to-br from-neon-cyan/10 to-transparent'
                    : 'bg-gradient-to-br from-electric-purple/10 to-transparent'
                }`}
              />

              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    achievement.color === 'cyan' ? 'bg-neon-cyan/10' : 'bg-electric-purple/10'
                  }`}
                >
                  <achievement.icon
                    className={`w-7 h-7 ${
                      achievement.color === 'cyan' ? 'text-neon-cyan' : 'text-electric-purple'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-white mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{achievement.issuer}</p>
                    </div>
                    {achievement.verified && (
                      <div className="flex items-center gap-1 text-green-400 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500 font-mono">{achievement.date}</span>
                    {achievement.link && achievement.link !== '#' && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-neon-cyan hover:underline"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Badge type indicator */}
              <div
                className={`absolute top-4 right-4 px-2 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                  achievement.type === 'certification'
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'bg-electric-purple/20 text-electric-purple'
                }`}
              >
                {achievement.type}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
