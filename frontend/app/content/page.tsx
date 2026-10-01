'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Media {
  id: string
  media_type: string
  caption: string
  timestamp: string
  permalink: string
  thumbnail_url: string | null
  impressions: number
  reach: number
  likes: number
  comments: number
  shares: number
  saves: number
  video_views: number
}

interface Account {
  impressions: number
  reach: number
  profile_views: number
  follower_count: number
  follower_change: number | null
  follower_change_pct: number | null
  avg_engagement_rate: number | null
}

interface ContentData {
  account: Account
  media: Media[]
  total_reach: number
  total_impressions: number
  best_post_id: string | null
  is_placeholder: boolean
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function engagementRate(m: Media): string {
  if (m.reach === 0) return '0%'
  const rate = (m.likes + m.comments + m.shares + m.saves) / m.reach * 100
  return `${rate.toFixed(1)}%`
}

function formatDate(ts: string): string {
  try {
    return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  } catch {
    return ts
  }
}

const TYPE_BADGE: Record<string, string> = {
  REEL: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  IMAGE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  VIDEO: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  CAROUSEL_ALBUM: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function ContentPage() {
  const [data, setData] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/api/content`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Could not reach backend. Is it running?'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8"><h1 className="text-3xl font-bold mb-2">Content</h1><div className="card p-8 text-center text-slate-400">Loading…</div></div>
  if (error || !data) return <div className="p-8"><h1 className="text-3xl font-bold mb-2">Content</h1><div className="card p-8 text-center text-red-400">{error || 'No data'}</div></div>

  const chartData = data.media.map(m => ({
    name: formatDate(m.timestamp),
    Reach: m.reach,
    Saves: m.saves,
    Shares: m.shares,
  }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Content Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Instagram performance — Reels, Posts, Stories</p>
        </div>
        {data.is_placeholder && (
          <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full font-medium">
            Placeholder data — add Instagram credentials to .env
          </span>
        )}
      </div>

      {/* Account KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Followers', value: formatNum(data.account.follower_count), sub: data.account.follower_change_pct != null ? `${data.account.follower_change_pct > 0 ? '+' : ''}${data.account.follower_change_pct}% this period` : undefined },
          { label: 'Total Reach', value: formatNum(data.total_reach) },
          { label: 'Total Impressions', value: formatNum(data.total_impressions) },
          { label: 'Avg Engagement', value: data.account.avg_engagement_rate != null ? `${data.account.avg_engagement_rate}%` : '—' },
        ].map((kpi, i) => (
          <div key={i} className="card p-5">
            <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-green-500 mt-1">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      {/* Reach + Saves chart */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Reach & Saves by Post</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => formatNum(v)} />
            <Tooltip formatter={(v: number) => formatNum(v)} />
            <Legend />
            <Bar dataKey="Reach" fill="#8b2be2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Saves" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Shares" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Post cards */}
      <div>
        <h2 className="text-lg font-bold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.media.map(m => {
            const isBest = m.id === data.best_post_id
            return (
              <div key={m.id} className={`card p-5 relative ${isBest ? 'ring-2 ring-purple-500' : ''}`}>
                {isBest && (
                  <span className="absolute top-3 right-3 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-medium">Top Post</span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_BADGE[m.media_type] || TYPE_BADGE.IMAGE}`}>
                    {m.media_type}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(m.timestamp)}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{m.caption || 'No caption'}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Reach', value: formatNum(m.reach) },
                    { label: 'Likes', value: formatNum(m.likes) },
                    { label: 'Saves', value: formatNum(m.saves) },
                    { label: 'Comments', value: formatNum(m.comments) },
                    { label: 'Shares', value: formatNum(m.shares) },
                    { label: 'Eng. Rate', value: engagementRate(m) },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                      <p className="text-xs text-slate-400 mb-0.5">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                {m.media_type === 'REEL' && m.video_views > 0 && (
                  <p className="text-xs text-slate-400 mt-3 text-center">{formatNum(m.video_views)} video views</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
