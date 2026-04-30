export function PlaceholderPage({ title }) {
  return (
    <div className="app-card p-6">
      <div className="text-lg font-extrabold">{title}</div>
      <div className="mt-2 text-sm opacity-75">
        This section is a UI placeholder to match the dashboard layout.
      </div>
    </div>
  )
}

