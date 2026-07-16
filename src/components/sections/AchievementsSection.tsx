'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Target, Crown } from 'lucide-react'

const achievements = [
  {
    type: 'achievement',
    title: '1st Place — AlgoThugs 2026',
    issuer: 'IIT Patna',
    date: '2026',
    description: 'Ranked 1st in IIT Patna\'s AlgoThugs 2026 competitive programming contest.',
    icon: Crown,
  },
  {
    type: 'achievement',
    title: 'Winner — HireHustle',
    issuer: 'PICT ACM',
    date: '2025',
    description: 'Won the HireHustle competitive programming contest organized by PICT ACM Student Chapter.',
    icon: Trophy,
  },
  {
    type: 'achievement',
    title: 'AIR 1458 — CodeFest\'25',
    issuer: 'IICPC Prelims (Top IITs)',
    date: '2025',
    description: 'Secured All India Rank 1458 in IICPC\'s CodeFest\'25 Prelims, organized by top IITs across India.',
    icon: Target,
  },
  {
    type: 'achievement',
    title: '6th Place — CODEFT 5.0',
    issuer: 'AIT (1200+ teams)',
    date: '2025',
    description: 'Ranked 6th in AIT\'s CODEFT 5.0 competitive programming contest, outperforming 1200+ competing teams.',
    icon: Medal,
  },
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] mb-4 block" style={{ color: 'var(--text-muted)' }}>
            Recognition
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            Competitive programming wins and milestones
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
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--border)' }}
                >
                  <achievement.icon className="w-7 h-7" style={{ color: 'var(--text-secondary)' }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{achievement.issuer}</p>
                    </div>
                  </div>

                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{achievement.date}</span>
                  </div>
                </div>
              </div>

              {/* Badge type indicator */}
              <div
                className="absolute top-4 right-4 px-2 py-1 text-[10px] uppercase tracking-wider rounded-full"
                style={{ background: 'var(--border)', color: 'var(--text-muted)' }}
              >
                CP Win
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
