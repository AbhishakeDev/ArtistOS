'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-artist-50 to-data-50 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-artist-600 to-artist-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AO</span>
            </div>
            <span className="font-bold text-xl text-artist-600">Artist OS</span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="button-secondary">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-artist-600 to-data-600 bg-clip-text text-transparent">
            Your Personal AI Music Manager
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Artist OS is an intelligent decision-support platform that combines creative data, 
            business analytics, and AI recommendations into a single unified system for independent artists.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="button-primary text-lg px-8 py-3">
              Enter Dashboard
            </Link>
            <button className="button-secondary text-lg px-8 py-3">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Core Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Unified Dashboard',
              description: 'Executive summary of streams, followers, revenue, and ad spend',
              icon: '📊',
            },
            {
              title: 'Song Analytics',
              description: 'Track performance, growth rates, and listener conversion',
              icon: '🎵',
            },
            {
              title: 'Content Intelligence',
              description: 'Analyze Instagram reels, posts, and social media performance',
              icon: '🎬',
            },
            {
              title: 'Ad Analytics',
              description: 'Optimize Meta Ads campaigns and audience targeting',
              icon: '📢',
            },
            {
              title: 'Revenue Tracking',
              description: 'Monitor earnings across platforms and regions',
              icon: '💰',
            },
            {
              title: 'AI Assistant',
              description: 'Get recommendations and insights from your music data',
              icon: '🤖',
            },
          ].map((feature, idx) => (
            <div key={idx} className="card-hover p-6">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>Artist OS v0.1.0 • Intelligent music career management platform</p>
        </div>
      </footer>
    </main>
  )
}
