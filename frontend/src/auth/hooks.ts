import { useMutation, useQuery } from '@tanstack/react-query';
import { http } from '@/api/client';
import { authStore } from './store';
import { queryClient } from '@/api/queryClient';
import { User } from '@/types';

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await http.post<AuthTokens>('/auth/login', payload);
      return data;
    },
    onSuccess: data => {
      authStore.getState().setTokens(data);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

export const useMe = () => {
  const token = authStore(state => state.accessToken);
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await http.get<User & { permissions: string[] }>('/auth/me');
      authStore.getState().setProfile(data);
      return data;
    },
    enabled: Boolean(token),
  });
};

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      authStore.getState().logout();
      await queryClient.removeQueries();
    },
  });
