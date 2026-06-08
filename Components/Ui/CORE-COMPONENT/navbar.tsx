'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  Flame,
  Home,
  Menu,
  Microscope,
  Search,
  ShoppingCart,
  User,
  Wrench,
  X,
  Zap,
  Scissors,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'Build Setup',
    href: '/setups/builder',
    icon: Wrench,
    badge: 'Popular',
  },
  {
    label: 'Microscope',
    href: '/categories/microscope',
    icon: Microscope,
    badge: 'New',
  },
  {
    label: 'Hot Gun',
    href: '/categories/hotgun',
    icon: Flame,
  },
  {
    label: 'Soldering Iron',
    href: '/categories/soldering-iron',
    icon: Zap,
  },
  {
    label: 'Cutting Machine',
    href: '/categories/cutting-machine',
    icon: Scissors,
  },
  {
    label: 'Tools',
    href: '/categories',
    icon: Wrench,
    children: [
      {
        label: 'Screw Driver',
        href: '/categories/screwdriver',
        description: 'Professional precision repair tools',
      },
      {
        label: 'Glue Remover',
        href: '/categories/glue-remover',
        description: 'Premium cleaning & remover liquids',
      },
      {
        label: 'Charger',
        href: '/categories/charger',
        description: 'Fast charging accessories',
      },
      {
        label: 'LCD Separator',
        href: '/categories/lcd-separator',
        description: 'Display repair equipment',
      },
      {
        label: 'All Tools',
        href: '/categories/categories',
        description: 'Browse complete collection',
      },
    ],
  },
]

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname()
  const searchRef = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [dropdown, setDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const cartCount = 3

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchRef.current?.focus(), 80)
    }
  }, [searchOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdown(label)
  }

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120)
  }

  const openSearch = () => {
    setSearchOpen(true)
    setDropdown(null)
    setMobileOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* TOP BAR */}
      <div className="relative overflow-hidden bg-[#070B1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,46,230,0.18),transparent_35%)]" />
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-center px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white/75 sm:text-xs">
          Free delivery on orders over BDT 2,000
          <span className="mx-2 hidden text-white/20 sm:inline">•</span>
          <span className="hidden sm:inline">Call 01720-677206</span>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-2xl shadow-[0_2px_16px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-7">
          <div className="flex h-[68px] items-center gap-2 sm:h-[76px]">

            {/* LOGO */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 transition-all duration-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2B2EE6] text-white shadow-[0_6px_18px_rgba(43,46,230,0.25)] transition-all duration-300 group-hover:scale-105">
                <Zap size={19} />
              </span>
              {!searchOpen && (
                <span className="hidden sm:block">
                  <span className="block text-[18px] font-black tracking-tight text-slate-950 leading-none">
                    GTEL
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-400 tracking-wide leading-none mt-0.5">
                    SHOP
                  </span>
                </span>
              )}
            </Link>

            {/* DESKTOP NAV */}
            {!searchOpen && (
              <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)

                  return (
                    <div
                      key={item.label}
                      className="relative shrink-0"
                      onMouseEnter={() => item.children && openDropdown(item.label)}
                      onMouseLeave={() => item.children && closeDropdown()}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'group inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-bold transition-all duration-200 ease-out',
                          active
                            ? 'bg-[#2B2EE6] text-white shadow-[0_4px_14px_rgba(43,46,230,0.22)]'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-[#2B2EE6]'
                        )}
                      >
                        <Icon
                          size={14}
                          className={cn(
                            'shrink-0 transition-colors duration-200',
                            active ? 'text-white' : 'text-slate-400 group-hover:text-[#2B2EE6]'
                          )}
                        />
                        <span className="whitespace-nowrap">{item.label}</span>
                        {item.badge && (
                          <span className={cn(
                            'rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase leading-none',
                            active ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
                          )}>
                            {item.badge}
                          </span>
                        )}
                        {item.children && (
                          <ChevronDown
                            size={13}
                            className={cn(
                              'shrink-0 transition-transform duration-200',
                              dropdown === item.label && 'rotate-180'
                            )}
                          />
                        )}
                      </Link>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {item.children && dropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            onMouseEnter={() => openDropdown(item.label)}
                            onMouseLeave={closeDropdown}
                            className="absolute left-0 top-full mt-3 w-[310px] rounded-2xl border border-slate-200/80 bg-white/98 p-2.5 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
                          >
                            <div className="mb-2 px-2 pt-1">
                              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                                Repair Tools
                              </h3>
                              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                                Premium accessories & tools
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[#F0F3FF]"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 transition-colors duration-200 group-hover:bg-[#2B2EE6]" />
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-[13px] font-bold text-slate-700 transition-colors duration-200 group-hover:text-[#2B2EE6]">
                                      {child.label}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] leading-4 text-slate-400">
                                      {child.description}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </nav>
            )}

            {/* SEARCH BAR (expanded) */}
            {searchOpen && (
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm ring-4 ring-[#2B2EE6]/6">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search premium repair tools..."
                  className="h-12 w-full min-w-0 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeSearch}
                  className="shrink-0 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-black text-slate-700 transition-all hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            )}

            {/* RIGHT ACTIONS */}
            {!searchOpen && (
              <div className="ml-auto flex shrink-0 items-center gap-1.5">
                {/* SEARCH */}
                <button
                  type="button"
                  onClick={openSearch}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px"
                >
                  <Search size={17} />
                </button>

                {/* CART */}
                <Link
                  href="/cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px"
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#2B2EE6] px-1 text-[10px] font-black text-white shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* ACCOUNT */}
                <Link
                  href="/account"
                  className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px sm:flex"
                >
                  <User size={18} />
                </Link>

                {/* SIGN IN */}
                <Link
                  href="/login"
                  className="hidden h-10 items-center justify-center rounded-xl bg-[#070B1A] px-5 text-[13px] font-black text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-px xl:flex"
                >
                  Sign In
                </Link>

                {/* HAMBURGER */}
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2B2EE6] text-white shadow-[0_4px_14px_rgba(43,46,230,0.28)] transition-all hover:bg-[#2326C9] active:scale-95 xl:hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={mobileOpen ? 'close' : 'open'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center"
                    >
                      {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[88vw] flex-col bg-white shadow-[-8px_0_32px_rgba(15,23,42,0.12)] xl:hidden"
          >
            {/* DRAWER HEADER */}
            <div className="flex h-[68px] items-center justify-between border-b border-slate-100 px-4">
              <Link href="/" onClick={closeMobile} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2B2EE6] text-white shadow-[0_4px_12px_rgba(43,46,230,0.25)]">
                  <Zap size={18} />
                </span>
                <span>
                  <span className="block text-[15px] font-black text-slate-950 leading-none">
                    GTEL Shop
                  </span>
                  <span className="mt-0.5 block text-[10px] font-semibold text-slate-400 tracking-wide leading-none">
                    Premium Repair Tools
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
              >
                <X size={17} />
              </button>
            </div>

            {/* DRAWER BODY */}
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                if (item.children) {
                  const expanded = mobileExpanded === item.label
                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded((v) =>
                            v === item.label ? null : item.label
                          )
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99]"
                      >
                        <Icon size={16} className="shrink-0 text-slate-400" />
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          size={15}
                          className={cn(
                            'shrink-0 text-slate-400 transition-transform duration-200',
                            expanded && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key="submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="ml-7 border-l-2 border-slate-100 py-1 pl-3">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={closeMobile}
                                  className="block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-500 transition-all hover:bg-[#F0F3FF] hover:text-[#2B2EE6] active:scale-[0.99]"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-bold transition-all active:scale-[0.99]',
                      active
                        ? 'bg-[#2B2EE6] text-white shadow-[0_4px_12px_rgba(43,46,230,0.22)]'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <Icon
                      size={16}
                      className={cn(
                        'shrink-0',
                        active ? 'text-white' : 'text-slate-400'
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'rounded-full px-2 py-0.5 text-[9px] font-black uppercase',
                        active ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t border-slate-100 p-4 space-y-2">
              <Link
                href="/login"
                onClick={closeMobile}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#070B1A] text-[13px] font-black text-white transition-all hover:bg-slate-800 active:scale-[0.99]"
              >
                <User size={16} />
                Sign In
              </Link>
              <Link
                href="/cart"
                onClick={closeMobile}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-[13px] font-black text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99]"
              >
                <ShoppingCart size={16} />
                View Cart
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2B2EE6] px-1.5 text-[10px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}