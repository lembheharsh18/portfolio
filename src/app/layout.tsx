import type { Metadata, Viewport } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ThemeProvider from '@/components/ThemeProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://harshlembhe.dev'),
  title: 'Harsh Lembhe | Full Stack Developer & Competitive Programmer',
  description: 'Full Stack Developer & AI enthusiast specializing in RAG pipelines, enterprise backends, and competitive programming. Codeforces Expert (1711), LeetCode Knight (Top 2.3%). B.E. AI & Data Science at PICT, Pune.',
  keywords: ['Full Stack Developer', 'Competitive Programmer', 'React', 'Next.js', 'Spring Boot', 'RAG', 'Codeforces Expert', 'LeetCode Knight', 'PICT Pune', 'AI Data Science'],
  authors: [{ name: 'Harsh Lembhe' }],
  creator: 'Harsh Lembhe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshlembhe.dev',
    siteName: 'Harsh Lembhe Portfolio',
    title: 'Harsh Lembhe | Full Stack Developer & Competitive Programmer',
    description: 'Full Stack Developer & AI enthusiast. Codeforces Expert, LeetCode Knight. B.E. AI & Data Science at PICT, Pune.',
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
    title: 'Harsh Lembhe | Full Stack Developer & Competitive Programmer',
    description: 'Full Stack Developer & AI enthusiast. Codeforces Expert, LeetCode Knight. B.E. AI & Data Science at PICT, Pune.',
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
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'light') document.documentElement.classList.add('light');
            } catch(e) {}
          `
        }} />
      </head>
      <body className="antialiased" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
