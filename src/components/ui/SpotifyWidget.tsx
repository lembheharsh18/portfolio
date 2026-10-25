'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, X, Disc3, Radio, Sparkles } from 'lucide-react'

interface PlaylistPreset {
  id: string
  name: string
  embedUrl: string
}

const PLAYLISTS: PlaylistPreset[] = [
  {
    id: 'top-hits',
    name: 'Top Hits',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0',
  },
  {
    id: 'lofi-coding',
    name: 'Coding Lo-Fi',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0',
  },
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0',
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXd9rSD9ocvqk?utm_source=generator&theme=0',
  },
]

export default function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activePlaylist, setActivePlaylist] = useState(PLAYLISTS[0])

  return (
    <div className="fixed bottom-24 right-4 sm:right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-3 rounded-2xl overflow-hidden shadow-2xl w-[320px] max-w-[calc(100vw-2rem)]"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <Disc3
                  className="w-4 h-4 animate-spin"
                  style={{
                    color: 'var(--accent-green)',
                    animationDuration: '3s',
                  }}
                />
                <span
                  className="text-[11px] font-mono uppercase tracking-widest font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  SPOTIFY VIBES
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md transition-colors hover:opacity-70 cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Close Spotify player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Playlist Presets Tabs */}
            <div
              className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto scrollbar-none"
              style={{
                borderBottom: '1px solid var(--border)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <Radio className="w-3 h-3 shrink-0 ml-1" style={{ color: 'var(--text-muted)' }} />
              {PLAYLISTS.map((pl) => {
                const isSelected = activePlaylist.id === pl.id
                return (
                  <button
                    key={pl.id}
                    onClick={() => setActivePlaylist(pl)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0"
                    style={{
                      background: isSelected ? 'var(--text-primary)' : 'transparent',
                      color: isSelected ? 'var(--bg)' : 'var(--text-secondary)',
                      border: isSelected ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {pl.name}
                  </button>
                )
              })}
            </div>

            {/* Spotify Embed Player */}
            <div className="relative bg-black/20">
              <iframe
                key={activePlaylist.id}
                src={activePlaylist.embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify Player - ${activePlaylist.name}`}
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer relative group"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          color: isOpen ? 'var(--accent-green)' : 'var(--text-primary)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle Spotify Player"
        title="Play favourite songs on Spotify"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Animated Equalizer bars */}
            <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
              <motion.span
                className="w-1 bg-emerald-400 rounded-full"
                animate={{ height: ['40%', '100%', '30%', '80%', '40%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-1 bg-emerald-400 rounded-full"
                animate={{ height: ['80%', '20%', '100%', '40%', '80%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-1 bg-emerald-400 rounded-full"
                animate={{ height: ['30%', '90%', '50%', '100%', '30%'] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  )
}
