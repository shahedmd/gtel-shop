'use client'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'tonal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const variants: Record<string, string> = {
  primary: [
    'bg-blue-600 text-white border-blue-700',
    'hover:bg-blue-500',
    'shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]',
    'hover:shadow-[0_0_24px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]',
  ].join(' '),
  secondary: [
    'bg-[#1C2333] text-slate-200 border-[#2A3347]',
    'hover:bg-[#242d42] hover:text-white',
    'shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]',
  ].join(' '),
  outline: [
    'bg-transparent text-blue-400 border-blue-500/50',
    'hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-300',
  ].join(' '),
  ghost: [
    'bg-transparent text-slate-300 border-transparent',
    'hover:bg-white/[0.06] hover:text-white',
  ].join(' '),
  tonal: [
    'bg-blue-500/15 text-blue-300 border-blue-500/20',
    'hover:bg-blue-500/25 hover:text-blue-200',
  ].join(' '),
  danger: [
    'bg-rose-600 text-white border-rose-700',
    'hover:bg-rose-500',
    'shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]',
  ].join(' '),
}

const sizes: Record<string, string> = {
  sm: 'text-[13px] h-8  px-3.5 rounded-lg  gap-1.5',
  md: 'text-[13px] h-9  px-5   rounded-xl  gap-2',
  lg: 'text-sm     h-11 px-6   rounded-xl  gap-2',
  xl: 'text-sm     h-12 px-8   rounded-2xl gap-2.5 tracking-wide',
}

const spinnerSizes: Record<string, number> = {
  sm: 14, md: 15, lg: 16, xl: 17,
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const isDisabled = disabled || loading
  const s = spinnerSizes[size]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'relative overflow-hidden',
        'inline-flex items-center justify-center',
        'font-medium border select-none',
        'transition-all duration-200 ease-out',
        'active:scale-[0.97]',
        'focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-blue-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        isDisabled
          ? 'opacity-40 cursor-not-allowed pointer-events-none'
          : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      />

      {loading && (
        <svg
          width={s} height={s}
          viewBox="0 0 24 24"
          fill="none"
          className="animate-spin flex-shrink-0"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {!loading && leftIcon && (
        <span aria-hidden="true" className="flex-shrink-0 flex items-center opacity-90">
          {leftIcon}
        </span>
      )}

      <span className="relative leading-none">{children}</span>

      {rightIcon && (
        <span aria-hidden="true" className="flex-shrink-0 flex items-center opacity-70">
          {rightIcon}
        </span>
      )}

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-black/20 pointer-events-none" />
    </button>
  )
}