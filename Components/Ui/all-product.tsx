'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import {
    ChevronRight,
    Grid2X2,
    LayoutList,
    Package,
    Search,
    ShoppingCart,
    SlidersHorizontal,
    Star,
    TrendingUp,
    X,
} from 'lucide-react'

import { ALL_PRODUCTS, Product } from './all-products-data'


const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))]

const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low → High' },
    { value: 'price_desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
]

const BADGE = {
    hot: { label: 'Hot', bg: 'bg-rose-500' },
    new: { label: 'New', bg: 'bg-emerald-500' },
    sale: { label: 'Sale', bg: 'bg-amber-500' },
}

function cn(...c: (string | false | null | undefined)[]) {
    return c.filter(Boolean).join(' ')
}

// ─── GRID CARD ────────────────────────────────────────────────────────────────
function GridCard({ product }: { product: Product }) {
    const [added, setAdded] = useState(false)
    const discount = Math.round((1 - product.price / product.originalPrice) * 100)
    const badge = product.badge ? BADGE[product.badge] : null

    const handleCart = (e: React.MouseEvent) => {
        e.preventDefault()
        setAdded(true)
        setTimeout(() => setAdded(false), 1600)
    }

    return (
        <Link
            href={product.href}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_6px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2B2EE6]/25 hover:shadow-[0_8px_24px_rgba(43,46,230,0.10)]"
        >
            <div className="relative overflow-hidden bg-slate-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[130px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[145px]"
                />
                {badge && (
                    <span className={`absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase text-white ${badge.bg}`}>
                        {badge.label}
                    </span>
                )}
                {discount > 0 && (
                    <span className="absolute bottom-2 left-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-black text-rose-600 shadow-sm">
                        -{discount}%
                    </span>
                )}
                <button
                    type="button"
                    onClick={handleCart}
                    className={cn(
                        'absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg shadow-md transition-all duration-200 active:scale-95',
                        added
                            ? 'bg-emerald-500 text-white opacity-100'
                            : 'bg-white text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-[#2B2EE6] hover:text-white'
                    )}
                >
                    <ShoppingCart size={12} />
                </button>
                {product.stock <= 5 && (
                    <span className="absolute left-2 top-2 rounded-md bg-rose-500/90 px-1.5 py-0.5 text-[9px] font-black text-white">
                        Low Stock
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-2.5">
                <span className="text-[9.5px] font-black uppercase tracking-wider text-[#2B2EE6]/60">
                    {product.category}
                </span>
                <h3 className="mt-0.5 line-clamp-2 text-[12px] font-black leading-snug text-slate-900 transition-colors group-hover:text-[#2B2EE6] sm:text-[12.5px]">
                    {product.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex items-center gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={9} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                        ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{product.rating}</span>
                    <span className="text-[10px] text-slate-300">·</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400">
                        <TrendingUp size={9} className="text-emerald-500" />{product.sold}
                    </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[14px] font-black text-slate-950">৳{product.price.toLocaleString()}</span>
                        <span className="text-[10px] font-semibold text-slate-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <ChevronRight size={13} className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#2B2EE6]" />
                </div>
            </div>
        </Link>
    )
}

// ─── LIST CARD ────────────────────────────────────────────────────────────────
function ListCard({ product }: { product: Product }) {
    const [added, setAdded] = useState(false)
    const discount = Math.round((1 - product.price / product.originalPrice) * 100)
    const badge = product.badge ? BADGE[product.badge] : null

    const handleCart = (e: React.MouseEvent) => {
        e.preventDefault()
        setAdded(true)
        setTimeout(() => setAdded(false), 1600)
    }

    return (
        <Link
            href={product.href}
            className="group flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-[0_1px_6px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-[#2B2EE6]/25 hover:shadow-[0_4px_16px_rgba(43,46,230,0.08)] sm:gap-4 sm:p-3"
        >
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-[80px] sm:w-[80px]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {badge && (
                    <span className={`absolute left-1 top-1 rounded px-1 py-px text-[8px] font-black uppercase text-white ${badge.bg}`}>
                        {badge.label}
                    </span>
                )}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-[#2B2EE6]/60">{product.category}</span>
                        <h3 className="mt-0.5 truncate text-[13px] font-black text-slate-950 transition-colors group-hover:text-[#2B2EE6] sm:text-[13.5px]">
                            {product.name}
                        </h3>
                    </div>
                    {discount > 0 && (
                        <span className="shrink-0 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-black text-rose-600">
                            -{discount}%
                        </span>
                    )}
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                    <div className="flex items-center gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={9} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                        ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{product.rating} ({product.reviews})</span>
                    <span className="text-[10px] text-slate-300">·</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400">
                        <TrendingUp size={9} className="text-emerald-500" />{product.sold} sold
                    </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[15px] font-black text-slate-950">৳{product.price.toLocaleString()}</span>
                        <span className="text-[10px] font-semibold text-slate-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleCart}
                        className={cn(
                            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-black transition-all duration-200 active:scale-95',
                            added
                                ? 'bg-emerald-500 text-white'
                                : 'bg-[#2B2EE6]/8 text-[#2B2EE6] hover:bg-[#2B2EE6] hover:text-white'
                        )}
                    >
                        <ShoppingCart size={11} />
                        {added ? 'Added' : 'Add'}
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default function AllProducts() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [sort, setSort] = useState('popular')
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [page, setPage] = useState(1)

    const PER_PAGE = 12

    const filtered = useMemo(() => {
        let list = [...ALL_PRODUCTS]

        if (search.trim())
            list = list.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase())
            )

        if (category !== 'All')
            list = list.filter(p => p.category === category)

        switch (sort) {
            case 'popular': list.sort((a, b) => b.sold - a.sold); break
            case 'newest': list.sort((a, b) => b.id - a.id); break
            case 'price_asc': list.sort((a, b) => a.price - b.price); break
            case 'price_desc': list.sort((a, b) => b.price - a.price); break
            case 'rating': list.sort((a, b) => b.rating - a.rating); break
        }

        return list
    }, [search, category, sort])

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const resetPage = () => setPage(1)

    return (
        <section className="bg-[#F4F6FB] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-7">
            <div className="mx-auto max-w-[1500px]">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2B2EE6] text-white shadow-[0_4px_12px_rgba(43,46,230,0.28)]">
                            <Package size={15} />
                        </span>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#2B2EE6] leading-none">
                                Catalogue
                            </p>
                            <h2 className="text-[18px] font-black leading-tight text-slate-950 sm:text-[20px]">
                                All Products
                            </h2>
                        </div>
                    </div>
                    <span className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-[12px] font-black text-slate-500 shadow-sm">
                        {filtered.length} items
                    </span>
                </div>

                {/* TOOLBAR */}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    {/* SEARCH */}
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => { setSearch(e.target.value); resetPage() }}
                            placeholder="Search products..."
                            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-[13px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2B2EE6] focus:ring-2 focus:ring-[#2B2EE6]/10 shadow-sm"
                        />
                        {search && (
                            <button type="button" onClick={() => { setSearch(''); resetPage() }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* SORT */}
                        <select
                            value={sort}
                            onChange={e => { setSort(e.target.value); resetPage() }}
                            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[12.5px] font-bold text-slate-700 outline-none transition focus:border-[#2B2EE6] focus:ring-2 focus:ring-[#2B2EE6]/10 shadow-sm cursor-pointer"
                        >
                            {SORT_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>

                        {/* FILTER TOGGLE (mobile) */}
                        <button
                            type="button"
                            onClick={() => setShowFilters(v => !v)}
                            className={cn(
                                'flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[12.5px] font-bold shadow-sm transition sm:hidden',
                                showFilters
                                    ? 'border-[#2B2EE6] bg-[#2B2EE6] text-white'
                                    : 'border-slate-200 bg-white text-slate-700'
                            )}
                        >
                            <SlidersHorizontal size={13} />
                            Filter
                        </button>

                        {/* VIEW TOGGLE */}
                        <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:flex">
                            <button
                                type="button"
                                onClick={() => setView('grid')}
                                className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition', view === 'grid' ? 'bg-[#2B2EE6] text-white' : 'text-slate-400 hover:text-slate-700')}
                            >
                                <Grid2X2 size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setView('list')}
                                className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition', view === 'list' ? 'bg-[#2B2EE6] text-white' : 'text-slate-400 hover:text-slate-700')}
                            >
                                <LayoutList size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CATEGORY PILLS */}
                <div className={cn('mt-3 flex flex-wrap gap-1.5', !showFilters && 'hidden sm:flex')}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => { setCategory(cat); resetPage() }}
                            className={cn(
                                'rounded-lg border px-3 py-1.5 text-[11.5px] font-bold transition-all duration-200 active:scale-95',
                                category === cat
                                    ? 'border-[#2B2EE6] bg-[#2B2EE6] text-white shadow-[0_3px_10px_rgba(43,46,230,0.20)]'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6]'
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* PRODUCT OUTPUT */}
                {paginated.length === 0 ? (
                    <div className="mt-12 flex flex-col items-center justify-center gap-3 py-10 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                            <Package size={26} />
                        </span>
                        <p className="text-[15px] font-black text-slate-700">No products found</p>
                        <p className="text-[13px] text-slate-400">Try adjusting your search or filters.</p>
                        <button
                            type="button"
                            onClick={() => { setSearch(''); setCategory('All'); resetPage() }}
                            className="mt-1 rounded-xl bg-[#2B2EE6] px-5 py-2 text-[13px] font-black text-white transition hover:bg-[#2326C9]"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className={cn(
                        'mt-4',
                        view === 'grid'
                            ? 'grid grid-cols-2 gap-2 xs:gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                            : 'flex flex-col gap-2'
                    )}>
                        {paginated.map(p =>
                            view === 'grid'
                                ? <GridCard key={p.id} product={p} />
                                : <ListCard key={p.id} product={p} />
                        )}
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={14} className="rotate-180" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1
                            const isNear = Math.abs(p - page) <= 1 || p === 1 || p === totalPages
                            if (!isNear) {
                                if (p === 2 || p === totalPages - 1)
                                    return <span key={p} className="text-[12px] text-slate-400">…</span>
                                return null
                            }
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPage(p)}
                                    className={cn(
                                        'flex h-9 w-9 items-center justify-center rounded-xl border text-[12.5px] font-black shadow-sm transition',
                                        page === p
                                            ? 'border-[#2B2EE6] bg-[#2B2EE6] text-white shadow-[0_3px_10px_rgba(43,46,230,0.22)]'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6]'
                                    )}
                                >
                                    {p}
                                </button>
                            )
                        })}

                        <button
                            type="button"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}