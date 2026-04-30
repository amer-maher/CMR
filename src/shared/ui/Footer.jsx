export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm opacity-85 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="leading-relaxed">
          CRM Demo — React Router, Tailwind, Fetch, Forms, Dashboard CRUD.
        </p>
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

