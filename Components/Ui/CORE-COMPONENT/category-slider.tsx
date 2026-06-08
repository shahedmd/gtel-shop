'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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

const slides = [
    {
        title: 'Microscope & Board Repair Tools',
        subtitle: 'Premium tools for mobile servicing — all in one place.',
        badge: 'Technician Choice',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
        href: '/microscope',
    },
    {
        title: 'Hot Air, Soldering & Rework Setup',
        subtitle: 'Top repair desk equipment for every technician.',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80',
        href: '/hotgun',
    },
    {
        title: 'LCD Separator & Cutting Machine',
        subtitle: 'Display repair, glass removal & finishing tools.',
        badge: 'Workshop Ready',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
        href: '/cutting-machine',
    },
]

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

export default function CategorySliderSection() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [transitioning, setTransitioning] = useState(false)
    const currentSlide = slides[activeSlide]

    const goToSlide = (index: number) => {
        if (transitioning || index === activeSlide) return
        setTransitioning(true)
        setTimeout(() => {
            setActiveSlide(index)
            setTransitioning(false)
        }, 180)
    }

    const nextSlide = () => goToSlide((activeSlide + 1) % slides.length)
    const prevSlide = () => goToSlide((activeSlide - 1 + slides.length) % slides.length)

    useEffect(() => {
        const timer = window.setInterval(nextSlide, 5000)
        return () => window.clearInterval(timer)
    }, [activeSlide])

    return (
        <section className="bg-[#F4F6FB] px-3 py-3 sm:px-5 lg:px-7 lg:py-4">
            <div className="mx-auto max-w-[1500px]">
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_360px] 2xl:grid-cols-[minmax(0,1.5fr)_380px]">

                    {/* ── HERO SLIDER ── */}
                    <div className="relative h-[300px] overflow-hidden rounded-2xl bg-slate-950 shadow-[0_12px_40px_rgba(15,23,42,0.16)] sm:h-[340px] lg:h-[390px] xl:h-[420px]">

                        {/* IMAGE */}
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className={cn(
                                'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                                transitioning ? 'opacity-0' : 'opacity-100'
                            )}
                        />

                        {/* GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent max-sm:bg-gradient-to-t max-sm:from-slate-950/90 max-sm:via-slate-950/50 max-sm:to-transparent" />

                        {/* CONTENT */}
                        <div
                            className={cn(
                                'relative z-10 flex h-full max-w-lg flex-col justify-end p-5 sm:p-6 lg:p-7 transition-opacity duration-300',
                                transitioning ? 'opacity-0' : 'opacity-100'
                            )}
                        >
                            {/* BADGE */}
                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white/90 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5EE7A0]" />
                                {currentSlide.badge}
                            </span>

                            <h2 className="mt-3 text-xl font-black leading-tight text-white sm:text-3xl lg:text-[34px]">
                                {currentSlide.title}
                            </h2>

                            <p className="mt-2 max-w-sm text-[13px] font-medium leading-5 text-white/65">
                                {currentSlide.subtitle}
                            </p>

                            <div className="mt-4 flex items-center gap-2.5">
                                <Link
                                    href={currentSlide.href}
                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-[13px] font-black text-[#2B2EE6] transition-all hover:bg-white/90 hover:shadow-lg hover:-translate-y-px"
                                >
                                    Shop Now
                                </Link>
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 text-[13px] font-bold text-white/90 backdrop-blur-sm transition-all hover:bg-white/18"
                                >
                                    Next
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </div>

                        {/* SLIDE DOTS — top left */}
                        <div className="absolute left-5 top-4 z-20 flex items-center gap-1.5">
                            {slides.map((slide, i) => (
                                <button
                                    key={slide.title}
                                    type="button"
                                    onClick={() => goToSlide(i)}
                                    className={cn(
                                        'h-1.5 rounded-full transition-all duration-300',
                                        activeSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                                    )}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* PREV / NEXT — bottom right */}
                        <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 sm:flex">
                            <button
                                type="button"
                                onClick={prevSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={17} />
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22"
                                aria-label="Next"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>

                        {/* SLIDE COUNTER pill */}
                        <div className="absolute right-4 top-4 z-20 hidden rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-black tabular-nums text-white/70 backdrop-blur-sm sm:block">
                            {activeSlide + 1} / {slides.length}
                        </div>
                    </div>

                    {/* ── CATEGORY PANEL ── */}
                    <aside className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)] xl:h-[420px]">

                        {/* PANEL HEADER */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
                            <div>
                                <h2 className="text-[14px] font-black text-slate-900">Categories</h2>
                                <p className="mt-0.5 text-[11px] font-medium text-slate-400">Browse all product types</p>
                            </div>
                            <Link
                                href="/categories"
                                className="rounded-lg bg-[#2B2EE6]/8 px-3 py-1.5 text-[11px] font-black text-[#2B2EE6] transition hover:bg-[#2B2EE6]/14"
                            >
                                View All
                            </Link>
                        </div>

                        {/* CATEGORY GRID */}
                        <div className="grid flex-1 gap-1 overflow-y-auto p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:overflow-y-auto">
                            {categories.map((cat) => {
                                const Icon = cat.icon
                                return (
                                    <Link
                                        key={cat.href}
                                        href={cat.href}
                                        className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-transparent bg-slate-50 px-3 py-2 transition-all duration-200 hover:border-[#2B2EE6]/20 hover:bg-[#2B2EE6]/5"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 ring-1 ring-slate-200 transition-all duration-200 group-hover:text-[#2B2EE6] group-hover:ring-[#2B2EE6]/25">
                                            <Icon size={15} />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-[12.5px] font-bold text-slate-700 transition-colors duration-200 group-hover:text-[#2B2EE6]">
                                                {cat.label}
                                            </span>
                                            <span className="block text-[10.5px] font-medium text-slate-400">
                                                {cat.labelBn} · {cat.count}
                                            </span>
                                        </span>
                                        <ChevronRight
                                            size={13}
                                            className="shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#2B2EE6]"
                                        />
                                    </Link>
                                )
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}