'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Songs', href: '/songs', icon: '🎵' },
  { label: 'Content', href: '/content', icon: '🎬' },
  { label: 'Ads', href: '/ads', icon: '📢' },
  { label: 'Revenue', href: '/revenue', icon: '💰' },
  { label: 'AI Assistant', href: '/assistant', icon: '🤖' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-artist-600 to-artist-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AO</span>
          </div>
          Artist OS
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-artist-100 dark:bg-artist-900 text-artist-600 dark:text-artist-200 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button className="w-full button-secondary text-sm">Settings</button>
        <button className="w-full button-secondary text-sm">Logout</button>
      </div>
    </aside>
  )
}
