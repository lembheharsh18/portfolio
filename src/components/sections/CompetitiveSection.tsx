'use client'

import { motion } from 'framer-motion'
import CircularProgress from '@/components/ui/CircularProgress'
import HorizontalProgress from '@/components/ui/HorizontalProgress'
import CppLogo from '@/components/ui/CppLogo'

export default function CompetitiveSection() {
  return (
    <section id="competitive" className="relative py-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-purple/5 rounded-full blur-[150px] -translate-y-1/2" />
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
            Battle Statistics
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Competitive Intelligence</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Main Stat - Codeforces Ring */}
          <motion.div
            className="lg:col-span-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 scale-110 border border-neon-cyan/20 rounded-full" />
              <div className="absolute inset-0 scale-125 border border-neon-cyan/10 rounded-full" />
              
              <CircularProgress
                value={1634}
                max={3000}
                size={220}
                strokeWidth={14}
                rank="EXPERT"
                label="Codeforces"
                color="#00f0ff"
              />
            </div>
          </motion.div>

          {/* Secondary Stats + C++ Logo */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Progress Bars Column */}
              <div className="space-y-8">
                <motion.div
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <HorizontalProgress
                    value={450}
                    max={1000}
                    label="LeetCode"
                    sublabel="Problems Solved"
                    color="#FFA116"
                  />
                </motion.div>

                <motion.div
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <HorizontalProgress
                    value={1580}
                    max={3000}
                    label="CodeChef"
                    sublabel="Rating"
                    color="#7000ff"
                  />
                </motion.div>

                {/* Stats Badges */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="px-4 py-2 glass rounded-full text-sm">
                    <span className="text-gray-400">Contests: </span>
                    <span className="text-neon-cyan font-semibold">50+</span>
                  </div>
                  <div className="px-4 py-2 glass rounded-full text-sm">
                    <span className="text-gray-400">Global Rank: </span>
                    <span className="text-electric-purple font-semibold">Top 10%</span>
                  </div>
                </motion.div>
              </div>

              {/* C++ Logo Column */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CppLogo />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
