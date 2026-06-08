'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ALL_PRODUCTS } from '@/Components/Ui/all-products-data';
import { useSetupBuilderStore } from '@/Components/stores/setup-builder-store';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, ShoppingCart, Check } from 'lucide-react';

export default function ProductDetailsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addProduct, getSelectedProduct } = useSetupBuilderStore();

    const productId = parseInt(params.productId as string);
    const categoryFromParams = searchParams.get('category') || '';

    // Find product
    const product = ALL_PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <Link href="/setups/builder" className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
                        <ArrowLeft size={20} />
                        Back to Setup Builder
                    </Link>
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
                        <Link href="/setups/builder">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                                Back to Setup Builder
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const isSelected = categoryFromParams && getSelectedProduct(categoryFromParams)?.product.id === String(product.id);

    const handleSelectForSetup = () => {
        if (categoryFromParams) {
            addProduct(categoryFromParams, {
                id: String(product.id),
                name: product.name,
                price: product.price,
                image: product.image,
            });
            // Redirect back to builder
            router.push('/setups/builder');
        }
    };

    // Get all product images (fallback to single image if no array)
    const images = product.images || [product.image];

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Navigation */}
                <div className="mb-8">
                    <Link
                        href="/setups/builder"
                        className="flex items-center gap-2 text-blue-600 mb-6 hover:underline text-lg font-semibold"
                    >
                        <ArrowLeft size={20} />
                        Back to Setup Builder
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Product Images */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square relative">
                                <Image
                                    src={images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                                {product.badge && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold capitalize">
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            {/* Additional Images Thumbnails */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.slice(0, 4).map((img, idx) => (
                                        <button
                                            key={idx}
                                            className="bg-gray-100 rounded-lg overflow-hidden aspect-square hover:opacity-75 transition"
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.name} ${idx + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle: Product Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Category & Title */}
                        <div>
                            <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                                {product.category}
                            </p>
                            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {product.shortDesc || 'Premium quality tool designed for professional mobile repair technicians.'}
                            </p>
                        </div>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-4 py-4 border-y border-gray-200">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                            <span className="font-bold text-gray-900">{product.rating}</span>
                            <span className="text-gray-600">({product.reviews} reviews)</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-600">{product.sold} sold</span>
                        </div>

                        {/* Pricing */}
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <p className="text-gray-600 text-sm mb-2">Price</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-blue-600">৳{product.price.toLocaleString()}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-2xl text-gray-400 line-through">
                                            ৳{product.originalPrice.toLocaleString()}
                                        </span>
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            ></div>
                            <span className="font-semibold text-gray-900">
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        {categoryFromParams && (
                            <div className="space-y-3 py-4">
                                <button
                                    onClick={handleSelectForSetup}
                                    className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
                                        isSelected
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {isSelected ? (
                                        <>
                                            <Check size={20} />
                                            Selected for {categoryFromParams}
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} />
                                            Select for {categoryFromParams}
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Key Features */}
                        {product.keyFeatures && product.keyFeatures.length > 0 && (
                            <div className="py-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {product.keyFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-blue-600 font-bold mt-1">•</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Specifications */}
                        {product.details && Object.keys(product.details).length > 0 && (
                            <div className="py-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(product.details).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-600 uppercase mb-2">{key}</p>
                                            <p className="text-gray-900">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Usage/Applications */}
                        {product.usage && product.usage.length > 0 && (
                            <div className="py-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
                                <div className="space-y-4">
                                    {product.usage.map((use, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="text-3xl">{use.icon}</div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1">{use.title}</h3>
                                                <p className="text-gray-700">{use.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SKU */}
                        {product.sku && (
                            <div className="py-6 border-t border-gray-200">
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold">SKU:</span> {product.sku}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {product.category && (
                    <div className="mt-16 py-12 border-t">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">More in {product.category}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {ALL_PRODUCTS.filter(
                                p => p.category === product.category && p.id !== product.id
                            )
                                .slice(0, 4)
                                .map(relatedProduct => (
                                    <Link
                                        key={relatedProduct.id}
                                        href={`/setups/builder/product-details/${relatedProduct.id}?category=${encodeURIComponent(categoryFromParams)}`}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
                                    >
                                        <div className="relative h-24 bg-gray-100 rounded mb-2 overflow-hidden">
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-cover"
                                                sizes="150px"
                                            />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                                            {relatedProduct.name}
                                        </p>
                                        <p className="text-blue-600 font-bold mt-2">৳{relatedProduct.price.toLocaleString()}</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
