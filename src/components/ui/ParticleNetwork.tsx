'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleNetworkProps {
  className?: string
}

export default function ParticleNetwork({ className = '' }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    particlesRef.current = particles
  }, [])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current
    const mouse = mouseRef.current
    const connectionDistance = 150
    const mouseConnectionDistance = 200

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off walls
      if (particle.x < 0 || particle.x > width) particle.vx *= -1
      if (particle.y < 0 || particle.y > height) particle.vy *= -1

      // Keep in bounds
      particle.x = Math.max(0, Math.min(width, particle.x))
      particle.y = Math.max(0, Math.min(height, particle.y))

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)'
      ctx.fill()

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j]
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Connect to mouse (constellation effect)
      const mouseDx = particle.x - mouse.x
      const mouseDy = particle.y - mouse.y
      const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

      if (mouseDistance < mouseConnectionDistance && mouse.x > 0 && mouse.y > 0) {
        const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.8
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(mouse.x, mouse.y)
        
        // Gradient from cyan to purple
        const gradient = ctx.createLinearGradient(particle.x, particle.y, mouse.x, mouse.y)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(112, 0, 255, ${opacity})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw glow at connection point
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${opacity * 0.5})`
        ctx.fill()
      }
    })
  }, [])

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

    const animate = () => {
      drawParticles(ctx, canvas.width, canvas.height)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
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
