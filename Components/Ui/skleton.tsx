interface SkeletonProps {
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const roundeds = {
  sm:   'rounded',
  md:   'rounded-lg',
  lg:   'rounded-xl',
  xl:   'rounded-2xl',
  full: 'rounded-full',
}

export function Skeleton({
  width = '100%',
  height = '16px',
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  return (
    <div
      style={{ width, height }}
      className={[
        'relative overflow-hidden',
        'bg-[#1C2333]',
        roundeds[rounded],
        className,
      ].join(' ')}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#0D1526] border border-[#1E2A3E] rounded-2xl overflow-hidden">
      <Skeleton height="200px" rounded="sm" />
      <div className="p-4 space-y-3">
        <Skeleton height="14px" width="60%" />
        <Skeleton height="13px" width="85%" />
        <Skeleton height="13px" width="40%" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton height="20px" width="80px" />
          <Skeleton height="36px" width="100px" rounded="xl" />
        </div>
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton width="44px" height="44px" rounded="full" />
      <div className="flex-1 space-y-2">
        <Skeleton height="14px" width="40%" />
        <Skeleton height="12px" width="60%" />
      </div>
    </div>
  )
}