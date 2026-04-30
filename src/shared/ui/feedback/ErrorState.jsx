import { Button } from '../primitives/Button.jsx'

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {message ? <p className="mt-1 text-sm opacity-90">{message}</p> : null}
        </div>
        {onRetry ? (
          <Button variant="ghost" onClick={onRetry} className="self-start">
            Retry
          </Button>
        ) : null}
      </div>
    </div>
  )
}

