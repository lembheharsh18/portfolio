'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink, TrendingUp, Trophy, Target, Award, Users, BarChart3, Swords, Clock, Github, GitCommit } from 'lucide-react'

// ── Types ──
interface LeetCodeData {
  username: string; totalSolved: number; easySolved: number; mediumSolved: number; hardSolved: number
  contestRating: number; contestAttend: number; contestGlobalRanking: number; contestTopPercentage: number; contestBadge: string | null
  contestHistory: { rating: number; title: string; timestamp: number }[]
  recentSubmissions: { title: string; timestamp: number | null; lang: string }[]
}
interface CodeforcesData {
  handle: string; rating: number; maxRating: number; rank: string; maxRank: string
  contestsParticipated: number; contribution: number
  ratingHistory: { contestName: string; oldRating: number; newRating: number; timestamp: number }[]
}
interface GitHubData {
  username: string; latestRepo: string | null; yearlyCommits: number
  heatmap: number[][]; publicRepos: number
}

// ── Fallback data ──
const FALLBACK_LC: LeetCodeData = {
  username: 'harsh_lembhe18', totalSolved: 1124, easySolved: 257, mediumSolved: 677, hardSolved: 190,
  contestRating: 2068, contestAttend: 46, contestGlobalRanking: 14827, contestTopPercentage: 1.77, contestBadge: 'Knight',
  contestHistory: [], recentSubmissions: []
}
const FALLBACK_CF: CodeforcesData = {
  handle: 'Harsh_Lembhe18', rating: 1607, maxRating: 1713, rank: 'expert', maxRank: 'expert',
  contestsParticipated: 47, contribution: 2, ratingHistory: []
}
const FALLBACK_GH: GitHubData = {
  username: 'lembheharsh18', latestRepo: 'portfolio', yearlyCommits: 405,
  heatmap: Array(15).fill(null).map(() => Array(7).fill(0).map(() => Math.floor(Math.random() * 5))),
  publicRepos: 12
}

const intensityColors = [
  'bg-gray-800',
  'bg-green-900',
  'bg-green-700',
  'bg-green-500',
  'bg-green-400',
]

const intensityColorsLight = [
  'bg-gray-200',
  'bg-green-200',
  'bg-green-400',
  'bg-green-500',
  'bg-green-600',
]

// ── Mini Rating Graph ──
function MiniGraph({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null
  const min = Math.min(...data); const max = Math.max(...data)
  const range = max - min || 1; const w = 200; const h = 50
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs><linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Compare Bar ──
function CompareBar({ label, myVal, theirVal, color, max }: { label: string; myVal: number; theirVal: number; color: string; max: number }) {
  const myPct = Math.min((myVal / max) * 100, 100)
  const theirPct = Math.min((theirVal / max) * 100, 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}><span>{label}</span></div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 w-12 text-right">You</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${myPct}%` }} transition={{ duration: 1, delay: 0.3 }} />
          </div>
          <span className="text-xs w-14 text-right font-mono" style={{ color: 'var(--text-primary)' }}>{myVal.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-orange-400 w-12 text-right">Them</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div className="h-full rounded-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${theirPct}%` }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
          <span className="text-xs w-14 text-right font-mono" style={{ color: 'var(--text-primary)' }}>{theirVal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

// ── LeetCode Card (matching reference) ──
function LeetCodeCard({ data, onCompare }: { data: LeetCodeData; onCompare: () => void }) {
  const ratingHistory = data.contestHistory.map(c => c.rating)

  const formatDate = (ts: number | null) => {
    if (!ts) return ''
    const d = new Date(ts * 1000)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.div
      className="rounded-2xl p-5 md:p-6"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-lg" style={{ color: 'var(--accent-green)' }}>⚡</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{data.username}</span>
        </div>
        <a href={`https://leetcode.com/u/${data.username}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} className="hover:opacity-70 transition-opacity">
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Big rating */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{data.contestRating}</p>
          <p className="text-xs uppercase tracking-wider mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>CONTEST RATING</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <Trophy className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>#{data.contestGlobalRanking.toLocaleString()}</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Global Rank</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <Target className="w-3.5 h-3.5" style={{ color: 'var(--accent-green)' }} />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{data.totalSolved}</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Problems Solved</span>
          </div>
        </div>
      </div>

      {/* Problem breakdown bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5 mb-1">
        <div className="bg-emerald-500 rounded-l-full" style={{ width: `${(data.easySolved / data.totalSolved) * 100}%` }} />
        <div className="bg-amber-500" style={{ width: `${(data.mediumSolved / data.totalSolved) * 100}%` }} />
        <div className="bg-red-500 rounded-r-full" style={{ width: `${(data.hardSolved / data.totalSolved) * 100}%` }} />
      </div>
      <div className="flex gap-4 text-xs mb-5">
        <span className="text-emerald-400">{data.easySolved}E</span>
        <span className="text-amber-400">{data.mediumSolved}M</span>
        <span className="text-red-400">{data.hardSolved}H</span>
      </div>

      {/* Recent Activity */}
      {data.recentSubmissions && data.recentSubmissions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Recent Activity</span>
          </div>
          <div className="space-y-2">
            {data.recentSubmissions.slice(0, 3).map((sub, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{sub.title}</span>
                <span className="text-xs shrink-0 ml-2" style={{ color: 'var(--text-muted)' }}>{formatDate(sub.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rating graph */}
      {ratingHistory.length > 1 && (
        <div className="mt-4">
          <MiniGraph data={ratingHistory} color="#22c55e" />
        </div>
      )}

      {/* Compare button */}
      <button
        onClick={onCompare}
        className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <Swords className="w-4 h-4" />Compare with me
      </button>
    </motion.div>
  )
}

// ── GitHub Card (matching reference) ──
function GitHubCard({ data }: { data: GitHubData }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayCommits, setDisplayCommits] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLight(document.documentElement.classList.contains('light'))
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = Date.now()
    const target = data.yearlyCommits

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayCommits(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [isInView, data.yearlyCommits])

  const colors = isLight ? intensityColorsLight : intensityColors

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Github className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{data.username}</span>
      </div>

      {/* Heatmap + Stats */}
      <div className="flex gap-5">
        {/* Contribution Heatmap */}
        <div className="flex-1">
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${data.heatmap.length}, 1fr)` }}>
            {data.heatmap.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((intensity, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${colors[intensity]}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={mounted && isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005 }}
                    style={intensity > 2 ? { boxShadow: '0 0 5px rgba(74, 222, 128, 0.5)' } : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end justify-center shrink-0">
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>YEARLY TOTAL</p>
          <div className="font-heading text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {displayCommits}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>commits</div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>LATEST PUSH</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{data.latestRepo || 'N/A'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Codeforces Card (compact, matching style) ──
function CodeforcesCard({ data, onCompare }: { data: CodeforcesData; onCompare: () => void }) {
  const ratingHistory = data.ratingHistory.map(r => r.newRating)
  const rankColor = data.rank === 'expert' ? '#6366f1' : data.rank === 'candidate master' ? '#a855f7' : data.rank === 'master' ? '#f59e0b' : '#22d3ee'

  return (
    <motion.div
      className="rounded-2xl p-5 md:p-6"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5" style={{ color: rankColor }} />
          <div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Codeforces</span>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@{data.handle}</p>
          </div>
        </div>
        <a href={`https://codeforces.com/profile/${data.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} className="hover:opacity-70 transition-opacity">
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-3xl font-bold" style={{ color: rankColor }}>{data.rating}</p>
          <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block capitalize" style={{ background: `${rankColor}20`, color: rankColor }}>{data.rank}</span>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{data.maxRating}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Max Rating</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{data.contestsParticipated}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Contests</p>
          </div>
        </div>
      </div>

      {ratingHistory.length > 1 && (
        <div className="mb-4">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Rating History</p>
          <MiniGraph data={ratingHistory} color={rankColor} />
        </div>
      )}

      <button
        onClick={onCompare}
        className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <Swords className="w-4 h-4" />Compare with me
      </button>
    </motion.div>
  )
}

// ── Compare Modal ──
function CompareModal({ isOpen, onClose, platform, myData }: {
  isOpen: boolean; onClose: () => void; platform: 'leetcode' | 'codeforces'
  myData: { lc: LeetCodeData; cf: CodeforcesData }
}) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [theirLC, setTheirLC] = useState<LeetCodeData | null>(null)
  const [theirCF, setTheirCF] = useState<CodeforcesData | null>(null)

  const handleCompare = async () => {
    if (!username.trim()) return
    setLoading(true); setError(''); setTheirLC(null); setTheirCF(null)
    try {
      const res = await fetch(`/api/${platform}/${username.trim()}`)
      if (!res.ok) throw new Error('User not found')
      const data = await res.json()
      if (platform === 'leetcode') setTheirLC(data)
      else setTheirCF(data)
    } catch { setError(`Could not find "${username}" on ${platform === 'leetcode' ? 'LeetCode' : 'Codeforces'}`) }
    finally { setLoading(false) }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          >
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Swords className="w-5 h-5 text-emerald-400" />Compare Profiles
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Enter a {platform === 'leetcode' ? 'LeetCode' : 'Codeforces'} username to compare</p>
            <div className="flex gap-2 mb-4">
              <input
                value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCompare()}
                placeholder="Enter username..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm placeholder-gray-500 focus:outline-none"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <button onClick={handleCompare} disabled={loading} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 disabled:opacity-50 transition-colors">{loading ? '...' : 'Go'}</button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            {platform === 'leetcode' && theirLC && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between text-sm font-semibold mb-4"><span className="text-emerald-400">{myData.lc.username}</span><span style={{ color: 'var(--text-muted)' }}>vs</span><span className="text-orange-400">{theirLC.username}</span></div>
                <CompareBar label="Rating" myVal={myData.lc.contestRating} theirVal={theirLC.contestRating} color="#10b981" max={3500} />
                <CompareBar label="Problems Solved" myVal={myData.lc.totalSolved} theirVal={theirLC.totalSolved} color="#10b981" max={3500} />
                <CompareBar label="Easy" myVal={myData.lc.easySolved} theirVal={theirLC.easySolved} color="#10b981" max={800} />
                <CompareBar label="Medium" myVal={myData.lc.mediumSolved} theirVal={theirLC.mediumSolved} color="#f59e0b" max={2000} />
                <CompareBar label="Hard" myVal={myData.lc.hardSolved} theirVal={theirLC.hardSolved} color="#ef4444" max={800} />
                <CompareBar label="Contests" myVal={myData.lc.contestAttend} theirVal={theirLC.contestAttend} color="#10b981" max={200} />
              </motion.div>
            )}
            {platform === 'codeforces' && theirCF && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between text-sm font-semibold mb-4"><span className="text-emerald-400">{myData.cf.handle}</span><span style={{ color: 'var(--text-muted)' }}>vs</span><span className="text-orange-400">{theirCF.handle}</span></div>
                <CompareBar label="Current Rating" myVal={myData.cf.rating} theirVal={theirCF.rating} color="#6366f1" max={3500} />
                <CompareBar label="Max Rating" myVal={myData.cf.maxRating} theirVal={theirCF.maxRating} color="#6366f1" max={3500} />
                <CompareBar label="Contests" myVal={myData.cf.contestsParticipated} theirVal={theirCF.contestsParticipated} color="#6366f1" max={300} />
              </motion.div>
            )}
            <button onClick={onClose} className="mt-4 w-full py-2 rounded-xl text-sm transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main Section ──
export default function CodingProfilesSection() {
  const [lcData, setLcData] = useState<LeetCodeData>(FALLBACK_LC)
  const [cfData, setCfData] = useState<CodeforcesData>(FALLBACK_CF)
  const [ghData, setGhData] = useState<GitHubData>(FALLBACK_GH)
  const [compareOpen, setCompareOpen] = useState(false)
  const [comparePlatform, setComparePlatform] = useState<'leetcode' | 'codeforces'>('leetcode')

  useEffect(() => {
    fetch('/api/leetcode/harsh_lembhe18').then(r => r.json()).then(d => { if (d.totalSolved) setLcData(d) }).catch(() => {})
    fetch('/api/codeforces/Harsh_Lembhe18').then(r => r.json()).then(d => { if (d.rating) setCfData(d) }).catch(() => {})
    fetch('/api/github/lembheharsh18').then(r => r.json()).then(d => { if (d.username) setGhData(d) }).catch(() => {})
  }, [])

  const openCompare = (platform: 'leetcode' | 'codeforces') => { setComparePlatform(platform); setCompareOpen(true) }

  return (
    <section id="profiles" className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Competitive Programming</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Live stats from competitive programming profiles</p>
        </motion.div>

        {/* Top row: LeetCode + GitHub side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <LeetCodeCard data={lcData} onCompare={() => openCompare('leetcode')} />
          <GitHubCard data={ghData} />
        </div>

        {/* Bottom: Codeforces full width */}
        <CodeforcesCard data={cfData} onCompare={() => openCompare('codeforces')} />
      </div>
      <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} platform={comparePlatform} myData={{ lc: lcData, cf: cfData }} />
    </section>
  )
}
