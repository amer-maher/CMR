import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../shared/ui/primitives/Button.jsx'
import { Input } from '../shared/ui/primitives/Input.jsx'

function validate({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Invalid email'
  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Min 6 characters'
  return errors
}

export function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [success, setSuccess] = useState('')

  const errors = useMemo(() => validate(values), [values])
  const isValid = Object.keys(errors).length === 0

  const onSubmit = (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!isValid) return
    setSuccess('Logged in successfully (demo).')
  }

  const showError = (field) => Boolean(touched[field] && errors[field])

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          UI + validation only (no auth backend).
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
            Email
          </label>
          <Input
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
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
            Password
          </label>
          <Input
            type="password"
            value={values.password}
            onChange={(e) =>
              setValues((v) => ({ ...v, password: e.target.value }))
            }
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="••••••••"
            aria-invalid={showError('password')}
          />
          {showError('password') ? (
            <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
              {errors.password}
            </p>
          ) : null}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
          No account?{' '}
          <NavLink
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
          >
            Register
          </NavLink>
        </p>
      </form>
    </div>
  )
}

