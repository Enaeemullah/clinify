import { http } from '@/api/client';
import { Permission } from '@/types';

export const listPermissions = async () => {
  const { data } = await http.get<Permission[]>('/permissions');
  return data;
};
