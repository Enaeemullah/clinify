import { useMemo } from 'react';
import { authStore } from '@/auth/store';

export const usePermissions = () => {
  const permissions = authStore(state => state.permissions);
  return useMemo(() => new Set(permissions), [permissions]);
};
