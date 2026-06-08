'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import {
    BatteryCharging,
    ChevronLeft,
    ChevronRight,
    Cpu,
    Flame,
    Grid3X3,
    MonitorSmartphone,
    Search,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Wrench,
    Zap,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const categories = [
    { label: 'All', labelBn: 'সব পণ্য', href: '/categories/categories', icon: Grid3X3, count: '100+' },
    { label: 'Microscope', labelBn: 'মাইক্রোস্কোপ', href: '/categories/microscope', icon: Search, count: '24+' },
    { label: 'Hot Gun', labelBn: 'হট গান', href: '/categories/hotgun', icon: Flame, count: '18+' },
    { label: 'Soldering Iron', labelBn: 'সোল্ডারিং আয়রন', href: '/categories/soldering-iron', icon: Zap, count: '32+' },
    { label: 'Cutting Machine', labelBn: 'কাটিং মেশিন', href: '/categories/cutting-machine', icon: Wrench, count: '12+' },
    { label: 'LCD Separator', labelBn: 'এলসিডি সেপারেটর', href: '/categories/lcd-separator', icon: MonitorSmartphone, count: '15+' },
    { label: 'Screw Driver', labelBn: 'স্ক্রু ড্রাইভার', href: '/categories/screwdriver', icon: Wrench, count: '40+' },
    { label: 'Glue Remover', labelBn: 'গ্লু রিমুভার', href: '/categories/glue-remover', icon: Sparkles, count: '10+' },
    { label: 'Charger', labelBn: 'চার্জার', href: '/categories/charger', icon: BatteryCharging, count: '28+' },
    { label: 'Mobile Parts', labelBn: 'মোবাইল পার্টস', href: '/categories/mobile-parts', icon: Smartphone, count: '80+' },
    { label: 'IC & Chip', labelBn: 'আইসি চিপ', href: '/categories/ic-chip', icon: Cpu, count: '50+' },
    { label: 'Protection Tools', labelBn: 'প্রটেকশন টুলস', href: '/categories/protection-tools', icon: ShieldCheck, count: '22+' },
]

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function CategoryScrollBar() {
    const pathname = usePathname()
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const isActive = (href: string) =>
        href === '/categories' ? pathname === '/categories' : pathname.startsWith(href)

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 8)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
    }

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
    }, [])

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

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current
        if (!el) return
        el.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' })
    }

    return (
        <div className="sticky top-[68px] z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_2px_8px_rgba(15,23,42,0.05)] sm:top-[76px]">
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
                        aria-label="Scroll left"
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
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            const active = isActive(cat.href)

                            return (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    data-active={active}
                                    className={cn(
                                        'group flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 active:scale-[0.97]',
                                        active
                                            ? 'border-[#2B2EE6] bg-[#2B2EE6] shadow-[0_4px_14px_rgba(43,46,230,0.22)]'
                                            : 'border-slate-200 bg-slate-50 hover:border-[#2B2EE6]/25 hover:bg-[#2B2EE6]/5'
                                    )}
                                >
                                    {/* ICON */}
                                    <span className={cn(
                                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200',
                                        active
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white text-slate-400 ring-1 ring-slate-200 group-hover:text-[#2B2EE6] group-hover:ring-[#2B2EE6]/25'
                                    )}>
                                        <Icon size={14} />
                                    </span>

                                    {/* TEXT */}
                                    <span className="min-w-0">
                                        <span className={cn(
                                            'block whitespace-nowrap text-[12.5px] font-bold leading-none transition-colors duration-200',
                                            active ? 'text-white' : 'text-slate-700 group-hover:text-[#2B2EE6]'
                                        )}>
                                            {cat.label}
                                        </span>
                                        <span className={cn(
                                            'mt-0.5 block whitespace-nowrap text-[10px] font-medium leading-none transition-colors duration-200',
                                            active ? 'text-white/70' : 'text-slate-400'
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
                        aria-label="Scroll right"
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