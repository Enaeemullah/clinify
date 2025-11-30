import { http } from '@/api/client';
import { Role } from '@/types';

export const listRoles = async () => {
  const { data } = await http.get<Role[]>('/roles');
  return data;
};
