import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../theme/useTheme.js'
import { Button } from '../primitives/Button.jsx'

export function Topbar() {
  const { theme, toggleTheme } = useTheme()
  const [q, setQ] = useState('')

  const todayRange = useMemo(() => {
    const d = new Date()
    const month = d.toLocaleString('en', { month: 'short' })
    const year = d.getFullYear()
    return `${month} 1 - ${month} ${new Date(year, d.getMonth() + 1, 0).getDate()}, ${year}`
  }, [])

  return (
    <div className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <NavLink
            to="/"
            className="btn btn-ghost ring-focus hidden md:inline-flex"
          >
            Home
          </NavLink>

          <div className="relative hidden min-w-[280px] max-w-[520px] flex-1 sm:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search anything…"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm ring-focus"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs opacity-60">
              ⌘K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs opacity-80 sm:block">
            {todayRange}
          </div>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
          <Button className="hidden sm:inline-flex">+ Add New</Button>
        </div>
      </div>
    </div>
  )
}

