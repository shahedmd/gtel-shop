'use client';

import { useCartStore } from '@/Components/stores/cart-store';

export function CartSummary() {
  const { items, getTotal, getTax, getShipping } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">৳{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">৳{getTax().toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className={getShipping() === 0 ? 'text-green-600 font-semibold' : 'text-gray-900'}>
            {getShipping() === 0 ? 'FREE' : `৳${getShipping().toLocaleString()}`}
          </span>
        </div>

        {subtotal <= 5000 && (
          <p className="text-xs text-gray-500">
            Free shipping on orders over ৳5000
          </p>
        )}

        <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>৳{getTotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
