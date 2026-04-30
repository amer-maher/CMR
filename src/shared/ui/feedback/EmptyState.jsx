import { Button } from '../primitives/Button.jsx'

export function EmptyState({
  title = 'No data',
  description = 'Try changing your filters or add a new item.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-950">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {actionLabel && onAction ? (
        <div className="mt-4 flex justify-center">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  )
}

