'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/Components/stores/cart-store';
import { useCheckoutStore } from '@/Components/stores/checkout-store';
import { CheckCircle, Truck, Mail, Download } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
}

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const { items, getTotal } = useCartStore();
  const { shippingAddress, shippingMethod } = useCheckoutStore();
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');

  useEffect(() => {
    const days = parseInt(shippingMethod?.days.split('-')[0] || '3') || 3;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, [shippingMethod]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      {/* Order ID */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-center">
        <p className="text-sm text-gray-600 mb-1">Order Number</p>
        <p className="text-2xl font-bold text-gray-900">{orderId}</p>
        <p className="text-xs text-gray-500 mt-2">
          Check your email for a detailed confirmation
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Delivery Info</h3>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Estimated Delivery:</strong> {estimatedDelivery}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Method:</strong> {shippingMethod?.name}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Email Confirmation</h3>
          </div>
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to <strong>{shippingAddress?.email}</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Check your spam folder if you don't see it
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Order Details</h2>

        <div className="space-y-3 mb-4 pb-4 border-b">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">
                ৳{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ৳{items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax & Shipping</span>
            <span className="text-gray-900">
              ৳{(getTotal() - items.reduce((sum, item) => sum + item.price * item.quantity, 0)).toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span className="text-gray-900">Total Paid</span>
            <span className="text-gray-900">৳{getTotal().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {shippingAddress && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">Shipping Address</h2>
          <p className="text-sm text-gray-600">
            {shippingAddress.name}<br />
            {shippingAddress.address}<br />
            {shippingAddress.city}, {shippingAddress.postalCode}<br />
            {shippingAddress.country}<br />
            {shippingAddress.phone}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition">
          <Download className="w-4 h-4" />
          Download Invoice
        </button>

        <Link
          href="/products"
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center text-sm text-green-700">
        <p>✓ Track your order status in the Order Tracking page</p>
      </div>
    </div>
  );
}
