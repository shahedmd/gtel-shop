'use client';

import { useCheckoutStore, PaymentMethod } from '@/Components/stores/checkout-store';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentMethodProps {
  onNext: () => void;
}

const PAYMENT_OPTIONS: PaymentMethod[] = [
  { type: 'card', label: 'Credit/Debit Card' },
  { type: 'paypal', label: 'PayPal' },
  { type: 'applePay', label: 'Apple Pay' },
  { type: 'googlePay', label: 'Google Pay' },
  { type: 'bankTransfer', label: 'Bank Transfer' },
  { type: 'cod', label: 'Cash on Delivery' },
];

export function PaymentMethod({ onNext }: PaymentMethodProps) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  const handleNext = () => {
    if (paymentMethod) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>

      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.type}
            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition ${
              paymentMethod?.type === option.type
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod?.type === option.type}
              onChange={() => setPaymentMethod(option)}
              className="w-4 h-4"
            />
            <div className="flex items-center gap-3 flex-1">
              {option.type === 'card' && <CreditCard className="w-5 h-5 text-gray-400" />}
              {['paypal', 'applePay', 'googlePay'].includes(option.type) && (
                <Wallet className="w-5 h-5 text-gray-400" />
              )}
              <p className="font-medium text-gray-900">{option.label}</p>
            </div>
          </label>
        ))}
      </div>

      {paymentMethod?.type === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-900">Card Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={!paymentMethod}
        className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue to Review
      </button>
    </div>
  );
}
