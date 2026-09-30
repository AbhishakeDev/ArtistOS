'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Track {
  id: string
  name: string
  album: string
  release_date: string
  duration_ms: number
  popularity: number
  spotify_url: string
  image_url: string | null
  streams: number | null
  streams_change_pct: number | null
  saves: number | null
  playlist_adds: number | null
}

interface Artist {
  id: string
  name: string
  followers: number
  popularity: number
  genres: string[]
  monthly_listeners: number | null
  followers_change_pct: number | null
}

interface SongsData {
  artist: Artist
  tracks: Track[]
  total_streams: number
  is_placeholder: boolean
}

function formatNum(n: number | null): string {
  if (n === null || n === undefined) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function formatMs(ms: number): string {
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function SongsPage() {
  const [data, setData] = useState<SongsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/api/songs`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Could not reach backend. Is it running?'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Songs</h1>
        <div className="card p-8 text-center text-slate-400">Loading…</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Songs</h1>
        <div className="card p-8 text-center text-red-400">{error || 'No data'}</div>
      </div>
    )
  }

  const chartData = data.tracks.map(t => ({
    name: t.name.length > 14 ? t.name.slice(0, 14) + '…' : t.name,
    streams: t.streams ?? 0,
    saves: t.saves ?? 0,
    playlist_adds: t.playlist_adds ?? 0,
  }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Songs</h1>
          <p className="text-slate-500 dark:text-slate-400">Spotify track performance</p>
        </div>
        {data.is_placeholder && (
          <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full font-medium">
            Placeholder data — add Spotify credentials to .env
          </span>
        )}
      </div>

      {/* Artist KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Streams', value: formatNum(data.total_streams) },
          { label: 'Followers', value: formatNum(data.artist.followers), sub: data.artist.followers_change_pct != null ? `${data.artist.followers_change_pct > 0 ? '+' : ''}${data.artist.followers_change_pct}%` : undefined },
          { label: 'Monthly Listeners', value: formatNum(data.artist.monthly_listeners) },
          { label: 'Artist Popularity', value: `${data.artist.popularity}/100` },
        ].map((kpi, i) => (
          <div key={i} className="card p-5">
            <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-green-500 mt-1">{kpi.sub} vs last month</p>}
          </div>
        ))}
      </div>

      {/* Streams chart */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Streams by Track</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => formatNum(v)} />
            <Tooltip formatter={(v: number) => formatNum(v)} />
            <Bar dataKey="streams" fill="#8b2be2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Track table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold">Track List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Album</th>
                <th className="px-6 py-3 font-medium text-right">Streams</th>
                <th className="px-6 py-3 font-medium text-right">Change</th>
                <th className="px-6 py-3 font-medium text-right">Saves</th>
                <th className="px-6 py-3 font-medium text-right">Playlist Adds</th>
                <th className="px-6 py-3 font-medium text-right">Duration</th>
                <th className="px-6 py-3 font-medium text-right">Popularity</th>
              </tr>
            </thead>
            <tbody>
              {data.tracks.map((track, idx) => (
                <tr key={track.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <a href={track.spotify_url !== '#' ? track.spotify_url : undefined} target="_blank" rel="noreferrer" className="font-medium hover:text-purple-600 transition-colors">
                      {track.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{track.album}</td>
                  <td className="px-6 py-4 text-right font-medium">{formatNum(track.streams)}</td>
                  <td className="px-6 py-4 text-right">
                    {track.streams_change_pct != null ? (
                      <span className={track.streams_change_pct >= 0 ? 'text-green-500' : 'text-red-400'}>
                        {track.streams_change_pct > 0 ? '+' : ''}{track.streams_change_pct}%
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">{formatNum(track.saves)}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{formatNum(track.playlist_adds)}</td>
                  <td className="px-6 py-4 text-right text-slate-400">{formatMs(track.duration_ms)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${track.popularity}%` }} />
                      </div>
                      <span className="text-slate-400 text-xs">{track.popularity}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
