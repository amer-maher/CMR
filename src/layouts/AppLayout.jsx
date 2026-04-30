import { Outlet } from 'react-router-dom'
import { Navbar } from '../shared/ui/Navbar.jsx'
import { Footer } from '../shared/ui/Footer.jsx'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

