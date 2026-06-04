'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
    ChevronRight, MessageCircle, ShoppingCart, Heart, Share2,
    Star, TrendingUp, Shield, Truck, RotateCcw, CheckCircle2, X, ZoomIn,
    AlertTriangle, Zap, MapPin, Clock,
} from 'lucide-react'
import type { Product } from '@/Components/Ui/all-products-data'
import Button from './button'
import Badge from './badge'
import Input from './input'

interface Props {
    product: Product
}

function cn(...c: (string | false | null | undefined)[]) {
    return c.filter(Boolean).join(' ')
}

const BADGE: Record<'hot' | 'new' | 'sale', { label: string; bg: string }> = {
    hot: { label: 'Hot', bg: 'bg-rose-500' },
    new: { label: 'New', bg: 'bg-emerald-500' },
    sale: { label: 'Sale', bg: 'bg-amber-500' },
}

interface Review {
    id: string
    name: string
    rating: number
    comment: string
    date: string
    verified: boolean
}

export default function ProductDetails({ product }: Props) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [qty, setQty] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [activeTab, setActiveTab] = useState('details')
    const [reviewName, setReviewName] = useState('')
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewComment, setReviewComment] = useState('')
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            name: 'রহিম আহমেদ',
            rating: 5,
            comment: 'অসাধারণ মানের পণ্য। মোবাইল রিপেয়ার করতে সব ধরনের টুলস এতে আছে। প্যাকেজিং খুবই ভালো ছিল এবং দ্রুত ডেলিভারি পেয়েছি। আমি সবাইকে সুপারিশ করছি।',
            date: '25 মে 2024',
            verified: true,
        },
        {
            id: '2',
            name: 'Fatima Khan',
            rating: 5,
            comment: 'খুবই ভালো প্রোডাক্ট কোয়ালিটি এবং সাশ্রয়ী মূল্যে পাওয়া যাচ্ছে। আমি এটি ব্যবহার করে খুবই সন্তুষ্ট।',
            date: '23 মে 2024',
            verified: true,
        },
        {
            id: '3',
            name: 'সোহেল ইউসুফ',
            rating: 4,
            comment: 'দারাজের চেয়ে অনেক কম দামে পাওয়া গেছে। কোয়ালিটি একই আছে। আবার কিনব এবং সবাইকে বলব।',
            date: '20 মে 2024',
            verified: true,
        },
    ])

    const baseImages: string[] = product.images && product.images.length > 0 ? product.images : [product.image]
    const images: string[] = [baseImages[0], baseImages[0], baseImages[0]]
    
    const discount = Math.round((1 - product.price / product.originalPrice) * 100)
    const badge = product.badge ? BADGE[product.badge] : null
    const whatsappUrl = `https://wa.me/${product.whatsapp ?? ''}?text=Hi, I'm interested in: ${product.name}`

    const handleAddReview = () => {
        if (reviewName && reviewComment) {
            const newReview: Review = {
                id: String(reviews.length + 1),
                name: reviewName,
                rating: reviewRating,
                comment: reviewComment,
                date: new Date().toLocaleDateString('bn-BD'),
                verified: false,
            }
            setReviews([newReview, ...reviews])
            setReviewName('')
            setReviewComment('')
            setReviewRating(5)
        }
    }

    const productDetails = {
        'মডেল': 'Professional 45 in 1',
        'উপকরণ': 'Chrome Vanadium Steel',
        'ওয়ারেন্টি': '1 বছর',
        'উৎস দেশ': 'চায়না',
        'রঙ': 'লাল ও কালো',
        'ওজন': '350 গ্রাম',
        'প্যাকেজ সাইজ': '20 × 10 × 5 সেমি',
    }

    const shippingInfo = [
        { icon: Truck, label: 'ঢাকা এলাকায়', time: '2-4 ঘণ্টা' },
        { icon: MapPin, label: 'সারাদেশে', time: '2-3 দিন' },
        { icon: Clock, label: 'শিপিং চার্জ', time: 'ফ্রি 500+ টাকা' },
    ]

    const highlights = [
        { icon: '✓', text: '45টি বিভিন্ন সাইজের ড্রাইভার' },
        { icon: '✓', text: 'সব ধরনের স্মার্টফোন এবং ট্যাবলেটের জন্য উপযুক্ত' },
        { icon: '✓', text: 'পেশাদার মানের স্টেইনলেস স্টিল' },
        { icon: '✓', text: 'সহজ বহনযোগ্য ক্যারি ব্যাগ' },
        { icon: '✓', text: 'আজীবন কাস্টমার সাপোর্ট' },
        { icon: '✓', text: 'বিশ্বব্যাপী ব্যবহৃত ব্র্যান্ড' },
    ]

    const usageSteps = [
        { title: '👀 খোলা এবং পরিদর্শন', desc: 'ডিভাইস খোলার আগে সম্পূর্ণরূপে পাওয়ার অফ করুন এবং সকল কেবেল অপসারণ করুন।' },
        { title: '🔍 সঠিক ড্রাইভার নির্বাচন', desc: 'আপনার ডিভাইসের স্ক্রুর সাথে মানানসই সঠিক ড্রাইভার বিট নির্বাচন করুন।' },
        { title: '🧲 ম্যাগনেটিক সাপোর্ট ব্যবহার করুন', desc: 'ছোট স্ক্রু হারানো এড়াতে ম্যাগনেটিক রড ব্যবহার করুন।' },
        { title: '⚠️ সাবধানে হ্যান্ডেল করুন', desc: 'সংবেদনশীল উপাদানের সাথে সাবধানে পরিচালনা করুন এবং অপ্রয়োজনীয় চাপ এড়ান।' },
        { title: '✓ পুনরায় সংযোজন করুন', desc: 'কাজ শেষ হলে সমস্ত স্ক্রু সঠিক জায়গায় রেখে দিন এবং ডিভাইস পুনরায় একত্রিত করুন।' },
    ]

    const packageContents = [
        '1x মূল টুলকিট হ্যান্ডেল',
        '45x বিভিন্ন সাইজের ড্রাইভার বিট',
        '1x পিনসেট',
        '1x স্ক্রু এক্সট্রাক্টর',
        '1x ম্যাগনেটিক রড',
        '1x ক্যারি ব্যাগ',
        '1x ব্যবহারকারী ম্যানুয়াল',
        '1x ওয়ারেন্টি কার্ড',
    ]

    return (
        <section className="min-h-screen bg-[#F4F6FB] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-8">
            <div className="mx-auto max-w-7xl">

                {/* ব্রেডক্রাম্ব */}
                <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Link href="/" className="hover:text-[#2B2EE6] transition">হোম</Link>
                    <ChevronRight size={12} />
                    <Link href="/products" className="hover:text-[#2B2EE6] transition">মোবাইল টুলস</Link>
                    <ChevronRight size={12} />
                    <span className="truncate max-w-xs text-slate-600">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">

                    {/* ======== মাল্টি ইমেজ গ্যালারি ======== */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-3 sticky top-5">
                            {/* মেইন ইমেজ */}
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm group cursor-pointer"
                                onClick={() => setLightboxOpen(true)}>
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="h-80 w-full object-cover sm:h-96 lg:h-[500px] group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* জুম আইকন */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white rounded-full p-3 shadow-lg">
                                        <ZoomIn size={28} className="text-slate-900" />
                                    </div>
                                </div>

                                {/* ব্যাজ */}
                                {badge && (
                                    <span className={`absolute right-3 top-3 rounded-lg px-3 py-1.5 text-xs font-black uppercase text-white ${badge.bg} shadow-lg`}>
                                        {badge.label}
                                    </span>
                                )}

                                {/* ডিসকাউন্ট */}
                                {discount > 0 && (
                                    <div className="absolute left-3 top-3 text-center">
                                        <span className="block text-5xl font-black text-rose-600">-{discount}%</span>
                                        <span className="text-xs text-rose-600 font-bold">ছাড়</span>
                                    </div>
                                )}

                                {/* স্টক সতর্কতা */}
                                {product.stock <= 5 && (
                                    <span className="absolute bottom-3 left-3 rounded-lg bg-rose-500/90 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                                        ⚠️ মাত্র {product.stock}টি বাকি!
                                    </span>
                                )}
                            </div>

                            {/* ইমেজ থাম্বনেইল */}
                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {images.map((img: string, i: number) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSelectedImage(i)}
                                            className={cn(
                                                'h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all hover:scale-105',
                                                selectedImage === i
                                                    ? 'border-[#2B2EE6] shadow-[0_0_0_3px_rgba(43,46,230,0.15)]'
                                                    : 'border-slate-200 hover:border-[#2B2EE6]/40'
                                            )}
                                        >
                                            <img src={img} alt="" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* শেয়ার এবং উইশলিস্ট */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="md"
                                    fullWidth
                                    leftIcon={<Share2 size={14} />}
                                >
                                    শেয়ার করুন
                                </Button>
                                <Button
                                    variant="outline"
                                    size="md"
                                    onClick={() => setWishlist(!wishlist)}
                                    leftIcon={<Heart size={14} fill={wishlist ? 'currentColor' : 'none'} className={wishlist ? 'text-rose-500' : ''} />}
                                >
                                    {wishlist ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* ======== পণ্য তথ্য (ডান পাশ) ======== */}
                    <div className="flex flex-col gap-5">

                        {/* ব্র্যান্ড এবং স্টক স্ট্যাটাস */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="primary" size="sm">
                                    🔧 {product.category}
                                </Badge>
                                <Badge variant={product.stock > 20 ? 'success' : product.stock > 5 ? 'warning' : 'danger'} size="sm">
                                    {product.stock > 20 ? '✓ স্টকে আছে' : product.stock > 5 ? '⚠️ সীমিত স্টক' : '❌ শেষ হয়ে যাচ্ছে'}
                                </Badge>
                            </div>
                            <h1 className="mt-3 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                {product.name}
                            </h1>
                            {product.sku && (
                                <p className="mt-2 text-xs font-semibold text-slate-400">SKU: {product.sku}</p>
                            )}
                        </div>

                        {/* রেটিং এবং বিক্রয় */}
                        <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white p-3">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i: number) => (
                                        <Star key={i} size={16}
                                            className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-slate-700">{product.rating}/5</span>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="text-slate-600">({product.reviews} রিভিউ)</span>
                                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                                    <TrendingUp size={12} />{product.sold.toLocaleString()} বিক্রিত
                                </span>
                            </div>
                        </div>

                        {/* মূল্য নির্ধারণ */}
                        <div className="space-y-2 rounded-xl border-2 border-[#2B2EE6] bg-gradient-to-br from-[#2B2EE6]/5 to-transparent p-4">
                            <div className="flex items-end gap-3">
                                <span className="text-5xl font-black text-slate-950">৳{product.price.toLocaleString()}</span>
                                {discount > 0 && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base font-semibold text-slate-400 line-through">
                                            ৳{product.originalPrice.toLocaleString()}
                                        </span>
                                        <Badge variant="danger" size="sm">
                                            সাশ্রয় ৳{(product.originalPrice - product.price).toLocaleString()}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-slate-600">প্রতিটি অর্ডারে EMI সুবিধা উপলব্ধ</p>
                        </div>

                        {/* সংক্ষিপ্ত বর্ণনা */}
                        {product.shortDesc && (
                            <p className="text-sm leading-relaxed text-slate-700 p-3 bg-white rounded-xl border border-slate-200/80">
                                {product.shortDesc}
                            </p>
                        )}

                        {/* হাইলাইটস */}
                        <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200/80">
                            <p className="text-xs font-black uppercase tracking-widest text-[#2B2EE6]/70">প্রধান সুবিধা</p>
                            <div className="space-y-2">
                                {highlights.map((h, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="text-emerald-600 font-bold text-lg">{h.icon}</span>
                                        <span>{h.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* পরিমাণ নির্বাচক */}
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                            <span className="text-xs font-semibold text-slate-600 px-2">পরিমাণ:</span>
                            <button type="button"
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-slate-500 hover:bg-slate-100 transition">
                                −
                            </button>
                            <span className="w-12 text-center text-base font-black text-slate-900 border-l border-r border-slate-200 py-1">{qty}</span>
                            <button type="button"
                                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-slate-500 hover:bg-slate-100 transition">
                                +
                            </button>
                            <span className="text-xs text-slate-500 ml-auto">৳{(product.price * qty).toLocaleString()}</span>
                        </div>

                        {/* তিনটি প্রধান বোতাম */}
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                leftIcon={<ShoppingCart size={16} />}
                                onClick={() => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 1500) }}
                                className={addedToCart ? 'bg-emerald-600 hover:bg-emerald-500' : ''}
                            >
                                {addedToCart ? '✓ কার্টে যোগ হয়েছে!' : 'কার্টে যোগ করুন'}
                            </Button>

                            <Button
                                variant="secondary"
                                size="lg"
                                fullWidth
                                leftIcon={<Zap size={16} />}
                            >
                                সরাসরি অর্ডার করুন
                            </Button>

                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    fullWidth
                                    leftIcon={<MessageCircle size={16} />}
                                >
                                    WhatsApp এ অর্ডার করুন
                                </Button>
                            </a>
                        </div>

                        {/* ডেলিভারি তথ্য */}
                        <div className="grid grid-cols-3 gap-2">
                            {shippingInfo.map((info) => {
                                const Icon = info.icon
                                return (
                                    <div key={info.label} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200/80 bg-white p-3 text-center">
                                        <Icon size={20} className="text-[#2B2EE6]" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-600">{info.label}</p>
                                            <p className="text-xs font-black text-[#2B2EE6]">{info.time}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* বিশ্বাস ব্যাজ */}
                        <div className="space-y-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center gap-2 text-xs text-green-700">
                                <CheckCircle2 size={16} />
                                <span className="font-semibold">100% খাঁটি এবং নতুন পণ্য</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-green-700">
                                <CheckCircle2 size={16} />
                                <span className="font-semibold">30 দিনের মানি-ব্যাক গ্যারান্টি</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======== ট্যাব সেকশন ======== */}
                <div className="mt-12">
                    <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
                        {[
                            { id: 'details', label: '📋 বিস্তারিত তথ্য' },
                            { id: 'usage', label: '🔧 ব্যবহার নির্দেশাবলী' },
                            { id: 'reviews', label: `⭐ রিভিউ (${reviews.length})` },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap',
                                    activeTab === tab.id
                                        ? 'border-[#2B2EE6] text-[#2B2EE6]'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {/* বিস্তারিত তথ্য ট্যাব */}
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                                    <div className="border-b border-slate-100 px-5 py-4 bg-gradient-to-r from-[#2B2EE6]/5 to-transparent">
                                        <p className="text-sm font-black text-[#2B2EE6]">📦 পণ্যের বৈশিষ্ট্য</p>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {Object.entries(productDetails).map(([key, val]) => (
                                            <div key={key} className="flex px-5 py-3 hover:bg-slate-50 transition">
                                                <span className="w-1/3 font-bold text-[#2B2EE6] text-sm">{key}</span>
                                                <span className="w-2/3 font-semibold text-slate-700 text-sm">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                                    <div className="mb-4">
                                        <p className="text-sm font-black text-[#2B2EE6] mb-4">📦 প্যাকেজ সামগ্রী</p>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {packageContents.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
                                    <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-amber-900 mb-1">গুরুত্বপূর্ণ নোট:</p>
                                        <p className="text-xs text-amber-800">এই পণ্য শুধুমাত্র পেশাদার এবং অভিজ্ঞ ব্যবহারকারীদের জন্য। যদি আপনি নিশ্চিত না হন তাহলে পেশাদারের কাছে যান।</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ব্যবহার নির্দেশাবলী ট্যাব */}
                        {activeTab === 'usage' && (
                            <div className="space-y-4">
                                {usageSteps.map((step, i) => (
                                    <div key={i} className="rounded-xl border border-slate-200/80 bg-white p-4 hover:shadow-md transition">
                                        <h4 className="text-sm font-black text-slate-900 mb-2">{step.title}</h4>
                                        <p className="text-xs text-slate-700 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* রিভিউ ট্যাব */}
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                                    <h3 className="mb-4 text-sm font-black text-slate-900">আপনার রিভিউ যোগ করুন</h3>

                                    <div className="space-y-4">
                                        <Input
                                            label="আপনার নাম"
                                            placeholder="নাম লিখুন..."
                                            value={reviewName}
                                            onChange={(e) => setReviewName(e.target.value)}
                                        />

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-2 block">রেটিং দিন</label>
                                            ```tsx
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewRating(star)}
                                                        className="transition-transform hover:scale-110"
                                                    >
                                                        <Star
                                                            size={32}
                                                            className={star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-2 block">আপনার মন্তব্য</label>
                                            <textarea
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                                placeholder="পণ্য সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..."
                                                className="w-full rounded-xl border border-slate-200 p-3 text-xs resize-none focus:border-[#2B2EE6] focus:outline-none transition focus:ring-2 focus:ring-[#2B2EE6]/20"
                                                rows={4}
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                আপনার অভিজ্ঞতা অন্যদের সাহায্য করতে পারে। বিস্তারিত মন্তব্য লিখুন।
                                            </p>
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            fullWidth
                                            onClick={handleAddReview}
                                            disabled={!reviewName || !reviewComment}
                                        >
                                            রিভিউ জমা দিন
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {reviews.length === 0 ? (
                                        <div className="text-center py-8 bg-white rounded-xl border border-slate-200/80">
                                            <p className="text-slate-500 text-xs">এখনও কোন রিভিউ নেই। প্রথম জন হন!</p>
                                        </div>
                                    ) : (
                                        reviews.map((review) => (
                                            <div key={review.id} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                                                        <p className="text-xs text-slate-400 mt-0.5">{review.date}</p>
                                                    </div>
                                                    {review.verified && (
                                                        <Badge variant="success" size="sm">
                                                            ✓ যাচাইকৃত ক্রেতা
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex gap-1 mb-3">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={15}
                                                            className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
                                                        />
                                                    ))}
                                                    <span className="text-xs font-bold text-slate-700 ml-2">{review.rating}/5</span>
                                                </div>

                                                <p className="text-xs text-slate-700 leading-relaxed">{review.comment}</p>

                                                <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
                                                    <button className="text-xs text-slate-500 hover:text-slate-700 transition">
                                                        👍 সহায়ক ({Math.floor(Math.random() * 50)})
                                                    </button>
                                                    <button className="text-xs text-slate-500 hover:text-slate-700 transition">
                                                        👎 সহায়ক নয় ({Math.floor(Math.random() * 10)})
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ======== অনুরূপ পণ্য সেকশন ======== */}
                <div className="mt-14 pt-10 border-t border-slate-200">
                    <h2 className="text-lg font-black text-slate-950 mb-6">🔗 এই ধরনের অন্যান্য পণ্য</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm hover:shadow-md transition cursor-pointer">
                                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-2 flex items-center justify-center">
                                    <ShoppingCart size={32} className="text-slate-400" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mb-1">সমজাতীয় পণ্য {i}</p>
                                <p className="text-sm font-black text-[#2B2EE6]">৳{(2500 + i * 500).toLocaleString()}</p>
                                <div className="flex gap-1 mt-2">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star key={j} size={12} className={j < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ফিরে যাওয়ার বোতাম */}
                <div className="mt-10 mb-6">
                    <Link href="/products">
                        <Button
                            variant="outline"
                            size="lg"
                            leftIcon={<ChevronRight size={16} className="rotate-180" />}
                        >
                            সকল পণ্যে ফিরে যান
                        </Button>
                    </Link>
                </div>

            </div>

            {/* ======== লাইটবক্স / জুম মোডাল ======== */}
            {lightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <div 
                        className="relative max-w-3xl w-full" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setLightboxOpen(false)}
                            className="absolute -right-10 -top-10 text-white hover:text-slate-300 transition z-10"
                        >
                            <X size={32} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedImage(prev => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full rounded-lg"
                        />

                        {images.length > 1 && (
                            <div className="mt-4 flex gap-2 overflow-x-auto justify-center pb-2">
                                {images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setSelectedImage(i)}
                                        className={cn(
                                            'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                                            selectedImage === i
                                                ? 'border-white shadow-lg'
                                                : 'border-white/30 opacity-60 hover:opacity-100'
                                        )}
                                    >
                                        <img src={img} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 text-center text-white/70 text-xs">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}