'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/Components/stores/cart-store';

export function CartIcon() {
  const { getTotalQuantity } = useCartStore();
  const quantity = getTotalQuantity();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {quantity}
        </span>
      )}
    </Link>
  );
}
