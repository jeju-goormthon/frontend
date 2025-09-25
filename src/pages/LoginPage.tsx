import { Box, Button, Text, VStack } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // 카카오 로그인 URL로 리다이렉트
    const kakaoLoginUrl = import.meta.env.VITE_KAKAO_URI || 'https://api-donghang.klr.kr/oauth2/authorization/kakao';
    window.location.href = kakaoLoginUrl;
  };

  const handleGeneralLogin = () => {
    // TODO: 일반 로그인 처리 (현재는 임시)
    console.log('일반 로그인 버튼 클릭');
  };

  return (
    <Box display='flex' flexDirection='column' minHeight='100vh' paddingX='$300' paddingY='$400'>
      <VStack className='flex-1 items-center justify-center' gap='$400'>
        <Text className='text-center text-xl font-bold text-[var(--vapor-color-foreground-normal)]'>로그인</Text>

        <VStack className='w-full max-w-80' gap='$200'>
          <Button
            className='w-full'
            size='lg'
            style={{
              backgroundColor: '#FEE500',
              color: '#000000',
              borderRadius: 'var(--vapor-size-borderRadius-400)',
            }}
            onClick={handleKakaoLogin}
          >
            카카오 로그인
          </Button>

          <Button
            className='w-full'
            size='lg'
            style={{
              borderRadius: 'var(--vapor-size-borderRadius-400)',
            }}
            variant='outline'
            onClick={handleGeneralLogin}
          >
            일반 로그인
          </Button>
        </VStack>

        <Button size='sm' style={{ marginTop: 'auto' }} variant='ghost' onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </VStack>
    </Box>
  );
}
