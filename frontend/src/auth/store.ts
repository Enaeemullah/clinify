import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { http } from '@/api/client';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  permissions: string[];
  setTokens: (payload: AuthResponse) => void;
  setProfile: (user: User & { permissions?: string[] }) => void;
  logout: () => void;
  refreshSession: () => Promise<AuthResponse | null>;
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      permissions: [],
      setTokens: payload => set({ accessToken: payload.accessToken, refreshToken: payload.refreshToken }),
      setProfile: user =>
        set({
          user,
          permissions: user.permissions ?? [],
        }),
      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null, permissions: [] });
      },
      refreshSession: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          get().logout();
          return null;
        }
        const { data } = await http.post<AuthResponse>('/auth/refresh', { refreshToken });
        set({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        return data;
      },
    }),
    {
      name: 'clinify-auth',
      partialize: state => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        permissions: state.permissions,
      }),
    },
  ),
);
