import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { fetchCustomers } from '../features/customers/customerApi.js'
import { Input } from '../shared/ui/primitives/Input.jsx'
import { Select } from '../shared/ui/primitives/Select.jsx'
import { Loader } from '../shared/ui/feedback/Loader.jsx'
import { ErrorState } from '../shared/ui/feedback/ErrorState.jsx'
import { EmptyState } from '../shared/ui/feedback/EmptyState.jsx'

function CustomerCard({ customer }) {
  return (
    <NavLink
      to={`/customers/${customer.id}`}
      className="group app-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold group-hover:text-[var(--primary)]">
            {customer.name}
          </h3>
          <p className="mt-1 text-sm opacity-85">
            {customer.company} • {customer.city}
          </p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-xs font-medium app-border bg-[var(--bg)]">
          {customer.tier}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-1 text-sm opacity-90">
        <div className="truncate">
          <span className="opacity-70">Email: </span>
          {customer.email}
        </div>
        <div className="truncate">
          <span className="opacity-70">Phone: </span>
          {customer.phone}
        </div>
      </div>
    </NavLink>
  )
}

export function CustomersPage() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState('')
  const [tier, setTier] = useState('all')

  const load = () => {
    const ctrl = new AbortController()
    setStatus('loading')
    setError('')
    fetchCustomers({ signal: ctrl.signal })
      .then((data) => {
        setCustomers(data)
        setStatus('success')
      })
      .catch((e) => {
        if (e?.name === 'AbortError') return
        setError(e?.message || 'Failed to load customers')
        setStatus('error')
      })
    return () => ctrl.abort()
  }

  useEffect(() => load(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return customers
      .filter((c) => (tier === 'all' ? true : c.tier === tier))
      .filter((c) => {
        if (!q) return true
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [customers, query, tier])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="mt-1 text-sm opacity-85">
            Data fetched from JSONPlaceholder with UX states.
          </p>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium opacity-85">
              Search
            </label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, email, company…"
            />
          </div>
          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium opacity-85">
              Tier
            </label>
            <Select value={tier} onChange={(e) => setTier(e.target.value)}>
              <option value="all">All</option>
              <option value="Lead">Lead</option>
              <option value="Customer">Customer</option>
              <option value="VIP">VIP</option>
            </Select>
          </div>
        </div>
      </div>

      {status === 'loading' ? <Loader label="Loading customers…" /> : null}
      {status === 'error' ? (
        <ErrorState message={error} onRetry={load} />
      ) : null}

      {status === 'success' && filtered.length === 0 ? (
        <EmptyState
          title="No matching customers"
          description="Try clearing the search query or switching the tier filter."
          actionLabel="Reset filters"
          onAction={() => {
            setQuery('')
            setTier('all')
          }}
        />
      ) : null}

      {status === 'success' && filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((c) => (
            <CustomerCard key={c.id} customer={c} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

