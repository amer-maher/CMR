import { useEffect, useMemo, useState } from 'react'
import { fetchCustomers } from '../features/customers/customerApi.js'
import { Button } from '../shared/ui/primitives/Button.jsx'
import { Input } from '../shared/ui/primitives/Input.jsx'
import { Select } from '../shared/ui/primitives/Select.jsx'
import { Modal } from '../shared/ui/overlay/Modal.jsx'
import { Loader } from '../shared/ui/feedback/Loader.jsx'
import { ErrorState } from '../shared/ui/feedback/ErrorState.jsx'
import { EmptyState } from '../shared/ui/feedback/EmptyState.jsx'

const STORAGE_KEY = 'crm_dashboard_customers_v1'

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function saveStored(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function randomId() {
  return `local_${Math.random().toString(16).slice(2)}`
}

function CustomerForm({ value, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
          Name
        </label>
        <Input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Customer name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? (
          <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
          Email
        </label>
        <Input
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          placeholder="email@company.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? (
          <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
          Tier
        </label>
        <Select
          value={value.tier}
          onChange={(e) => onChange({ ...value, tier: e.target.value })}
        >
          <option value="Lead">Lead</option>
          <option value="Customer">Customer</option>
          <option value="VIP">VIP</option>
        </Select>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
          Company
        </label>
        <Input
          value={value.company}
          onChange={(e) => onChange({ ...value, company: e.target.value })}
          placeholder="Company name"
        />
      </div>
    </div>
  )
}

function validateForm(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Name is required'
  if (!v.email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = 'Invalid email'
  return errors
}

function StatCard({ title, value, delta, tone = 'primary' }) {
  const tones = {
    primary: 'bg-[var(--primary)]/15 text-[var(--text)]',
    accent: 'bg-[var(--accent)]/15 text-[var(--text)]',
    success: 'bg-emerald-500/15 text-[var(--text)]',
    warning: 'bg-amber-500/15 text-[var(--text)]',
  }

  return (
    <div className="app-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
            {title}
          </div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">
            {value}
          </div>
        </div>
        <div className={`rounded-2xl px-3 py-2 text-xs font-bold ${tones[tone]}`}>
          {delta}
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)] app-border">
        <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
      </div>
    </div>
  )
}

function Sparkline() {
  return (
    <svg viewBox="0 0 600 180" className="h-40 w-full">
      <defs>
        <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 140 C 60 150, 80 80, 140 95 C 200 110, 210 60, 270 70 C 330 80, 350 30, 410 50 C 470 70, 480 20, 540 35 C 575 45, 590 30, 600 30 L 600 180 L 0 180 Z"
        fill="url(#fill)"
      />
      <path
        d="M 0 140 C 60 150, 80 80, 140 95 C 200 110, 210 60, 270 70 C 330 80, 350 30, 410 50 C 470 70, 480 20, 540 35 C 575 45, 590 30, 600 30"
        stroke="url(#line)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="600" cy="30" r="6" fill="var(--accent)" />
    </svg>
  )
}

function PipelineDonut({ total }) {
  const segments = [
    { label: 'Lead', value: 32, color: 'var(--accent)' },
    { label: 'Qualified', value: 45, color: 'var(--primary)' },
    { label: 'Proposal', value: 28, color: '#22c55e' },
    { label: 'Negotiation', value: 18, color: '#f59e0b' },
    { label: 'Closed Won', value: 13, color: '#38bdf8' },
  ]

  const sum = segments.reduce((a, s) => a + s.value, 0) || 1
  let acc = 0
  const stops = segments
    .map((s) => {
      const start = (acc / sum) * 100
      acc += s.value
      const end = (acc / sum) * 100
      return `${s.color} ${start}% ${end}%`
    })
    .join(', ')

  return (
    <div className="app-card p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-extrabold">Deals pipeline</div>
        <div className="text-xs opacity-70">This month</div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="mx-auto grid h-52 w-52 place-items-center rounded-full app-border bg-[var(--bg)]">
          <div
            className="grid h-44 w-44 place-items-center rounded-full"
            style={{ background: `conic-gradient(${stops})` }}
          >
            <div className="grid h-28 w-28 place-items-center rounded-full bg-[var(--card)] app-border">
              <div className="text-center">
                <div className="text-2xl font-extrabold">{total}</div>
                <div className="text-xs opacity-70">Total deals</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="opacity-90">{s.label}</span>
              </div>
              <div className="text-xs opacity-75">
                {s.value} ({Math.round((s.value / sum) * 100)}%)
              </div>
            </div>
          ))}
          <div className="pt-2 text-xs opacity-70">
            Total value: <span className="font-semibold text-[var(--accent)]">$245,678</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const [items, setItems] = useState(() => loadStored() || [])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    tier: 'Lead',
    company: '',
  })
  const [formErrors, setFormErrors] = useState({})

  // Seed local dashboard data if empty (optional nice UX)
  useEffect(() => {
    if (items.length > 0) return
    const stored = loadStored()
    if (stored?.length) return

    const ctrl = new AbortController()
    setStatus('loading')
    fetchCustomers({ signal: ctrl.signal })
      .then((data) => {
        const seed = data.slice(0, 6).map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          tier: c.tier,
          company: c.company,
        }))
        setItems(seed)
        saveStored(seed)
        setStatus('success')
      })
      .catch((e) => {
        if (e?.name === 'AbortError') return
        setError(e?.message || 'Failed to seed dashboard data')
        setStatus('error')
      })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveStored(items)
  }, [items])

  const recent = useMemo(() => items.slice(0, 6), [items])

  const stats = useMemo(() => {
    const totalCustomers = items.length
    const leads = items.filter((x) => x.tier === 'Lead').length
    const deals = Math.max(12, Math.round(totalCustomers * 1.3))
    const revenue = 45678
    return { totalCustomers, leads, deals, revenue }
  }, [items])

  const tasks = useMemo(
    () => [
      { title: 'Follow up with Sarah Johnson', hint: 'Call', when: 'Today 10:00 AM' },
      { title: 'Send proposal to Acme Corp', hint: 'Email', when: 'Today 1:30 PM' },
      { title: 'Meeting with TechSol Ltd.', hint: 'Meeting', when: 'Tomorrow 11:00 AM' },
      { title: 'Prepare monthly report', hint: 'Task', when: 'Jun 2 9:00 AM' },
    ],
    [],
  )

  const openAdd = () => {
    setEditingId(null)
    setForm({ name: '', email: '', tier: 'Lead', company: '' })
    setFormErrors({})
    setModalOpen(true)
  }

  const openEdit = (id) => {
    const current = items.find((x) => x.id === id)
    if (!current) return
    setEditingId(id)
    setForm({
      name: current.name,
      email: current.email,
      tier: current.tier,
      company: current.company || '',
    })
    setFormErrors({})
    setModalOpen(true)
  }

  const onDelete = (id) => {
    if (!confirm('Delete this customer?')) return
    setItems((arr) => arr.filter((x) => x.id !== id))
  }

  const onSave = () => {
    const errs = validateForm(form)
    setFormErrors(errs)
    if (Object.keys(errs).length) return

    if (editingId) {
      setItems((arr) =>
        arr.map((x) => (x.id === editingId ? { ...x, ...form } : x)),
      )
    } else {
      const newItem = { id: randomId(), ...form }
      setItems((arr) => [newItem, ...arr])
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold tracking-tight">
            Welcome back, Ibrahim
          </div>
          <div className="mt-1 text-sm opacity-75">
            Here’s what’s happening with your business today.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={openAdd}>+ Add New</Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (!confirm('Reset dashboard data?')) return
              localStorage.removeItem(STORAGE_KEY)
              setItems([])
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {status === 'loading' ? <Loader label="Preparing dashboard…" /> : null}
      {status === 'error' ? (
        <ErrorState
          title="Could not load seed data"
          message={error}
          onRetry={() => window.location.reload()}
        />
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total customers"
          value={stats.totalCustomers.toLocaleString()}
          delta="+12.5% from last month"
          tone="accent"
        />
        <StatCard
          title="New leads"
          value={stats.leads.toLocaleString()}
          delta="+8.2% from last month"
          tone="primary"
        />
        <StatCard
          title="Total deals"
          value={stats.deals.toLocaleString()}
          delta="+15.3% from last month"
          tone="success"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          delta="+18.7% from last month"
          tone="warning"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="app-card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold">Revenue overview</div>
            <div className="btn btn-ghost ring-focus h-9 px-3 text-xs">
              This month
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-[var(--bg)] p-4 app-border">
            <Sparkline />
          </div>
        </div>

        <div className="app-card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold">Upcoming tasks</div>
            <div className="text-xs opacity-70">View all</div>
          </div>
          <div className="mt-4 grid gap-3">
            {tasks.map((t) => (
              <div
                key={t.title}
                className="flex items-start justify-between gap-3 rounded-2xl bg-[var(--bg)] p-4 app-border"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {t.title}
                  </div>
                  <div className="mt-0.5 text-xs opacity-70">{t.hint}</div>
                </div>
                <div className="text-xs opacity-70">{t.when}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="app-card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold">Recent customers</div>
            <div className="text-xs opacity-70">View all</div>
          </div>

          {items.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="No customers yet"
                description="Seed data will appear here, or add your first customer."
                actionLabel="Add customer"
                onAction={openAdd}
              />
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl app-border bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[var(--bg)] text-xs uppercase tracking-wide opacity-80">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {recent.map((c) => (
                      <tr key={c.id} className="hover:bg-[var(--bg)]">
                        <td className="px-4 py-3 font-semibold">{c.name}</td>
                        <td className="px-4 py-3 opacity-90">
                          {c.company || '—'}
                        </td>
                        <td className="px-4 py-3 opacity-90">{c.email}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full px-2.5 py-1 text-xs font-bold app-border bg-[var(--bg)]">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(c.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => onDelete(c.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <PipelineDonut total={stats.deals} />
      </section>

      <Modal
        title={editingId ? 'Edit customer' : 'Add customer'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>{editingId ? 'Save' : 'Create'}</Button>
          </div>
        }
      >
        <CustomerForm
          value={form}
          onChange={setForm}
          errors={formErrors}
        />
      </Modal>
    </div>
  )
}

