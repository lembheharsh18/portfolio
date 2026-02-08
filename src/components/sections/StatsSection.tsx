'use client'

import { motion } from 'framer-motion'
import AlgoRankCard from '@/components/ui/AlgoRankCard'
import GitHubCard from '@/components/ui/GitHubCard'
import { Activity } from 'lucide-react'

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-neon-cyan" />
            <span className="text-neon-cyan text-sm uppercase tracking-[0.3em]">
              Developer Metrics
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Live Stats</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real-time performance indicators and contribution data
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AlgoRankCard />
          <GitHubCard />
        </div>
      </div>
    </section>
  )
}
