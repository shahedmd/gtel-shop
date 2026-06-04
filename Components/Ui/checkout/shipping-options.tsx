'use client';

import { useCheckoutStore, ShippingMethod } from '@/Components/stores/checkout-store';

interface ShippingOptionsProps {
  onNext: () => void;
}

const SHIPPING_OPTIONS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Shipping', days: '3-5 days', cost: 0 },
  { id: 'express', name: 'Express Shipping', days: '1-2 days', cost: 50 },
  { id: 'overnight', name: 'Overnight Shipping', days: 'Next day', cost: 100 },
  { id: 'pickup', name: 'Store Pickup', days: 'Ready in 2 hours', cost: 0 },
];

export function ShippingOptions({ onNext }: ShippingOptionsProps) {
  const { shippingMethod, setShippingMethod } = useCheckoutStore();

  const handleNext = () => {
    if (shippingMethod) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>

      <div className="space-y-3">
        {SHIPPING_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition ${
              shippingMethod?.id === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              checked={shippingMethod?.id === option.id}
              onChange={() => setShippingMethod(option)}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{option.name}</p>
              <p className="text-sm text-gray-500">{option.days}</p>
            </div>
            <p className="font-semibold text-gray-900">
              {option.cost === 0 ? 'FREE' : `৳${option.cost}`}
            </p>
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!shippingMethod}
        className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  );
}
