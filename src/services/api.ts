import axios from 'axios';
import type { MenuResponse } from '@/types/menu';

const API_URL = 'https://tlgeema.com/api/menu';

export const fetchMenu = async (): Promise<MenuResponse> => {
  const response = await axios.get<MenuResponse>(`https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`);
  return response.data;
};
