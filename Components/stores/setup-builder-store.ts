import { create } from 'zustand';

export interface SetupProduct {
  categoryName: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

interface SetupBuilderStore {
  selectedProducts: SetupProduct[];
  addProduct: (categoryName: string, product: any) => void;
  removeProduct: (categoryName: string) => void;
  clearSetup: () => void;
  getTotalPrice: () => number;
  getProductsByCategory: () => Map<string, SetupProduct>;
}

export const useSetupBuilderStore = create<SetupBuilderStore>((set, get) => ({
  selectedProducts: [],

  addProduct: (categoryName, product) =>
    set((state) => {
      const filtered = state.selectedProducts.filter(p => p.categoryName !== categoryName);
      return {
        selectedProducts: [...filtered, { categoryName, product }],
      };
    }),

  removeProduct: (categoryName) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(p => p.categoryName !== categoryName),
    })),

  clearSetup: () => set({ selectedProducts: [] }),

  getTotalPrice: () => {
    return get().selectedProducts.reduce((sum, item) => sum + item.product.price, 0);
  },

  getProductsByCategory: () => {
    const map = new Map<string, SetupProduct>();
    get().selectedProducts.forEach(item => {
      map.set(item.categoryName, item);
    });
    return map;
  },
}));