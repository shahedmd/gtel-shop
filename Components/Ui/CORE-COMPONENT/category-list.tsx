'use client'

import Link from 'next/link'
import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORIES } from './data/categories-data'
import {
    NAVBAR_HEIGHT_MOBILE,
    NAVBAR_HEIGHT_TABLET,
    SCROLL_DISTANCE,
    SCROLL_CHECK_THRESHOLD,
    PRIMARY_COLOR,
} from './data/category-constants'

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function CategoryScrollBar() {
    const pathname = usePathname()
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    // ✅ FIXED: Improved active state logic to prevent dual highlights
    const isActive = useCallback((href: string) => {
        if (href === '/categories/categories') {
            return pathname === '/categories'
        }
        return pathname === href || pathname.startsWith(href + '/')
    }, [pathname])

    const checkScroll = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > SCROLL_CHECK_THRESHOLD)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - SCROLL_CHECK_THRESHOLD)
    }, [])

    // Setup scroll listeners and ResizeObserver
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        checkScroll()
        el.addEventListener('scroll', checkScroll, { passive: true })

        const ro = new ResizeObserver(checkScroll)
        ro.observe(el)

        return () => {
            el.removeEventListener('scroll', checkScroll)
            ro.disconnect()
        }
    }, [checkScroll])

    // Scroll active item into view on route change
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const active = el.querySelector('[data-active="true"]') as HTMLElement | null
        if (active) {
            const offset = active.offsetLeft - el.clientWidth / 2 + active.offsetWidth / 2
            el.scrollTo({ left: offset, behavior: 'smooth' })
        }
    }, [pathname])

    const scroll = useCallback((dir: 'left' | 'right') => {
        const el = scrollRef.current
        if (!el) return
        el.scrollBy({ left: dir === 'left' ? -SCROLL_DISTANCE : SCROLL_DISTANCE, behavior: 'smooth' })
    }, [])

    // Memoize categories to prevent unnecessary re-renders
    const categoriesWithActiveState = useMemo(
        () => CATEGORIES.map(cat => ({ ...cat, active: isActive(cat.href) })),
        [isActive]
    )

    return (
        <div
            className="sticky z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
            style={{
                top: `${NAVBAR_HEIGHT_MOBILE}px`,
            }}
        >
            <div className="mx-auto max-w-[1500px]">
                <div className="relative flex items-center">

                    {/* LEFT FADE + BUTTON */}
                    <div
                        className={cn(
                            'pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent transition-opacity duration-200',
                            canScrollLeft ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => scroll('left')}
                        aria-label="Scroll categories left"
                        className={cn(
                            'absolute left-2 z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6] hover:shadow-md active:scale-95',
                            canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        <ChevronLeft size={15} />
                    </button>

                    {/* SCROLL TRACK */}
                    <div
                        ref={scrollRef}
                        className="flex w-full items-center gap-1.5 overflow-x-auto scroll-smooth px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 lg:px-7"
                    >
                        {categoriesWithActiveState.map((cat) => {
                            const Icon = cat.icon

                            return (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    data-active={cat.active}
                                    className={cn(
                                        'group flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 active:scale-[0.97]',
                                        cat.active
                                            ? 'border-[#2B2EE6] bg-[#2B2EE6] shadow-[0_4px_14px_rgba(43,46,230,0.22)]'
                                            : 'border-slate-200 bg-slate-50 hover:border-[#2B2EE6]/25 hover:bg-[#2B2EE6]/5'
                                    )}
                                    aria-current={cat.active ? 'page' : undefined}
                                >
                                    {/* ICON */}
                                    <span className={cn(
                                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200',
                                        cat.active
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white text-slate-400 ring-1 ring-slate-200 group-hover:text-[#2B2EE6] group-hover:ring-[#2B2EE6]/25'
                                    )}>
                                        <Icon size={14} />
                                    </span>

                                    {/* TEXT */}
                                    <span className="min-w-0">
                                        <span className={cn(
                                            'block whitespace-nowrap text-[12.5px] font-bold leading-none transition-colors duration-200',
                                            cat.active ? 'text-white' : 'text-slate-700 group-hover:text-[#2B2EE6]'
                                        )}>
                                            {cat.label}
                                        </span>
                                        <span className={cn(
                                            'mt-0.5 block whitespace-nowrap text-[10px] font-medium leading-none transition-colors duration-200',
                                            cat.active ? 'text-white/70' : 'text-slate-400'
                                        )}>
                                            {cat.count} products
                                        </span>
                                    </span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* RIGHT FADE + BUTTON */}
                    <div
                        className={cn(
                            'pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-200',
                            canScrollRight ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => scroll('right')}
                        aria-label="Scroll categories right"
                        className={cn(
                            'absolute right-2 z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6] hover:shadow-md active:scale-95',
                            canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        <ChevronRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}