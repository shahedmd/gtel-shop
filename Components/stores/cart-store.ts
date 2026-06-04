import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalQuantity: () => number;
  getTax: () => number;
  getShipping: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: Math.min(i.quantity + item.quantity, i.stock),
                  }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter((i) => i.id !== itemId),
      })),
      
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items
          .map((i) =>
            i.id === itemId ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
          )
          .filter((i) => i.quantity > 0),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = get().getShipping();
        const tax = get().getTax();
        return subtotal + shipping + tax;
      },
      
      getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      
      getTax: () => {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return Number((subtotal * 0.1).toFixed(2));
      },
      
      getShipping: () => {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return subtotal > 5000 ? 0 : 200;
      },
    }),
    {
      name: 'cart-store',
    }
  )
);
