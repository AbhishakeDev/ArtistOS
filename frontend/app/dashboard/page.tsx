'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data
const chartData = [
  { month: 'Jan', streams: 4000, followers: 2400, revenue: 2400 },
  { month: 'Feb', streams: 3000, followers: 1398, revenue: 2210 },
  { month: 'Mar', streams: 2000, followers: 9800, revenue: 2290 },
  { month: 'Apr', streams: 2780, followers: 3908, revenue: 2000 },
  { month: 'May', streams: 1890, followers: 4800, revenue: 2181 },
  { month: 'Jun', streams: 2390, followers: 3800, revenue: 2500 },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's your music performance at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Streams', value: '2.4M', change: '+12.5%', icon: '📊' },
          { label: 'Followers', value: '18.4K', change: '+8.2%', icon: '👥' },
          { label: 'Revenue', value: '$12,540', change: '+23.1%', icon: '💰' },
          { label: 'Ad Spend', value: '$3,200', change: '-5.4%', icon: '📢' },
        ].map((stat, idx) => (
          <div key={idx} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-growth-600' : 'text-slate-600'}`}>
              {stat.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Streams Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Streams Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="streams" stroke="#8b2be2" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Revenue & Followers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#22c55e" />
              <Bar dataKey="followers" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">Top Performing Songs</h2>
            <div className="space-y-4">
              {[
                { title: 'Song Name', streams: '125K', change: '+15%' },
                { title: 'Another Hit', streams: '98K', change: '+8%' },
                { title: 'Rising Track', streams: '67K', change: '+42%' },
              ].map((song, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{song.streams} streams</p>
                  </div>
                  <span className="badge-success">{song.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full button-primary text-sm">Upload New Release</button>
              <button className="w-full button-secondary text-sm">Create Ad Campaign</button>
              <button className="w-full button-secondary text-sm">View Insights</button>
              <button className="w-full button-secondary text-sm">Ask AI Assistant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
