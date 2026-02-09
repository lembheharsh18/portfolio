import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ui/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://harshlembhe.dev'),
  title: 'Harsh Lembhe | Full Stack Developer & AI Engineer',
  description: 'Full Stack Developer specializing in AI-powered systems, enterprise solutions, and modern web applications. Expert in React, Next.js, Spring Boot, and Generative AI.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'React', 'Next.js', 'Spring Boot', 'GenAI', 'RAG', 'LLMs', 'Web Developer', 'Pune', 'India'],
  authors: [{ name: 'Harsh Lembhe' }],
  creator: 'Harsh Lembhe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshlembhe.dev',
    siteName: 'Harsh Lembhe Portfolio',
    title: 'Harsh Lembhe | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer specializing in AI-powered systems and enterprise solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harsh Lembhe - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Lembhe | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer specializing in AI-powered systems and enterprise solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-void text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <ScrollToTop />
      </body>
    </html>
  )
}
