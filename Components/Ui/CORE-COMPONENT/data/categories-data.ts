import {
    BatteryCharging,
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
import { Category, SliderSlide } from './category-types'

/**
 * CATEGORIES - Single source of truth for all categories
 * Used by both category-slider and category-list components
 * 
 * Never duplicate this array!
 */
export const CATEGORIES: Category[] = [
    {
        label: 'All',
        labelBn: 'সব পণ্য',
        href: '/categories/categories',
        icon: Grid3X3,
        count: '100+',
    },
    {
        label: 'Microscope',
        labelBn: 'মাইক্রোস্কোপ',
        href: '/categories/microscope',
        icon: Search,
        count: '24+',
    },
    {
        label: 'Hot Gun',
        labelBn: 'হট গান',
        href: '/categories/hotgun',
        icon: Flame,
        count: '18+',
    },
    {
        label: 'Soldering Iron',
        labelBn: 'সোল্ডারিং আয়রন',
        href: '/categories/soldering-iron',
        icon: Zap,
        count: '32+',
    },
    {
        label: 'Cutting Machine',
        labelBn: 'কাটিং মেশিন',
        href: '/categories/cutting-machine',
        icon: Wrench,
        count: '12+',
    },
    {
        label: 'LCD Separator',
        labelBn: 'এলসিডি সেপারেটর',
        href: '/categories/lcd-separator',
        icon: MonitorSmartphone,
        count: '15+',
    },
    {
        label: 'Screw Driver',
        labelBn: 'স্ক্রু ড্রাইভার',
        href: '/categories/screwdriver',
        icon: Wrench,
        count: '40+',
    },
    {
        label: 'Glue Remover',
        labelBn: 'গ্লু রিমুভার',
        href: '/categories/glue-remover',
        icon: Sparkles,
        count: '10+',
    },
    {
        label: 'Charger',
        labelBn: 'চার্জার',
        href: '/categories/charger',
        icon: BatteryCharging,
        count: '28+',
    },
    {
        label: 'Mobile Parts',
        labelBn: 'মোবাইল পার্টস',
        href: '/categories/mobile-parts',
        icon: Smartphone,
        count: '80+',
    },
    {
        label: 'IC & Chip',
        labelBn: 'আইসি চিপ',
        href: '/categories/ic-chip',
        icon: Cpu,
        count: '50+',
    },
    {
        label: 'Protection Tools',
        labelBn: 'প্রটেকশন টুলস',
        href: '/categories/protection-tools',
        icon: ShieldCheck,
        count: '22+',
    },
]

/**
 * SLIDER SLIDES - Hero slider content
 * 
 * ✅ FIX APPLIED:
 * Changed wrong href paths:
 * - '/microscope' → '/categories/microscope'
 * - '/hotgun' → '/categories/hotgun'
 * (keeping correct path '/cutting-machine' → '/categories/cutting-machine')
 */
export const SLIDER_SLIDES: SliderSlide[] = [
    {
        title: 'Microscope & Board Repair Tools',
        subtitle: 'Premium tools for mobile servicing — all in one place.',
        badge: 'Technician Choice',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
        href: '/categories/microscope', // ✅ FIXED: was '/microscope'
    },
    {
        title: 'Hot Air, Soldering & Rework Setup',
        subtitle: 'Top repair desk equipment for every technician.',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80',
        href: '/categories/hotgun', // ✅ FIXED: was '/hotgun'
    },
    {
        title: 'LCD Separator & Cutting Machine',
        subtitle: 'Display repair, glass removal & finishing tools.',
        badge: 'Workshop Ready',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
        href: '/categories/cutting-machine', // ✓ Already correct
    },
]
