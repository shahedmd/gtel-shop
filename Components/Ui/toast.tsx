'use client'
import { useEffect, useState, ReactNode } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  description?: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const configs: Record<ToastType, {
  icon: ReactNode
  bar: string
  iconColor: string
  label: string
}> = {
  success: {
    icon: <CheckCircle2 size={18} />,
    iconColor: 'text-emerald-400',
    bar: 'bg-emerald-500',
    label: 'সফল',
  },
  error: {
    icon: <XCircle size={18} />,
    iconColor: 'text-rose-400',
    bar: 'bg-rose-500',
    label: 'সমস্যা',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    iconColor: 'text-amber-400',
    bar: 'bg-amber-500',
    label: 'সতর্কতা',
  },
  info: {
    icon: <Info size={18} />,
    iconColor: 'text-blue-400',
    bar: 'bg-blue-500',
    label: 'তথ্য',
  },
}

export function Toast({
  message,
  description,
  type = 'info',
  duration = 4000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const config = configs[type]

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10)
    const interval = setInterval(() => {
      setProgress((p) => Math.max(0, p - (100 / (duration / 100))))
    }, 100)
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => {
      clearTimeout(show)
      clearTimeout(hide)
      clearInterval(interval)
    }
  }, [duration, onClose])

  return (
    <div
      className={[
        'relative w-[340px] overflow-hidden',
        'bg-[#111827] border border-[#1E2A3E]',
        'rounded-2xl',
        'transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4',
      ].join(' ')}
    >
      {/* Content */}
      <div className="flex items-start gap-3 px-4 py-3.5">
        {/* Icon */}
        <span className={['flex-shrink-0 mt-0.5', config.iconColor].join(' ')}>
          {config.icon}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-100 leading-snug">
            {message}
          </p>
          {description && (
            <p className="text-[12px] text-slate-400 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => {
            setVisible(false)
            setTimeout(onClose, 300)
          }}
          className="flex-shrink-0 text-slate-500 hover:text-slate-300
            transition-colors duration-150 mt-0.5 focus:outline-none"
        >
          <X size={15} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-[#1E2A3E]">
        <div
          className={['h-full transition-all duration-100 ease-linear rounded-full', config.bar].join(' ')}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}