import { NavLink } from 'react-router-dom'
import { Button } from '../shared/ui/primitives/Button.jsx'

const Feature = ({ title, desc }) => (
  <div className="app-card p-5 shadow-sm">
    <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
    <p className="mt-1 text-sm opacity-85">{desc}</p>
  </div>
)

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="app-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Simple CRM that proves core React skills
            </h1>
            <p className="mt-4 text-base opacity-85 sm:text-lg">
              Routing, reusable components, forms + validation, fetching data with
              proper UX states, dashboard CRUD, and a clean Tailwind layout with
              dark mode.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <NavLink to="/customers">
                <Button>Browse Customers</Button>
              </NavLink>
              <NavLink to="/dashboard">
                <Button variant="ghost">Open Dashboard</Button>
              </NavLink>
            </div>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[var(--primary)] p-4 text-white shadow-sm">
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm opacity-90">Pages</div>
            </div>
            <div className="rounded-2xl bg-[var(--card)] p-4 shadow-sm app-border">
              <div className="text-2xl font-bold">CRUD</div>
              <div className="text-sm opacity-80">Dashboard Lite</div>
            </div>
            <div className="rounded-2xl bg-[var(--card)] p-4 shadow-sm app-border">
              <div className="text-2xl font-bold">API</div>
              <div className="text-sm opacity-80">Fetch + states</div>
            </div>
            <div className="rounded-2xl bg-[var(--card)] p-4 shadow-sm app-border">
              <div className="text-2xl font-bold">Dark</div>
              <div className="text-sm opacity-80">Mode</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Feature
          title="Customers list"
          desc="Search, filter, and navigate to dynamic details."
        />
        <Feature
          title="Contact form"
          desc="Controlled inputs with validation and success state."
        />
        <Feature
          title="Dashboard Lite"
          desc="Add/Edit/Delete customers with local persistence."
        />
      </section>

      <section className="rounded-2xl p-6 text-white shadow-sm app-border sm:p-8 bg-[linear-gradient(135deg,var(--primary),var(--accent))]">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to explore?
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-90">
          Start with the customers list (fetched from an API) or jump straight to
          the dashboard to manage records locally.
        </p>
        <div className="mt-6">
          <NavLink to="/customers">
            <Button className="btn-ghost border-white/70 text-white hover:border-white">
              Go to Customers
            </Button>
          </NavLink>
        </div>
      </section>
    </div>
  )
}

