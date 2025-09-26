import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getMyInfo } from '@/apis/users';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { isAuthenticated, clearAuth, setUser, user, medicalDepartment } = useAuthStore();

  const {
    data: fetchedUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMyInfo,
    enabled: isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // Handle successful data fetch
  useEffect(() => {
    if (fetchedUser) {
      // API 응답이 래퍼 형태인 경우 data 부분만 추출
      const userData =
        fetchedUser && typeof fetchedUser === 'object' && 'data' in fetchedUser
          ? (fetchedUser as any).data
          : fetchedUser;
      setUser(userData);
    }
  }, [fetchedUser, setUser]);

  // Handle error
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, clearAuth]);

  // medicalDepartment를 user 객체에서 직접 가져오기 (fallback)
  const effectiveMedicalDepartment =
    medicalDepartment || (user && user.medicalDepartment ? user.medicalDepartment : null);

  return {
    user: user || fetchedUser,
    medicalDepartment: effectiveMedicalDepartment,
    isLoading: isAuthenticated && isLoading,
    isError,
    error,
    isAuthenticated,
  };
};
