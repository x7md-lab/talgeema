import axios from 'axios';
import type { MenuResponse } from '@/types/menu';

export const fetchMenu = async (): Promise<MenuResponse> => {
  const response = await axios.get<MenuResponse>('./menu_dump.json');
  return response.data;
};
