'use client';

import { useCartStore } from '@/Components/stores/cart-store';
import { useCheckoutStore } from '@/Components/stores/checkout-store';
import Image from 'next/image';

export function OrderSummary() {
  const { items, getTax, getShipping, getTotal } = useCartStore();
  const { shippingAddress, shippingMethod, paymentMethod } = useCheckoutStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Items */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
              <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
                <p className="text-gray-900 font-semibold">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      {shippingAddress && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{shippingAddress.name}</p>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
            <p>{shippingAddress.phone}</p>
          </div>
        </div>
      )}

      {/* Shipping Method */}
      {shippingMethod && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Shipping Method</h3>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{shippingMethod.name}</p>
            <p className="text-gray-600">{shippingMethod.days}</p>
          </div>
        </div>
      )}

      {/* Payment Method */}
      {paymentMethod && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <p className="text-sm font-medium text-gray-900">{paymentMethod.label}</p>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t pt-6 bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">৳{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">৳{getTax().toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={getShipping() === 0 ? 'text-green-600 font-semibold' : 'text-gray-900'}>
            {getShipping() === 0 ? 'FREE' : `৳${getShipping().toLocaleString()}`}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>৳{getTotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
