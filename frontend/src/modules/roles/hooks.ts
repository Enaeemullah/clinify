import { useQuery } from '@tanstack/react-query';
import { listRoles } from './api';

export const useRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: listRoles,
  });
