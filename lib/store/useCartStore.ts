import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '@/constants/dummy-data';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  colors?: string[];
  variants?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  storeId?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  color?: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateOptions: (id: string, options: { color?: string; variant?: string }) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: products[0].id + '-Silver',
          product: products[0] as Product,
          quantity: 1,
          color: 'Silver',
          variant: '1TB'
        }
      ],
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(i => i.id === item.id);
        if (existingItemIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
      })),
      updateOptions: (id, options) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, ...options } : i)
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
