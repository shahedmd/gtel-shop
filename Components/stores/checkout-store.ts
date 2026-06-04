import { create } from 'zustand';

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  saveAddress?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  days: string;
  cost: number;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'applePay' | 'googlePay' | 'bankTransfer' | 'cod';
  label: string;
}

interface CheckoutStore {
  currentStep: number;
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod | null;
  paymentMethod: PaymentMethod | null;
  orderId: string | null;
  
  setStep: (step: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setOrderId: (id: string) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  currentStep: 1,
  shippingAddress: null,
  shippingMethod: null,
  paymentMethod: null,
  orderId: null,
  
  setStep: (step) => set({ currentStep: step }),
  setShippingAddress: (address) => set({ shippingAddress: address }),
  setShippingMethod: (method) => set({ shippingMethod: method }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setOrderId: (id) => set({ orderId: id }),
  reset: () => set({
    currentStep: 1,
    shippingAddress: null,
    shippingMethod: null,
    paymentMethod: null,
    orderId: null,
  }),
}));
