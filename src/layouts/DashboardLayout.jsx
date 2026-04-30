import { Outlet } from 'react-router-dom'
import { Sidebar } from '../shared/ui/dashboard/Sidebar.jsx'
import { Topbar } from '../shared/ui/dashboard/Topbar.jsx'

export function DashboardLayout() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto grid min-h-dvh w-full max-w-[1400px] grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
        <div className="min-w-0">
          <Topbar />
          <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

