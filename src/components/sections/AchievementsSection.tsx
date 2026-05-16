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
    color: 'pink',
  },
  {
    type: 'achievement',
    title: 'Winner — HireHustle',
    issuer: 'PICT ACM',
    date: '2025',
    description: 'Won the HireHustle competitive programming contest organized by PICT ACM Student Chapter.',
    icon: Trophy,
    color: 'coral',
  },
  {
    type: 'achievement',
    title: 'AIR 1458 — CodeFest\'25',
    issuer: 'IICPC Prelims (Top IITs)',
    date: '2025',
    description: 'Secured All India Rank 1458 in IICPC\'s CodeFest\'25 Prelims, organized by top IITs across India.',
    icon: Target,
    color: 'pink',
  },
  {
    type: 'achievement',
    title: '6th Place — CODEFT 5.0',
    issuer: 'AIT (1200+ teams)',
    date: '2025',
    description: 'Ranked 6th in AIT\'s CODEFT 5.0 competitive programming contest, outperforming 1200+ competing teams.',
    icon: Medal,
    color: 'coral',
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
              {/* Glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  achievement.color === 'pink'
                    ? 'bg-gradient-to-br from-neon-cyan/10 to-transparent'
                    : 'bg-gradient-to-br from-electric-purple/10 to-transparent'
                }`}
              />

              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute top-6 right-16 w-1.5 h-1.5 rounded-full bg-neon-cyan/0 group-hover:bg-neon-cyan/60 pointer-events-none"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-1 h-1 rounded-full bg-electric-purple/0 group-hover:bg-electric-purple/60 pointer-events-none"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />

              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    achievement.color === 'pink' ? 'bg-neon-cyan/10' : 'bg-electric-purple/10'
                  }`}
                >
                  <achievement.icon
                    className={`w-7 h-7 ${
                      achievement.color === 'pink' ? 'text-neon-cyan' : 'text-electric-purple'
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
                  </div>

                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500 font-mono">{achievement.date}</span>
                  </div>
                </div>
              </div>

              {/* Badge type indicator */}
              <div
                className={`absolute top-4 right-4 px-2 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                  achievement.color === 'pink'
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'bg-electric-purple/20 text-electric-purple'
                }`}
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
