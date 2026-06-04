interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'white'
  className?: string
}

const sizes = {
  sm: 16,
  md: 22,
  lg: 32,
  xl: 44,
}

const colors = {
  default: ['#1E2A3E', '#94A3B8'],
  primary: ['#1E3A6E', '#3B82F6'],
  white:   ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.9)'],
}

export default function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps) {
  const s = sizes[size]
  const [track, fill] = colors[variant]
  const stroke = s * 0.1 + 1.5

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      className={['animate-spin', className].join(' ')}
      aria-label="Loading"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke={track}
        strokeWidth={stroke}
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={fill}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  )
}