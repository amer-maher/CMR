import { NavLink } from 'react-router-dom'

const navItem =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold opacity-90 transition hover:opacity-100 hover:bg-[var(--card)]'

const navActive = 'bg-[var(--card)] opacity-100 app-border'

function Item({ to, label, hint }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] opacity-80" />
      <div className="min-w-0">
        <div className="truncate">{label}</div>
        {hint ? (
          <div className="truncate text-xs opacity-65">{hint}</div>
        ) : null}
      </div>
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <div className="sticky top-0 flex h-dvh flex-col gap-5 border-r border-[var(--border)] bg-[var(--bg)] px-4 py-6">
      <div className="flex items-center gap-2 px-2">
        <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--accent))]" />
        <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-tight">
            NAQLY <span className="opacity-70">CRM</span>
          </div>
          <div className="text-xs opacity-70">Dashboard</div>
        </div>
      </div>

      <nav className="grid gap-1">
        <Item to="/dashboard" label="Dashboard" hint="Overview" />
        <Item to="/dashboard/customers" label="Customers" hint="Directory" />
        <Item to="/dashboard/leads" label="Leads" hint="Pipeline" />
        <Item to="/dashboard/deals" label="Deals" hint="Opportunities" />
        <Item to="/dashboard/tasks" label="Tasks" hint="Upcoming" />
        <Item to="/dashboard/reports" label="Reports" hint="Analytics" />
        <Item to="/dashboard/settings" label="Settings" hint="Workspace" />
      </nav>

      <div className="mt-auto rounded-2xl p-4 app-card-soft">
        <div className="text-sm font-bold">Upgrade to Pro</div>
        <div className="mt-1 text-xs opacity-75">
          Unlock extra features and boost your sales.
        </div>
        <button className="btn btn-primary ring-focus mt-4 w-full">
          Upgrade now
        </button>
      </div>
    </div>
  )
}

