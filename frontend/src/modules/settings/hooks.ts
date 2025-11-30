import { useMutation, useQuery } from '@tanstack/react-query';
import { listSettings, updateSetting } from './api';
import { queryClient } from '@/api/queryClient';

export const useSettings = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: listSettings,
  });

export const useUpdateSetting = () =>
  useMutation({
    mutationFn: updateSetting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
