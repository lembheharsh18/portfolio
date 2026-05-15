'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, TrendingUp, Trophy, Target, Award, Users, ChevronDown, ChevronUp, BarChart3, Swords } from 'lucide-react'

// ── Types ──
interface LeetCodeData {
  username: string; totalSolved: number; easySolved: number; mediumSolved: number; hardSolved: number
  contestRating: number; contestAttend: number; contestGlobalRanking: number; contestTopPercentage: number; contestBadge: string | null
  contestHistory: { rating: number; title: string; timestamp: number }[]
}
interface CodeforcesData {
  handle: string; rating: number; maxRating: number; rank: string; maxRank: string
  contestsParticipated: number; contribution: number
  ratingHistory: { contestName: string; oldRating: number; newRating: number; timestamp: number }[]
}

// ── Fallback data ──
const FALLBACK_LC: LeetCodeData = {
  username: 'harsh_lembhe18', totalSolved: 1124, easySolved: 257, mediumSolved: 677, hardSolved: 190,
  contestRating: 2068, contestAttend: 46, contestGlobalRanking: 14827, contestTopPercentage: 1.77, contestBadge: 'Knight', contestHistory: []
}
const FALLBACK_CF: CodeforcesData = {
  handle: 'Harsh_Lembhe18', rating: 1607, maxRating: 1713, rank: 'expert', maxRank: 'expert',
  contestsParticipated: 47, contribution: 2, ratingHistory: []
}

// ── Mini Rating Graph ──
function MiniGraph({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null
  const min = Math.min(...data); const max = Math.max(...data)
  const range = max - min || 1; const w = 100; const h = 40
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <defs><linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#grad-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Compare Bar ──
function CompareBar({ label, myVal, theirVal, color, max }: { label: string; myVal: number; theirVal: number; color: string; max: number }) {
  const myPct = Math.min((myVal / max) * 100, 100)
  const theirPct = Math.min((theirVal / max) * 100, 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{label}</span></div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 w-12 text-right">You</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${myPct}%` }} transition={{ duration: 1, delay: 0.3 }} />
          </div>
          <span className="text-xs text-white w-14 text-right font-mono">{myVal.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-orange-400 w-12 text-right">Them</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${theirPct}%` }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
          <span className="text-xs text-white w-14 text-right font-mono">{theirVal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

// ── LeetCode Card ──
function LeetCodeCard({ data, onCompare }: { data: LeetCodeData; onCompare: () => void }) {
  const ratingHistory = data.contestHistory.map(c => c.rating)
  return (
    <motion.div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-orange-500/30 transition-colors" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><span className="text-orange-400 font-bold text-lg">LC</span></div>
          <div><h3 className="font-semibold text-white">LeetCode</h3><p className="text-xs text-gray-500">@{data.username}</p></div>
        </div>
        <a href={`https://leetcode.com/u/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors"><ExternalLink className="w-4 h-4" /></a>
      </div>
      <div className="mb-4"><p className="text-xs text-gray-500">Current Rating</p><p className="text-3xl font-bold text-orange-400">{data.contestRating}</p>
        <div className="flex items-center gap-2 mt-1">{data.contestBadge && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">{data.contestBadge}</span>}<span className="text-xs text-gray-500">Top {data.contestTopPercentage}%</span></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ icon: Target, val: data.totalSolved, label: 'SOLVED' }, { icon: Trophy, val: data.contestGlobalRanking.toLocaleString(), label: 'RANKING' }, { icon: Award, val: data.contestAttend, label: 'CONTESTS' }].map(s => (
          <div key={s.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <s.icon className="w-4 h-4 mx-auto text-gray-500 mb-1" /><p className="text-lg font-bold text-white">{s.val}</p><p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mb-4"><p className="text-xs text-gray-500 mb-2">Problem Breakdown</p>
        <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
          <div className="bg-emerald-500 rounded-l-full" style={{ width: `${(data.easySolved / data.totalSolved) * 100}%` }} />
          <div className="bg-amber-500" style={{ width: `${(data.mediumSolved / data.totalSolved) * 100}%` }} />
          <div className="bg-red-500 rounded-r-full" style={{ width: `${(data.hardSolved / data.totalSolved) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-emerald-400">Easy {data.easySolved}</span><span className="text-amber-400">Medium {data.mediumSolved}</span><span className="text-red-400">Hard {data.hardSolved}</span>
        </div>
      </div>
      {ratingHistory.length > 1 && <div className="mb-4"><p className="text-xs text-gray-500 mb-2">Rating History</p><MiniGraph data={ratingHistory} color="#f97316" /></div>}
      <button onClick={onCompare} className="w-full py-2.5 rounded-xl border border-orange-500/30 text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-colors flex items-center justify-center gap-2"><Swords className="w-4 h-4" />Compare with me</button>
    </motion.div>
  )
}

// ── Codeforces Card ──
function CodeforcesCard({ data, onCompare }: { data: CodeforcesData; onCompare: () => void }) {
  const ratingHistory = data.ratingHistory.map(r => r.newRating)
  const rankColor = data.rank === 'expert' ? '#6366f1' : data.rank === 'candidate master' ? '#a855f7' : data.rank === 'master' ? '#f59e0b' : '#22d3ee'
  return (
    <motion.div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-indigo-500/30 transition-colors" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-indigo-400" /></div>
          <div><h3 className="font-semibold text-white">Codeforces</h3><p className="text-xs text-gray-500">@{data.handle}</p></div>
        </div>
        <a href={`https://codeforces.com/profile/${data.handle}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-400 transition-colors"><ExternalLink className="w-4 h-4" /></a>
      </div>
      <div className="mb-4"><p className="text-xs text-gray-500">Current Rating</p><p className="text-3xl font-bold" style={{ color: rankColor }}>{data.rating}</p>
        <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block capitalize" style={{ background: `${rankColor}20`, color: rankColor }}>{data.rank}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ icon: TrendingUp, val: data.maxRating, label: 'MAX RATING' }, { icon: Trophy, val: data.contestsParticipated, label: 'CONTESTS' }, { icon: Users, val: data.contribution, label: 'CONTRIB' }].map(s => (
          <div key={s.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <s.icon className="w-4 h-4 mx-auto text-gray-500 mb-1" /><p className="text-lg font-bold text-white">{s.val}</p><p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
      {ratingHistory.length > 1 && <div className="mb-4"><p className="text-xs text-gray-500 mb-2">Rating History</p><MiniGraph data={ratingHistory} color="#6366f1" /></div>}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><Award className="w-4 h-4 text-indigo-400" /><span className="text-sm text-gray-400">Max Rank</span></div>
        <span className="text-sm font-semibold capitalize" style={{ color: rankColor }}>{data.maxRank} — {data.maxRating}</span>
      </div>
      <button onClick={onCompare} className="w-full py-2.5 rounded-xl border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 transition-colors flex items-center justify-center gap-2"><Swords className="w-4 h-4" />Compare with me</button>
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
          <motion.div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2"><Swords className="w-5 h-5 text-emerald-400" />Compare Profiles</h3>
            <p className="text-sm text-gray-500 mb-4">Enter a {platform === 'leetcode' ? 'LeetCode' : 'Codeforces'} username to compare</p>
            <div className="flex gap-2 mb-4">
              <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCompare()} placeholder="Enter username..." className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none" />
              <button onClick={handleCompare} disabled={loading} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 disabled:opacity-50 transition-colors">{loading ? '...' : 'Go'}</button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            {platform === 'leetcode' && theirLC && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between text-sm font-semibold mb-4"><span className="text-emerald-400">{myData.lc.username}</span><span className="text-gray-500">vs</span><span className="text-orange-400">{theirLC.username}</span></div>
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
                <div className="flex justify-between text-sm font-semibold mb-4"><span className="text-emerald-400">{myData.cf.handle}</span><span className="text-gray-500">vs</span><span className="text-orange-400">{theirCF.handle}</span></div>
                <CompareBar label="Current Rating" myVal={myData.cf.rating} theirVal={theirCF.rating} color="#6366f1" max={3500} />
                <CompareBar label="Max Rating" myVal={myData.cf.maxRating} theirVal={theirCF.maxRating} color="#6366f1" max={3500} />
                <CompareBar label="Contests" myVal={myData.cf.contestsParticipated} theirVal={theirCF.contestsParticipated} color="#6366f1" max={300} />
              </motion.div>
            )}
            <button onClick={onClose} className="mt-4 w-full py-2 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors">Close</button>
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
  const [compareOpen, setCompareOpen] = useState(false)
  const [comparePlatform, setComparePlatform] = useState<'leetcode' | 'codeforces'>('leetcode')

  useEffect(() => {
    fetch('/api/leetcode/harsh_lembhe18').then(r => r.json()).then(d => { if (d.totalSolved) setLcData(d) }).catch(() => {})
    fetch('/api/codeforces/harsh_lembhe18').then(r => r.json()).then(d => { if (d.rating) setCfData(d) }).catch(() => {})
  }, [])

  const openCompare = (platform: 'leetcode' | 'codeforces') => { setComparePlatform(platform); setCompareOpen(true) }

  return (
    <section id="profiles" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[180px]" />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3"><span className="bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">Competitive Programming</span></h2>
          <p className="text-gray-500 text-sm">Live stats from competitive programming profiles</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <LeetCodeCard data={lcData} onCompare={() => openCompare('leetcode')} />
          <CodeforcesCard data={cfData} onCompare={() => openCompare('codeforces')} />
        </div>
      </div>
      <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} platform={comparePlatform} myData={{ lc: lcData, cf: cfData }} />
    </section>
  )
}
