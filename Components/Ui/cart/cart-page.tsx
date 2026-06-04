'use client';

import Link from 'next/link';
import { useCartStore } from '@/Components/stores/cart-store';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { PromoCode } from './promo-code';
import { ProductRecommendations } from './product-recommendations';
import { EmptyCart } from './empty-cart';
import { ShoppingCart } from 'lucide-react';

export function CartPage() {
  const { items, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="font-semibold text-gray-900">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </h2>
              </div>
              <button
                onClick={() => {
                  if (confirm('Clear your entire cart?')) {
                    clearCart();
                  }
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            <div className="p-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="p-4 border-t">
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <ProductRecommendations />
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <CartSummary />
            <PromoCode />

            <Link
              href="/checkout"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center block"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-500 text-center">
              🔒 Secure checkout • Free returns • Fast delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
