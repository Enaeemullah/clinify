import { http } from '@/api/client';

export interface Setting {
  id: string;
  key: string;
  value: Record<string, any>;
}

export const listSettings = async () => {
  const { data } = await http.get<Setting[]>('/settings');
  return data;
};

export const updateSetting = async (payload: { key: string; value: Record<string, any> }) => {
  const { data } = await http.post<Setting>('/settings', payload);
  return data;
};
