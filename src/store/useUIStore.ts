import { create } from 'zustand';

interface UIStore {
  // Cart Drawer
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;

  // Product Drawer
  isProductDrawerOpen: boolean;
  selectedProduct: any | null;
  editingCartItem: any | null;
  openProductDrawer: (product: any, editItem?: any) => void;
  closeProductDrawer: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Cart Drawer
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Product Drawer
  isProductDrawerOpen: false,
  selectedProduct: null,
  editingCartItem: null,
  openProductDrawer: (product, editItem = null) => set({ 
    isProductDrawerOpen: true, 
    selectedProduct: product,
    editingCartItem: editItem
  }),
  closeProductDrawer: () => set({ 
    isProductDrawerOpen: false 
    // We keep the data so the drawer can animate out
  }),
}));
