import { NavLink } from 'react-router-dom'
import { Button } from '../shared/ui/primitives/Button.jsx'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-sm opacity-85">
        The page you are looking for doesn’t exist.
      </p>
      <div className="flex justify-center gap-2">
        <NavLink to="/">
          <Button>Go home</Button>
        </NavLink>
        <NavLink to="/customers">
          <Button variant="ghost">Customers</Button>
        </NavLink>
      </div>
    </div>
  )
}

