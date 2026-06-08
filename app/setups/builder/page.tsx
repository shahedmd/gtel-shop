'use client';

import { useState } from 'react';
import { ALL_PRODUCTS } from '@/Components/Ui/all-products-data';
import { useSetupBuilderStore } from '@/Components/stores/setup-builder-store';
import { useCartStore } from '@/Components/stores/cart-store';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';

// সব ক্যাটাগরি
const CATEGORIES = [
    'Microscope',
    'Hot Gun',
    'Soldering Iron',
    'Cutting Machine',
    'LCD Separator',
    'Screw Driver',
    'Glue Remover',
    'Charger',
    'Mobile Parts',
    'IC & Chip',
    'Protection',
];

export default function SetupBuilder() {
    const { selectedProducts, addProduct, removeProduct, getTotalPrice, clearSetup } = useSetupBuilderStore();
    const { addItem } = useCartStore();
    const [setupName, setSetupName] = useState('My Custom Setup');

    const getProductsByCategory = (category: string) => {
        return ALL_PRODUCTS.filter(p => p.category === category);
    };

    const getSelectedProduct = (category: string) => {
        return selectedProducts.find(p => p.categoryName === category);
    };

    const handleAddAllToCart = () => {
        selectedProducts.forEach(item => {
            addItem({
                id: String(item.product.id),
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: 1,
                stock: 100,
            });
        });
        alert(`${selectedProducts.length} items added to cart!`);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🔧 Custom Setup Builder</h1>
                    <p className="text-gray-600">Select one product from each category to create your perfect setup</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Category Selectors */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-6 space-y-6">

                            {CATEGORIES.map((category) => (
                                <div key={category} className="border-b pb-6 last:border-b-0">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                                        {getSelectedProduct(category) && (
                                            <button
                                                onClick={() => removeProduct(category)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                <Trash2 size={16} /> Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {getProductsByCategory(category).map((product) => {
                                            const isSelected = getSelectedProduct(category)?.product.id === String(product.id);
                                            return (
                                                <button
                                                    key={product.id}
                                                    onClick={() => addProduct(category, {
                                                        id: String(product.id),
                                                        name: product.name,
                                                        price: product.price,
                                                        image: product.image,
                                                    })}
                                                    className={`border-2 rounded-lg p-3 transition ${isSelected
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-gray-200 hover:border-blue-300'
                                                        }`}
                                                >
                                                    <div className="relative h-16 bg-gray-100 rounded mb-2 overflow-hidden">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="100px"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm font-bold text-blue-600">৳{product.price.toLocaleString()}</p>
                                                    {isSelected && (
                                                        <div className="mt-2 text-blue-600 font-bold text-sm">✓ Selected</div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Setup Summary */}
                    <div className="sticky top-20 h-fit">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Setup Summary</h3>

                            <div className="mb-6 p-3 bg-gray-50 rounded">
                                <input
                                    type="text"
                                    value={setupName}
                                    onChange={(e) => setSetupName(e.target.value)}
                                    className="w-full border rounded px-3 py-2 text-sm font-semibold"
                                    placeholder="Setup Name"
                                />
                            </div>

                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {selectedProducts.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No products selected yet</p>
                                ) : (
                                    selectedProducts.map((item) => (
                                        <div key={item.categoryName} className="flex justify-between items-start text-sm">
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.categoryName}</p>
                                                <p className="text-gray-600 text-xs line-clamp-1">{item.product.name}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">৳{item.product.price.toLocaleString()}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-blue-600">
                                        ৳{getTotalPrice().toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleAddAllToCart}
                                    disabled={selectedProducts.length === 0}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-300 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Add All to Cart
                                </button>

                                <button
                                    onClick={clearSetup}
                                    className="w-full border-2 border-gray-300 text-gray-900 py-2 rounded-lg font-bold hover:bg-gray-50 transition"
                                >
                                    Clear All
                                </button>

                                <Link href="/checkout" className="block">
                                    <button
                                        disabled={selectedProducts.length === 0}
                                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-300"
                                    >
                                        Checkout Directly
                                    </button>
                                </Link>
                            </div>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                {selectedProducts.length} of {CATEGORIES.length} categories selected
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}