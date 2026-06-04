// Components/Ui/all-product-data.ts

export type Product = {
    id: number
    name: string
    category: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    sold: number
    stock: number
    badge?: 'hot' | 'new' | 'sale'
    image: string
    href: string
    images?: string[]
    whatsapp?: string
    sku?: string
    shortDesc?: string
    keyFeatures?: string[]
    details?: Record<string, string>
    usage?: { title: string; desc: string; icon: string }[]
}

export const ALL_PRODUCTS: Product[] = [
    { id: 1, name: 'Digital Microscope Pro X900', category: 'Microscope', price: 4850, originalPrice: 5500, rating: 4.8, reviews: 124, sold: 340, stock: 12, badge: 'hot', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400&q=80', href: '/products/microscope-pro-x900' },
    { id: 2, name: 'Digital Microscope Lite X500', category: 'Microscope', price: 2900, originalPrice: 3200, rating: 4.5, reviews: 67, sold: 180, stock: 8, image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400&q=80', href: '/products/microscope-lite-x500' },
    { id: 3, name: 'Hot Air Rework Station 858D', category: 'Hot Gun', price: 2200, originalPrice: 2800, rating: 4.7, reviews: 89, sold: 215, stock: 20, badge: 'sale', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', href: '/products/hot-air-rework-station-858d' },
    { id: 4, name: 'Hot Air Station 850A', category: 'Hot Gun', price: 1500, originalPrice: 1800, rating: 4.4, reviews: 53, sold: 142, stock: 15, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', href: '/products/hot-air-station-850a' },
    { id: 5, name: 'Precision Soldering Iron T12', category: 'Soldering Iron', price: 1650, originalPrice: 1950, rating: 4.9, reviews: 203, sold: 487, stock: 25, badge: 'hot', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/soldering-iron-t12' },
    { id: 6, name: 'Soldering Station 936A', category: 'Soldering Iron', price: 980, originalPrice: 1200, rating: 4.5, reviews: 88, sold: 320, stock: 30, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/soldering-station-936a' },
    { id: 7, name: 'LCD Separator Machine S-918B', category: 'LCD Separator', price: 3400, originalPrice: 3900, rating: 4.6, reviews: 67, sold: 143, stock: 6, badge: 'new', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/lcd-separator-machine-s-918b' },
    { id: 8, name: 'Mini LCD Separator Pad', category: 'LCD Separator', price: 1100, originalPrice: 1350, rating: 4.3, reviews: 41, sold: 95, stock: 18, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/mini-lcd-separator-pad' },
    { id: 9, name: 'Pro Screwdriver Set 38-in-1', category: 'Screw Driver', price: 890, originalPrice: 1100, rating: 4.7, reviews: 156, sold: 620, stock: 50, badge: 'sale', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80', href: '/products/screwdriver-set-38-in-1' },
    { id: 10, name: 'Magnetic Screwdriver Set 24pc', category: 'Screw Driver', price: 550, originalPrice: 700, rating: 4.5, reviews: 99, sold: 430, stock: 40, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80', href: '/products/magnetic-screwdriver-set-24pc' },
    { id: 11, name: 'Fast Charger QC 3.0 65W', category: 'Charger', price: 650, originalPrice: 850, rating: 4.5, reviews: 98, sold: 390, stock: 35, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80', href: '/products/fast-charger-qc-3-0-65w' },
    { id: 12, name: 'USB-C PD Charger 45W', category: 'Charger', price: 480, originalPrice: 600, rating: 4.3, reviews: 74, sold: 260, stock: 22, badge: 'sale', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80', href: '/products/usb-c-pd-charger-45w' },
    { id: 13, name: 'Cutting Machine CNC V3', category: 'Cutting Machine', price: 5200, originalPrice: 6000, rating: 4.8, reviews: 44, sold: 98, stock: 4, badge: 'new', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80', href: '/products/cutting-machine-cnc-v3' },
    { id: 14, name: 'Portable Glass Cutter Pro', category: 'Cutting Machine', price: 2100, originalPrice: 2500, rating: 4.5, reviews: 31, sold: 74, stock: 9, image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80', href: '/products/portable-glass-cutter-pro' },
    { id: 15, name: 'Glue Remover Liquid 100ml', category: 'Glue Remover', price: 320, originalPrice: 420, rating: 4.4, reviews: 72, sold: 510, stock: 60, badge: 'sale', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80', href: '/products/glue-remover' },
    { id: 16, name: 'IC Chip BGA Reballing Kit', category: 'IC & Chip', price: 1200, originalPrice: 1500, rating: 4.6, reviews: 55, sold: 180, stock: 14, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', href: '/products/ic-chip' },
    { id: 17, name: 'Anti-Static Wrist Strap Pro', category: 'Protection', price: 180, originalPrice: 250, rating: 4.3, reviews: 210, sold: 870, stock: 80, badge: 'sale', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/anti-static-wrist-strap-pro' },
    { id: 18, name: 'ESD Safe Tweezers Set', category: 'Protection', price: 420, originalPrice: 550, rating: 4.5, reviews: 63, sold: 290, stock: 35, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', href: '/products/esd-safe-tweezers-set' },
]