import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../theme/useTheme.js'
import { Button } from './primitives/Button.jsx'

const linkBase =
  'rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-[var(--card)] hover:text-[var(--text)]'

const linkActive = 'bg-[var(--card)] text-[var(--text)] app-border'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)] shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="text-base font-bold tracking-tight text-[var(--text)]"
            onClick={() => setOpen(false)}
          >
            CRM
          </NavLink>
          <span className="hidden text-xs opacity-80 sm:inline">
            React + Tailwind
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ''}`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost ring-focus md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
          <NavLink
            to="/login"
            className="hidden text-sm opacity-85 hover:opacity-100 sm:inline"
            onClick={() => setOpen(false)}
          >
            Login
          </NavLink>
          <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="grid gap-2">
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ''} w-full`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/customers"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ''} w-full`
                }
              >
                Customers
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ''} w-full`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ''} w-full`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={`${linkBase} w-full`}
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

