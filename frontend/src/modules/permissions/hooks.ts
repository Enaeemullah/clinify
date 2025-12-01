import { useQuery } from '@tanstack/react-query';
import { listPermissions } from './api';

export const usePermissionsQuery = () =>
  useQuery({
    queryKey: ['permissions'],
    queryFn: listPermissions,
  });
