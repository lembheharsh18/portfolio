'use client'

import { motion } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CyberBreachSection from '@/components/sections/CyberBreachSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <CyberBreachSection />
        <ProjectsSection />
        <AchievementsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  )
}
