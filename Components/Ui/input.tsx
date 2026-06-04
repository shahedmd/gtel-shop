'use client'
import React, { useState, useId, ReactNode } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'

interface InputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: ReactNode
  disabled?: boolean
  maxLength?: number
  showCount?: boolean
  className?: string
}

export default function Input({
  label,
  type = 'text',
  value = '',
  onChange,
  placeholder = ' ',
  error,
  success,
  hint,
  leftIcon,
  disabled = false,
  maxLength,
  showCount = false,
  className = '',
}: InputProps) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  const hasValue = value.length > 0
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const state = error ? 'error' : success ? 'success' : focused ? 'focused' : 'idle'

  const containerStyles = {
    idle:    'border-[#1E2A3E] bg-[#0D1526]',
    focused: 'border-blue-500 bg-[#0D1526] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]',
    error:   'border-rose-500/70 bg-[#0D1526] shadow-[0_0_0_3px_rgba(225,29,72,0.1)]',
    success: 'border-emerald-500/70 bg-[#0D1526] shadow-[0_0_0_3px_rgba(16,185,129,0.1)]',
  }

  const labelStyles = {
    idle:    'text-slate-500',
    focused: 'text-blue-400',
    error:   'text-rose-400',
    success: 'text-emerald-400',
  }

  const isFloating = focused || hasValue

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      <div
        className={`
          relative rounded-xl border
          transition-all duration-200 ease-out
          ${containerStyles[state]}
          ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        `}
      >
        {/* Left Icon */}
        {leftIcon && (
          <span
            className={`
              absolute left-4 top-1/2 -translate-y-1/2
              flex items-center pointer-events-none
              transition-colors duration-200
              ${focused ? 'text-blue-400' : 'text-slate-500'}
            `}
          >
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={isFloating ? placeholder : ''}
          className={`
            peer w-full bg-transparent outline-none
            text-sm text-slate-100 placeholder:text-slate-600
            transition-all duration-200
            ${leftIcon ? 'pl-11' : 'pl-4'}
            ${isPassword ? 'pr-11' : 'pr-4'}
            ${isFloating ? 'pt-6 pb-2' : 'py-4'}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`
            absolute pointer-events-none
            font-medium tracking-wide
            transition-all duration-200 ease-out
            ${leftIcon ? 'left-11' : 'left-4'}
            ${isFloating
              ? 'top-2.5 text-[11px] ' + labelStyles[state]
              : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
            }
          `}
        >
          {label}
        </label>

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2
              text-slate-500 hover:text-slate-300
              transition-colors duration-150 focus:outline-none"
          >
            {showPassword
              ? <EyeOff size={17} />
              : <Eye size={17} />
            }
          </button>
        )}

        {/* Success / Error icon */}
        {!isPassword && (success || error) && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {error
              ? <AlertCircle size={17} className="text-rose-400" />
              : <CheckCircle2 size={17} className="text-emerald-400" />
            }
          </span>
        )}

        {/* Bottom focus line */}
        <span
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full
            transition-all duration-300 ease-out
            ${focused
              ? error ? 'w-full bg-rose-500'
                : success ? 'w-full bg-emerald-500'
                : 'w-full bg-blue-500'
              : 'w-0 bg-blue-500'
            }
          `}
        />
      </div>

      {/* Bottom row — hint/error/success + counter */}
      <div className="flex items-start justify-between px-1">
        <div className="flex items-center gap-1.5">
          {error && (
            <>
              <AlertCircle size={12} className="text-rose-400 flex-shrink-0 mt-px" />
              <p className="text-[12px] text-rose-400">{error}</p>
            </>
          )}
          {!error && success && (
            <>
              <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0 mt-px" />
              <p className="text-[12px] text-emerald-400">{success}</p>
            </>
          )}
          {!error && !success && hint && (
            <p className="text-[12px] text-slate-500">{hint}</p>
          )}
        </div>

        {showCount && maxLength && (
          <p className={`text-[11px] tabular-nums flex-shrink-0
            ${value.length >= maxLength ? 'text-rose-400' : 'text-slate-600'}
          `}>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}