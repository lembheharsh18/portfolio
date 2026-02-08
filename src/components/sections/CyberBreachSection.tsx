'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EncryptedBlock from '@/components/ui/EncryptedBlock'
import { Shield, Download, Terminal } from 'lucide-react'

const SKILLS = [
  'Spring Boot',
  'GenAI',
  'Next.js',
  'C++',
  'Java',
  'Python',
  'React',
  'AWS',
  'Docker',
  'PostgreSQL',
  'RAG',
  'LLMs',
]

export default function CyberBreachSection() {
  const [decryptedSkills, setDecryptedSkills] = useState<Set<number>>(new Set())
  const [showAccessGranted, setShowAccessGranted] = useState(false)

  const progress = decryptedSkills.size
  const total = SKILLS.length
  const isComplete = progress === total

  useEffect(() => {
    if (isComplete && !showAccessGranted) {
      setShowAccessGranted(true)
    }
  }, [isComplete, showAccessGranted])

  const handleDecrypt = (index: number) => {
    setDecryptedSkills((prev) => new Set([...prev, index]))
  }

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-green-500" />
            <span className="font-mono text-green-500 text-sm">
              root@portfolio:~$ decrypt --target skills
            </span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="text-green-500">&#62;</span> System Locked
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Click blocks to decrypt Tech Stack
          </p>
        </motion.div>

        {/* Progress Counter */}
        <motion.div
          className="flex items-center justify-between mb-8 px-4 py-3 rounded-lg border border-green-500/30 bg-black/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-mono text-sm text-green-400">
              Decryption Progress:
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-white">
              {progress}
            </span>
            <span className="font-mono text-gray-500">/</span>
            <span className="font-mono text-lg text-gray-400">{total}</span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-neon-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(progress / total) * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
            }}
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {SKILLS.map((skill, index) => (
            <EncryptedBlock
              key={skill}
              skill={skill}
              isDecrypted={decryptedSkills.has(index)}
              onDecrypt={() => handleDecrypt(index)}
              delay={index}
            />
          ))}
        </motion.div>

        {/* ACCESS GRANTED Banner */}
        <AnimatePresence>
          {showAccessGranted && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="text-center py-8 rounded-2xl border-2 border-green-500/50 bg-green-500/10"
                style={{
                  boxShadow: '0 0 40px rgba(34, 197, 94, 0.3), inset 0 0 40px rgba(34, 197, 94, 0.05)',
                }}
              >
                <motion.h3
                  className="font-heading text-4xl md:text-5xl font-bold text-green-400 mb-4"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    textShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.4)',
                  }}
                >
                  ACCESS GRANTED
                </motion.h3>
                <p className="text-gray-400 mb-6 font-mono text-sm">
                  All systems decrypted. Full clearance achieved.
                </p>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
