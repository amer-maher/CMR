import { useCallback, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { fetchCustomerById } from '../features/customers/customerApi.js'
import { Loader } from '../shared/ui/feedback/Loader.jsx'
import { ErrorState } from '../shared/ui/feedback/ErrorState.jsx'
import { Button } from '../shared/ui/primitives/Button.jsx'

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
      <div className="text-xs font-medium uppercase tracking-wide opacity-70">
        {label}
      </div>
      <div className="sm:col-span-2">
        <div className="rounded-md bg-[var(--bg)] px-3 py-2 text-sm app-border">
          {value}
        </div>
      </div>
    </div>
  )
}

export function CustomerDetailsPage() {
  const { id } = useParams()
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [customer, setCustomer] = useState(null)

  const load = useCallback(() => {
    const ctrl = new AbortController()
    setStatus('loading')
    setError('')
    fetchCustomerById(id, { signal: ctrl.signal })
      .then((c) => {
        setCustomer(c)
        setStatus('success')
      })
      .catch((e) => {
        if (e?.name === 'AbortError') return
        setError(e?.message || 'Failed to load customer')
        setStatus('error')
      })
    return () => ctrl.abort()
  }, [id])

  useEffect(() => load(), [load])

  if (status === 'loading') return <Loader label="Loading customer…" />
  if (status === 'error') return <ErrorState message={error} onRetry={load} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {customer.name}
            </h1>
            <span className="rounded-full px-2.5 py-1 text-xs font-medium app-border bg-[var(--bg)]">
              {customer.tier}
            </span>
          </div>
          <p className="mt-1 text-sm opacity-85">
            {customer.company} • {customer.city}
          </p>
        </div>
        <div className="flex gap-2">
          <NavLink to="/customers">
            <Button variant="ghost">Back</Button>
          </NavLink>
          <NavLink to="/dashboard">
            <Button>Manage in Dashboard</Button>
          </NavLink>
        </div>
      </div>

      <div className="app-card p-6 shadow-sm">
        <div className="space-y-4">
          <InfoRow label="Email" value={customer.email} />
          <InfoRow label="Phone" value={customer.phone} />
          <InfoRow label="Website" value={customer.website} />
        </div>
      </div>
    </div>
  )
}

