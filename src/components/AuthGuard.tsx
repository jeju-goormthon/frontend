import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, user, medicalDepartment } = useAuth();
  const location = useLocation();

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600' />
          <p className='mt-4 text-gray-600'>로그인 정보를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to='/login' />;
  }

  // 인증되었지만 의료과목이 없는 경우 진료과목 선택 페이지로 리다이렉트
  if (isAuthenticated && user && !medicalDepartment) {
    return <Navigate replace to='/department' />;
  }

  return <>{children}</>;
};
