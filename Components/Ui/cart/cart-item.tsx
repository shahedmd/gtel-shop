'use client';

import { CartItem as CartItemType, useCartStore } from '@/Components/stores/cart-store';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">৳{item.price.toLocaleString()}</p>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-12 text-center border rounded py-1"
          />
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={item.quantity >= item.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {item.quantity >= item.stock && (
          <p className="text-xs text-orange-500 mt-2">Only {item.stock} in stock</p>
        )}
      </div>

      <div className="text-right flex flex-col justify-between">
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            ৳{(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
}
