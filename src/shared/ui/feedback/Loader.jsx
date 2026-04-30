export function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400" />
      <span>{label}</span>
    </div>
  )
}

