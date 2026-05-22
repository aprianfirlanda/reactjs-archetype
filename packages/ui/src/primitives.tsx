import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const buttonVariants = {
  primary:
    'bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-blue-700',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-blue-700',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:outline-blue-700',
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        buttonVariants[variant],
        className,
      )}
      type={type}
      {...props}
    />
  )
}

export type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const badgeTones = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  info: 'bg-blue-50 text-blue-700 ring-blue-200',
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  description?: string
}

export function TextField({
  className,
  description,
  id,
  label,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name

  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-900">{label}</span>
      <input
        className={clsx(
          'mt-2 block min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100',
          className,
        )}
        id={inputId}
        {...props}
      />
      {description ? (
        <span className="mt-2 block text-xs text-slate-500">{description}</span>
      ) : null}
    </label>
  )
}
