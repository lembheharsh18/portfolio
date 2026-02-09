'use client'

import { motion } from 'framer-motion'
import { Code2, Cpu, Rocket, GraduationCap, Download, MapPin, ExternalLink } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'B.E. Computer Engineering',
    subtitle: 'PICT, Pune (2023-2027)',
    color: 'cyan',
  },
  {
    icon: Code2,
    title: 'Full Stack Developer',
    subtitle: 'Spring Boot • React • Next.js',
    color: 'purple',
  },
  {
    icon: Cpu,
    title: 'AI/ML Enthusiast',
    subtitle: 'GenAI • RAG • LLMs',
    color: 'cyan',
  },
  {
    icon: Rocket,
    title: 'Currently Learning',
    subtitle: 'System Design • Cloud Architecture',
    color: 'purple',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-electric-purple/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[180px]" />
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
            Who I Am
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile Photo Column */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group" data-cursor="View">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Border frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-cyan to-electric-purple p-[1px]">
                <div className="w-full h-full rounded-2xl bg-void" />
              </div>

              {/* Profile Image Container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden">
                {/* Replace this with your actual image: */}
                {/* <img src="/profile.jpg" alt="Harsh Lembhe" className="w-full h-full object-cover" /> */}
                
                {/* Placeholder - Remove when adding real image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-cyan to-electric-purple flex items-center justify-center">
                      <span className="font-heading text-4xl font-bold text-void">HL</span>
                    </div>
                    <p className="text-gray-500 text-sm font-mono">profile.jpg</p>
                  </div>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />

                {/* Floating badge */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-300">Available for work</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-cyan/50" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-electric-purple/50" />
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 relative">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-neon-cyan/30 rounded-tr-2xl" />
              
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Hey, I'm <span className="text-neon-cyan">Harsh Lembhe</span>
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-4">
                A passionate Full Stack Developer and AI enthusiast crafting the future of web experiences. 
                I specialize in building scalable applications and AI-powered solutions that solve real-world problems.
              </p>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                Currently pursuing my B.E. in Computer Engineering at PICT, Pune. I transform complex ideas 
                into elegant, high-performance digital experiences. My work spans from enterprise ERP systems 
                to cutting-edge GenAI applications.
              </p>

              <div className="flex items-center gap-4 text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm">Pune, India</span>
                </div>
                <span className="text-gray-700">•</span>
                <a
                  href="https://github.com/lembheharsh18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm hover:text-neon-cyan transition-colors"
                  data-cursor="Open"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-electric-purple text-void font-semibold hover:shadow-neon-cyan transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="Download"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="Contact"
                >
                  Let's Connect
                </motion.a>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass rounded-xl p-4 group hover:border-neon-cyan/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      item.color === 'cyan' ? 'bg-neon-cyan/10' : 'bg-electric-purple/10'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        item.color === 'cyan' ? 'text-neon-cyan' : 'text-electric-purple'
                      }`}
                    />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
