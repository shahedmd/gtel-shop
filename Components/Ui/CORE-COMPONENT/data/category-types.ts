import { LucideIcon } from 'lucide-react'

/**
 * TypeScript interfaces for category data
 * Ensures type safety across all category components
 */

export interface Category {
    label: string
    labelBn: string
    href: string
    icon: LucideIcon
    count: string
}

export interface SliderSlide {
    title: string
    subtitle: string
    badge: string
    image: string
    href: string
}
