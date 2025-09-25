import { useQuery } from '@tanstack/react-query';

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
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      // 인증 실패 시 로그아웃 처리
      clearAuth();
    },
  });

  return {
    user: user || fetchedUser,
    medicalDepartment,
    isLoading: isAuthenticated && isLoading,
    isError,
    error,
    isAuthenticated,
  };
};
