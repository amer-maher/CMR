export function Input({ className = '', ...props }) {
  return (
    <input
      className={[
        'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500',
        className,
      ].join(' ')}
      {...props}
    />
  )
}

