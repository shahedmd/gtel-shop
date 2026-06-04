import Link from 'next/link'
import {
    Camera,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
    Truck,
    Video,
    Wrench,
    Zap,
} from 'lucide-react'

const categories = [
    { label: 'Microscope', href: '/microscope' },
    { label: 'Hot Gun', href: '/hotgun' },
    { label: 'Soldering Iron', href: '/soldering-iron' },
    { label: 'Cutting Machine', href: '/cutting-machine' },
    { label: 'All Tools', href: '/tools/all' },
]

const support = [
    { label: 'My Account', href: '/account' },
    { label: 'Cart', href: '/cart' },
    { label: 'Order Tracking', href: '/tracking' },
    { label: 'Return Policy', href: '/return-policy' },
    { label: 'Contact', href: '/contact' },
]

const highlights = [
    {
        icon: Truck,
        title: 'Fast Delivery',
        text: 'Reliable delivery across Bangladesh.',
    },
    {
        icon: ShieldCheck,
        title: 'Trusted Quality',
        text: 'Selected tools for repair professionals.',
    },
    {
        icon: Wrench,
        title: 'Technician Focused',
        text: 'Products made for real repair work.',
    },
]

const socials = [
    { label: 'Facebook', href: '#', icon: MessageCircle },
    { label: 'Instagram', href: '#', icon: Camera },
    { label: 'YouTube', href: '#', icon: Video },
]

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">

            {/* HIGHLIGHTS STRIP */}
            <div className="border-b border-slate-100 bg-slate-50">
                <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8">
                    <div className="grid gap-2 sm:grid-cols-3">
                        {highlights.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.title}
                                    className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2B2EE6]/10 text-[#2B2EE6]">
                                        <Icon size={17} />
                                    </span>
                                    <span>
                                        <span className="block text-[13px] font-black text-slate-900">
                                            {item.title}
                                        </span>
                                        <span className="block text-[12px] leading-4 text-slate-400 mt-0.5">
                                            {item.text}
                                        </span>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">

                    {/* BRAND */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2B2EE6] text-white shadow-[0_6px_18px_rgba(43,46,230,0.25)]">
                                <Zap size={18} />
                            </span>
                            <span>
                                <span className="block text-[17px] font-black leading-none text-slate-950">
                                    GTEL Shop
                                </span>
                                <span className="mt-0.5 block text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                                    Repair Tools
                                </span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-[280px] text-[13px] leading-6 text-slate-500">
                            Professional mobile repairing tools, equipment & accessories for technicians and service shops across Bangladesh.
                        </p>

                        <div className="mt-4 flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2B2EE6]/8 px-2.5 py-1 text-[11px] font-bold text-[#2B2EE6]">
                                Premium Tools
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Active Support
                            </span>
                        </div>

                        <div className="mt-4 flex items-center gap-1.5">
                            {socials.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        aria-label={item.label}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#2B2EE6]/30 hover:bg-[#2B2EE6]/5 hover:text-[#2B2EE6]"
                                    >
                                        <Icon size={16} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* CATEGORIES */}
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                            Categories
                        </h3>
                        <div className="mt-3 grid gap-2">
                            {categories.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#2B2EE6]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                            Support
                        </h3>
                        <div className="mt-3 grid gap-2">
                            {support.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#2B2EE6]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT + NEWSLETTER */}
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                            Contact
                        </h3>

                        <div className="mt-3 grid gap-2.5">
                            <a
                                href="tel:01720677206"
                                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#2B2EE6]"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition group-hover:bg-[#2B2EE6]/10 group-hover:text-[#2B2EE6]">
                                    <Phone size={13} />
                                </span>
                                01720-677206
                            </a>
                            <a
                                href="mailto:support@gtelshop.com"
                                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#2B2EE6]"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition group-hover:bg-[#2B2EE6]/10 group-hover:text-[#2B2EE6]">
                                    <Mail size={13} />
                                </span>
                                support@gtelshop.com
                            </a>
                            <p className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-500">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                    <MapPin size={13} />
                                </span>
                                Bangladesh
                            </p>
                        </div>

                        {/* NEWSLETTER */}
                        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                            <p className="text-[12px] font-black text-slate-800">
                                Get product updates
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-400">
                                New arrivals & deals — no spam.
                            </p>
                            <div className="mt-2.5 flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2B2EE6] focus:ring-2 focus:ring-[#2B2EE6]/12"
                                />
                                <button
                                    type="submit"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2B2EE6] text-white shadow-[0_4px_12px_rgba(43,46,230,0.25)] transition hover:bg-[#2326C9] active:scale-95"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-8 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] font-medium text-slate-400">
                        © 2026 GTEL Shop. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {['Privacy Policy', 'Terms', 'Return Policy'].map((label, i) => (
                            <Link
                                key={label}
                                href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-[12px] font-medium text-slate-400 transition hover:text-[#2B2EE6]"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}