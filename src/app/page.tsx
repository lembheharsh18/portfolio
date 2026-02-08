'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import CyberBreachSection from '@/components/sections/CyberBreachSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StatsSection />
      <CyberBreachSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </motion.div>
  )
}
