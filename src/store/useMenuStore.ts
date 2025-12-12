import { create } from 'zustand';
import type { Category, MenuResponse } from '@/types/menu';
import { fetchMenu } from '@/services/api';

interface MenuStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchMenu: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: MenuResponse = await fetchMenu();
      set({ categories: data.categories, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch menu:', error);
      set({ error: 'Failed to fetch menu', isLoading: false });
    }
  },
}));
