import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartOptions {
  options?: Record<string, string | string[]>;
  selectedOptionsText?: string[]; // Array of human-readable option names
  notes?: string;
  unitPrice?: number; // Price of one unit including options
}

export interface CartItem extends Product {
  cartId: string; // Unique ID for the cart item (product.id + options)
  quantity: number;
  selectedOptions?: Record<string, string | string[]>;
  selectedOptionsText?: string[];
  notes?: string;
  originalProduct?: any; // The full API product object containing options
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, options?: CartOptions) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, quantity, options = {}) => {
    // Sort keys to ensure consistency for cartId generation
    const sortedOptions = options.options 
      ? Object.keys(options.options).sort().reduce((obj, key) => {
          obj[key] = options.options![key];
          return obj;
        }, {} as Record<string, unknown>)
      : {};
      
    const cartId = `${product.id}-${JSON.stringify(sortedOptions)}`;

    set((state) => {
      const existingItem = state.items.find((item) => item.cartId === cartId);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.cartId === cartId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      // Use provided unitPrice or fallback to product.price
      const finalPrice = options.unitPrice !== undefined ? options.unitPrice : product.price;

      return { 
        items: [
          ...state.items, 
          { 
            ...product, 
            price: finalPrice,
            selectedOptions: options.options,
            selectedOptionsText: options.selectedOptionsText,
            notes: options.notes,
            cartId, 
            quantity 
          }
        ] 
      };
    });
  },
  removeItem: (cartId) => {
    set((state) => ({
      items: state.items.filter((item) => item.cartId !== cartId),
    }));
  },
  updateQuantity: (cartId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartId);
      return;
    }
    set((state) => ({
      items: state.items.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      )
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
