import { ALL_PRODUCTS } from '@/Components/Ui/all-products-data'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react'

interface PageProps {
    params: Promise<{ slug: string }>
}

const categoryMap: Record<string, string> = {
    'microscope': 'Microscope',
    'hotgun': 'Hot Gun',
    'soldering-iron': 'Soldering Iron',
    'cutting-machine': 'Cutting Machine',
    'lcd-separator': 'LCD Separator',
    'screwdriver': 'Screw Driver',
    'glue-remover': 'Glue Remover',
    'charger': 'Charger',
    'mobile-parts': 'Mobile Parts',
    'ic-chip': 'IC & Chip',
    'protection-tools': 'Protection',
    'categories': 'All'
}

export default async function CategoryPage({ params }: PageProps) {
    const resolvedParams = await params
    const { slug } = resolvedParams

    const categoryName = categoryMap[slug]
    const products = categoryName === 'All'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter(p => p.category === categoryName)

    if (!categoryName) {
        return <div className="text-center py-12">Category not found</div>
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                <Link href="/" className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
                    <p className="text-gray-600">{products.length} products available</p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={product.href}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
                            >
                                <div className="relative h-48 bg-gray-200 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition"
                                        sizes="300px"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-2xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                        {product.originalPrice > product.price && (
                                            <span className="text-sm text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
                                        )}
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-1">
                                        <ShoppingCart size={16} />
                                        View Details
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No products found</p>
                    </div>
                )}
            </div>
        </main>
    )
}