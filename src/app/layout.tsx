import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CommandCenter from '@/components/CommandCenter'
import ScrollToTop from '@/components/ui/ScrollToTop'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harsh Lembhe | AI & DS Engineer | Full Stack Developer',
  description: 'Portfolio of Harsh Lembhe - AI & Data Science Engineer and Full Stack Developer. Explore my projects, skills, and experience.',
  keywords: ['Harsh Lembhe', 'AI Engineer', 'Data Science', 'Full Stack Developer', 'Portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <CommandCenter />
        <main>
          {children}
        </main>
        <ScrollToTop />
      </body>
    </html>
  )
}
