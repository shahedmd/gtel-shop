'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
    ChevronRight,
    Flame,
    ShoppingCart,
    Star,
    TrendingUp,
} from 'lucide-react'
import { ALL_PRODUCTS, Product } from '@/Components/Ui/all-products-data'

const BADGE = {
    hot: { label: 'Hot', bg: 'bg-rose-500' },
    new: { label: 'New', bg: 'bg-emerald-500' },
    sale: { label: 'Sale', bg: 'bg-amber-500' },
}

function cn(...c: (string | false | null | undefined)[]) {
    return c.filter(Boolean).join(' ')
}

function ProductCard({ product, rank }: { product: Product; rank: number }) {
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
                    className="h-[130px] w-full object-cover transition-transform duration-500 group-hover:scale-105 xs:h-[140px] sm:h-[150px] lg:h-[140px] xl:h-[150px]"
                />
                <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950/75 text-[9px] font-black text-white backdrop-blur-sm">
                    {rank}
                </span>
                {badge && (
                    <span className={`absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white ${badge.bg}`}>
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
                    aria-label="Add to cart"
                >
                    <ShoppingCart size={12} />
                </button>
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
                            <Star
                                key={i}
                                size={9}
                                className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                        {product.rating}
                    </span>
                    <span className="text-[10px] text-slate-300">·</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400">
                        <TrendingUp size={9} className="text-emerald-500" />
                        {product.sold}
                    </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                            ৳{product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 line-through">
                            ৳{product.originalPrice.toLocaleString()}
                        </span>
                    </div>
                    <ChevronRight
                        size={13}
                        className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#2B2EE6]"
                    />
                </div>
            </div>
        </Link>
    )
}

export default function BestSellingProducts() {
    // লোকাল ডুপ্লিকেট ডাটা রিমুভ করে সরাসরি ALL_PRODUCTS থেকে প্রথম ১০টি প্রোডাক্ট নেওয়া হয়েছে
    const bestSellers = ALL_PRODUCTS.slice(0, 10)

    return (
        <section className="bg-[#F4F6FB] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-7">
            <div className="mx-auto max-w-[1500px]">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.30)]">
                            <Flame size={15} />
                        </span>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 leading-none">
                                Best Sellers
                            </p>
                            <h2 className="text-[18px] font-black leading-tight text-slate-950 sm:text-[20px]">
                                Top Selling Products
                            </h2>
                        </div>
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-black text-slate-600 shadow-sm transition-all hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6]"
                    >
                        View All
                        <ChevronRight size={13} />
                    </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 xs:gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6">
                    {bestSellers.map((p, i) => (
                        <ProductCard key={p.id} product={p} rank={i + 1} />
                    ))}
                </div>
                <div className="mt-3 sm:hidden">
                    <Link
                        href="/products"
                        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-[12.5px] font-black text-slate-700 shadow-sm transition hover:border-[#2B2EE6]/30 hover:text-[#2B2EE6]"
                    >
                        View All Products <ChevronRight size={13} />
                    </Link>
                </div>
            </div>
        </section>
    )
}