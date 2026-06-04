import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  className?: string
}

const variants: Record<string, string> = {
  default: 'bg-slate-700/60 text-slate-300 border-slate-600/40',
  primary: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  danger:  'bg-rose-500/15 text-rose-300 border-rose-500/25',
  outline: 'bg-transparent text-slate-300 border-slate-500/40',
}

const dotColors: Record<string, string> = {
  default: 'bg-slate-400',
  primary: 'bg-blue-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger:  'bg-rose-400',
  outline: 'bg-slate-400',
}

const sizes: Record<string, string> = {
  sm: 'text-[10px] px-2    py-0.5 gap-1   rounded-md',
  md: 'text-[11px] px-2.5  py-1   gap-1.5 rounded-lg',
  lg: 'text-[12px] px-3    py-1.5 gap-1.5 rounded-lg',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium border',
        'tracking-wide whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={[
            'rounded-full flex-shrink-0 animate-pulse',
            size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5',
            dotColors[variant],
          ].join(' ')}
        />
      )}
      {children}
    </span>
  )
}