'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TopTrack {
  name: string
  streams: number | null
  streams_change_pct: number | null
}

interface DashboardData {
  total_streams: number
  spotify_followers: number
  spotify_followers_change_pct: number | null
  monthly_listeners: number | null
  instagram_followers: number
  instagram_follower_change_pct: number | null
  instagram_reach: number
  top_tracks: TopTrack[]
  is_placeholder: boolean
}

function formatNum(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function pctLabel(v: number | null | undefined): { text: string; positive: boolean } | null {
  if (v == null) return null
  return { text: `${v > 0 ? '+' : ''}${v}% vs last period`, positive: v >= 0 }
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/api/dashboard`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Backend offline — run: cd backend && python -m uvicorn app.main:app --reload --port 8000'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <div className="card p-8 text-center text-slate-400">Loading your data…</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <div className="card p-6 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400 font-medium mb-1">Backend not reachable</p>
          <p className="text-sm text-red-500 dark:text-red-300 font-mono">{error}</p>
        </div>
      </div>
    )
  }

  const kpis = [
    {
      label: 'Total Streams',
      value: formatNum(data.total_streams),
      sub: null,
      icon: '🎵',
      href: '/songs',
    },
    {
      label: 'Spotify Followers',
      value: formatNum(data.spotify_followers),
      sub: pctLabel(data.spotify_followers_change_pct),
      icon: '🎧',
      href: '/songs',
    },
    {
      label: 'Instagram Followers',
      value: formatNum(data.instagram_followers),
      sub: pctLabel(data.instagram_follower_change_pct),
      icon: '📸',
      href: '/content',
    },
    {
      label: 'Instagram Reach',
      value: formatNum(data.instagram_reach),
      sub: null,
      icon: '📡',
      href: '/content',
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400">Your music career at a glance</p>
        </div>
        {data.is_placeholder && (
          <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full font-medium">
            Placeholder data — add API credentials to .env
          </span>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <Link key={i} href={kpi.href} className="card p-6 hover:ring-2 hover:ring-purple-400 transition-all cursor-pointer block">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
              </div>
              <span className="text-3xl">{kpi.icon}</span>
            </div>
            {kpi.sub && (
              <p className={`text-sm font-medium ${kpi.sub.positive ? 'text-green-500' : 'text-red-400'}`}>
                {kpi.sub.text}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top tracks */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Top Performing Songs</h2>
            <Link href="/songs" className="text-sm text-purple-600 hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {data.top_tracks.length === 0 && (
              <p className="text-slate-400 text-sm">No track data yet.</p>
            )}
            {data.top_tracks.map((track, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm w-5">{idx + 1}</span>
                  <div>
                    <p className="font-medium text-sm">{track.name}</p>
                    <p className="text-xs text-slate-400">{formatNum(track.streams)} streams</p>
                  </div>
                </div>
                {track.streams_change_pct != null && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${track.streams_change_pct >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {track.streams_change_pct > 0 ? '+' : ''}{track.streams_change_pct}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/songs" className="w-full button-primary text-sm flex items-center justify-center gap-2">
              🎵 View Song Analytics
            </Link>
            <Link href="/content" className="w-full button-secondary text-sm flex items-center justify-center gap-2">
              📸 View Content Analytics
            </Link>
            <Link href="/ads" className="w-full button-secondary text-sm flex items-center justify-center gap-2">
              📢 Manage Ad Campaigns
            </Link>
            <Link href="/assistant" className="w-full button-secondary text-sm flex items-center justify-center gap-2">
              🤖 Ask AI Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
