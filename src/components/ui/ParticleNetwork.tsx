'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  pulseOffset: number
}

interface ParticleNetworkProps {
  className?: string
}

export default function ParticleNetwork({ className = '' }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const getTheme = useCallback(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const isLight = getTheme() === 'light'
    // Light mode: very few particles; Dark mode: normal density
    const density = isLight ? 40000 : 15000
    const particleCount = Math.floor((width * height) / density)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = isLight
        ? Math.random() * 1.5 + 0.5
        : Math.random() * 2 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isLight ? 0.2 : 0.5),
        vy: (Math.random() - 0.5) * (isLight ? 0.2 : 0.5),
        radius: baseRadius,
        baseRadius,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    particlesRef.current = particles
  }, [getTheme])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    timeRef.current += 0.02

    const particles = particlesRef.current
    const mouse = mouseRef.current
    const isLight = getTheme() === 'light'

    const connectionDistance = isLight ? 120 : 150
    const mouseConnectionDistance = isLight ? 150 : 200

    // Colors based on theme
    const dotColor = isLight ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.6)'
    const lineColor = isLight ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'
    const sparkleColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)'
    const mouseLineStart = isLight ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'
    const mouseLineEnd = isLight ? 'rgba(80, 80, 80,' : 'rgba(200, 200, 200,'
    const glowColor = isLight ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Breathing effect
      particle.radius = particle.baseRadius + Math.sin(timeRef.current * 2 + particle.pulseOffset) * 0.3

      // Bounce off walls
      if (particle.x < 0 || particle.x > width) particle.vx *= -1
      if (particle.y < 0 || particle.y > height) particle.vy *= -1

      // Keep in bounds
      particle.x = Math.max(0, Math.min(width, particle.x))
      particle.y = Math.max(0, Math.min(height, particle.y))

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.fill()

      // Occasional sparkle flash (subtle in light mode)
      if (!isLight && Math.sin(timeRef.current * 3 + particle.pulseOffset * 5) > 0.97) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = sparkleColor
        ctx.fill()
      }

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j]
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * (isLight ? 0.12 : 0.25)
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `${lineColor}${opacity})`
          ctx.lineWidth = isLight ? 0.3 : 0.5
          ctx.stroke()
        }
      }

      // Connect to mouse (constellation effect)
      const mouseDx = particle.x - mouse.x
      const mouseDy = particle.y - mouse.y
      const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

      if (mouseDistance < mouseConnectionDistance && mouse.x > 0 && mouse.y > 0) {
        const opacity = (1 - mouseDistance / mouseConnectionDistance) * (isLight ? 0.3 : 0.7)
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(mouse.x, mouse.y)

        const gradient = ctx.createLinearGradient(particle.x, particle.y, mouse.x, mouse.y)
        gradient.addColorStop(0, `${mouseLineStart}${opacity})`)
        gradient.addColorStop(1, `${mouseLineEnd}${opacity})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = isLight ? 0.5 : 1
        ctx.stroke()

        // Draw glow at connection point
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `${glowColor}${opacity * 0.4})`
        ctx.fill()
      }
    })
  }, [getTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      initParticles(canvas.width, canvas.height)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const animate = () => {
      drawParticles(ctx, canvas.width, canvas.height)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, drawParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}
