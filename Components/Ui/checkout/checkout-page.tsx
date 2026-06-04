'use client';

import { useState } from 'react';
import { useCheckoutStore } from '@/Components/stores/checkout-store';
import { StepIndicator } from './step-indicator';
import { ShippingForm } from './shipping-form';
import { ShippingOptions } from './shipping-options';
import { PaymentMethod } from './payment-method';
import { OrderSummary } from './order-summary';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CheckoutPage() {
  const router = useRouter();
  const { currentStep, setStep, shippingAddress } = useCheckoutStore();

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setStep(currentStep + 1);
    } else {
      const newOrderId = `ORD-${Date.now()}`;
      router.push(`/order-confirmation/${newOrderId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/cart" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <StepIndicator currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            {currentStep === 1 && <ShippingForm onNext={handleNextStep} />}
            {currentStep === 2 && <ShippingOptions onNext={handleNextStep} />}
            {currentStep === 3 && <PaymentMethod onNext={handleNextStep} />}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                <p className="text-gray-600 mb-6">
                  Please review your order details before placing it.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {currentStep > 1 && currentStep < 4 && (
              <button
                onClick={handlePrevStep}
                className="mt-6 px-6 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
