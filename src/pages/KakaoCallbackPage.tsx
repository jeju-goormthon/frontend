import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import LoaderIcon from '@/assets/icons/LoaderIcon';
import { useAuthStore } from '@/stores/authStore';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setTokens } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) {
          setError('로그인 토큰을 받아오지 못했습니다.');
          return;
        }

        // zustand store에 토큰 저장 (이때 axiosInstance에도 자동으로 헤더가 설정됨)
        setTokens(accessToken, refreshToken);

        // 홈으로 리다이렉트
        navigate('/', { replace: true });
      } catch (err) {
        setError('로그인 처리 중 오류가 발생했습니다.');
        console.error('OAuth callback error:', err);
      }
    };

    processCallback();
  }, [searchParams, setTokens, navigate]);

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center'>
        <LoaderIcon aria-hidden className='size-40 animate-spin' />
      </div>
      {error && (
        <div className='absolute inset-x-0 bottom-10 text-center'>
          <p className='text-sm text-red-500'>{error}</p>
          <button
            className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            onClick={() => navigate('/login')}
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}
