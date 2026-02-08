'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypewriterLine {
  prefix: string
  text: string
  color: string
}

const lines: TypewriterLine[] = [
  { prefix: 'Target Acquired:', text: 'Harsh Lembhe', color: 'text-white' },
  { prefix: 'Class:', text: 'AI Engineer', color: 'text-neon-cyan' },
  { prefix: 'Weapon:', text: 'Generative AI', color: 'text-electric-purple' },
]

export default function TypewriterSequence() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentLine = lines[currentLineIndex]
    const fullText = `${currentLine.prefix} ${currentLine.text}`

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Pause before deleting
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting) {
      if (currentCharIndex > 0) {
        const deleteTimer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex - 1)
        }, 30) // Fast delete
        return () => clearTimeout(deleteTimer)
      } else {
        setIsDeleting(false)
        setCurrentLineIndex((currentLineIndex + 1) % lines.length)
      }
    } else {
      if (currentCharIndex < fullText.length) {
        const typeTimer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1)
        }, 80) // Typing speed
        return () => clearTimeout(typeTimer)
      } else {
        setIsPaused(true)
      }
    }
  }, [currentCharIndex, currentLineIndex, isDeleting, isPaused])

  const currentLine = lines[currentLineIndex]
  const fullText = `${currentLine.prefix} ${currentLine.text}`
  const displayText = fullText.slice(0, currentCharIndex)

  // Split display text into prefix and main text
  const prefixEnd = currentLine.prefix.length + 1
  const displayPrefix = displayText.slice(0, Math.min(currentCharIndex, prefixEnd))
  const displayMain = displayText.slice(prefixEnd)

  return (
    <div className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold min-h-[1.5em]">
      <span className="text-gray-500">{displayPrefix}</span>
      <span className={currentLine.color}>{displayMain}</span>
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-neon-cyan ml-1 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)' }}
      />
    </div>
  )
}
