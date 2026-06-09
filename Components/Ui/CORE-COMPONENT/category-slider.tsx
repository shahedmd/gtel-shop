'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SLIDER_SLIDES, CATEGORIES } from './data/categories-data'
import {
    SLIDER_AUTO_INTERVAL,
    SLIDER_TRANSITION_DURATION,
    PRIMARY_COLOR,
    SUCCESS_COLOR,
    BG_LIGHT,
    CATEGORY_PANEL_HEIGHT_XL,
} from './data/category-constants'

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function CategorySliderSection() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [transitioning, setTransitioning] = useState(false)
    const currentSlide = SLIDER_SLIDES[activeSlide]

    const goToSlide = useCallback((index: number) => {
        if (transitioning || index === activeSlide) return
        setTransitioning(true)
        setTimeout(() => {
            setActiveSlide(index)
            setTransitioning(false)
        }, SLIDER_TRANSITION_DURATION)
    }, [transitioning, activeSlide])

    const nextSlide = useCallback(() => {
        goToSlide((activeSlide + 1) % SLIDER_SLIDES.length)
    }, [activeSlide, goToSlide])

    const prevSlide = useCallback(() => {
        goToSlide((activeSlide - 1 + SLIDER_SLIDES.length) % SLIDER_SLIDES.length)
    }, [activeSlide, goToSlide])

    // Auto-advance slider
    useEffect(() => {
        const timer = window.setInterval(nextSlide, SLIDER_AUTO_INTERVAL)
        return () => window.clearInterval(timer)
    }, [nextSlide])

    return (
        <section className={cn('px-3 py-3 sm:px-5 lg:px-7 lg:py-4', `bg-[${BG_LIGHT}]`)}>
            <div className="mx-auto max-w-[1500px]">
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_360px] 2xl:grid-cols-[minmax(0,1.5fr)_380px]">

                    {/* ── HERO SLIDER ── */}
                    <div className="relative h-[300px] overflow-hidden rounded-2xl bg-slate-950 shadow-[0_12px_40px_rgba(15,23,42,0.16)] sm:h-[340px] lg:h-[390px] xl:h-[420px]">

                        {/* IMAGE - ✅ OPTIMIZED: Using Next.js Image component */}
                        <Image
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            fill
                            priority={activeSlide === 0}
                            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) calc(100vw - 400px), calc(100vw - 420px)"
                            className={cn(
                                'object-cover transition-opacity duration-300',
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
                                <span className={cn('h-1.5 w-1.5 rounded-full')} style={{ backgroundColor: SUCCESS_COLOR }} />
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
                                    aria-label="Next slide"
                                >
                                    Next
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </div>

                        {/* SLIDE DOTS — top left */}
                        <div className="absolute left-5 top-4 z-20 flex items-center gap-1.5">
                            {SLIDER_SLIDES.map((slide, i) => (
                                <button
                                    key={slide.title}
                                    type="button"
                                    onClick={() => goToSlide(i)}
                                    className={cn(
                                        'h-1.5 rounded-full transition-all duration-300',
                                        activeSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                                    )}
                                    aria-label={`Go to slide ${i + 1}`}
                                    aria-current={activeSlide === i}
                                />
                            ))}
                        </div>

                        {/* PREV / NEXT — bottom right */}
                        <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 sm:flex">
                            <button
                                type="button"
                                onClick={prevSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22 active:scale-95"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft size={17} />
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22 active:scale-95"
                                aria-label="Next slide"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>

                        {/* SLIDE COUNTER pill */}
                        <div className="absolute right-4 top-4 z-20 hidden rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-black tabular-nums text-white/70 backdrop-blur-sm sm:block">
                            {activeSlide + 1} / {SLIDER_SLIDES.length}
                        </div>
                    </div>

                    {/* ── CATEGORY PANEL ── */}
                    <aside className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)]" style={{ height: `${CATEGORY_PANEL_HEIGHT_XL}px` }}>

                        {/* PANEL HEADER */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
                            <div>
                                <h2 className="text-[14px] font-black text-slate-900">Categories</h2>
                                <p className="mt-0.5 text-[11px] font-medium text-slate-400">Browse all product types</p>
                            </div>
    
                        </div>

                        {/* CATEGORY GRID */}
                        <div className="grid flex-1 gap-1 overflow-y-auto p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:overflow-y-auto">
                            {CATEGORIES.map((cat) => {
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