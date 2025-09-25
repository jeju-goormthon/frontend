import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import axiosInstance from '@/apis/axiosInstance';
import type { MedicalDepartment, UserResponse } from '@/apis/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: UserResponse | null;
  medicalDepartment: MedicalDepartment | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: UserResponse) => void;
  setMedicalDepartment: (department: MedicalDepartment) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,
      medicalDepartment: null,

      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
        // axiosInstance에 Authorization 헤더 설정
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },

      setUser: (user: UserResponse) => {
        set({
          user,
          medicalDepartment: user.medicalDepartment,
        });
      },

      setMedicalDepartment: (department: MedicalDepartment) => {
        set((state) => ({
          medicalDepartment: department,
          user: state.user ? { ...state.user, medicalDepartment: department } : null,
        }));
      },

      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          user: null,
          medicalDepartment: null,
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
        user: state.user,
        medicalDepartment: state.medicalDepartment,
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
