import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import axiosInstance from '@/apis/axiosInstance';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
        // axiosInstance에 Authorization 헤더 설정
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },

      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        // axiosInstance에서 Authorization 헤더 제거
        delete axiosInstance.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // hydration 완료 후 axios 헤더 설정
        if (state?.accessToken) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
        }
      },
    },
  ),
);
