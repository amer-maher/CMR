const variants = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const base = 'btn ring-focus'

  return (
    <button
      type={type}
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    />
  )
}

