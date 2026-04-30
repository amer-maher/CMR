import { useMemo, useState } from 'react'
import { Button } from '../shared/ui/primitives/Button.jsx'
import { Input } from '../shared/ui/primitives/Input.jsx'

function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Invalid email'
  if (!message.trim()) errors.message = 'Message is required'
  else if (message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters'
  return errors
}

export function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const errors = useMemo(() => validate(values), [values])
  const isValid = Object.keys(errors).length === 0

  const onSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTouched({ name: true, email: true, message: true })
    setSuccess('')
    if (!isValid) {
      setIsSubmitting(false)
      return
    }
    // Demo: no backend required
    setTimeout(() => {
      setValues({ name: '', email: '', message: '' })
      setTouched({})
      setIsSubmitting(false)
      setSuccess('Message sent successfully (demo).')
    }, 250)
  }

  const showError = (field) => Boolean(touched[field] && errors[field])

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Controlled form with validation + success feedback.
        </p>
      </div>

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100">
          {success}
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
            Name
          </label>
          <Input
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Your name"
            aria-invalid={showError('name')}
          />
          {showError('name') ? (
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
            value={values.email}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@company.com"
            aria-invalid={showError('email')}
          />
          {showError('email') ? (
            <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
            Message
          </label>
          <textarea
            className="min-h-32 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
            value={values.message}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            placeholder="How can we help?"
            aria-invalid={showError('message')}
          />
          {showError('message') ? (
            <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This is a demo form (no real backend).
          </p>
          <Button type="submit" disabled={isSubmitting}>
            Send message
          </Button>
        </div>
      </form>
    </div>
  )
}

