import { Button, Text, VStack } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-6'>
      <VStack alignItems='center' gap='$300' textAlign='center'>
        {/* 404 숫자 */}
        <Text
          className='font-bold text-[#3174DC]'
          style={{ fontSize: '72px', lineHeight: '80px', letterSpacing: '-2px' }}
        >
          404
        </Text>

        {/* 메인 메시지 */}
        <VStack alignItems='center' gap='$150'>
          <Text className='font-semibold text-[#262626]' typography='heading4'>
            잘못된 접근입니다
          </Text>
          <Text className='text-[#959595]' typography='body1'>
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            올바른 주소인지 확인해 주세요.
          </Text>
        </VStack>

        {/* 홈으로 가기 버튼 */}
        <Button
          className='mt-4 h-12 rounded-xl bg-[#3174DC] px-8 text-white hover:bg-[#2563EB]'
          size='xl'
          onClick={handleGoHome}
        >
          <Text className='font-semibold text-white' typography='heading6'>
            홈으로 가기
          </Text>
        </Button>
      </VStack>
    </div>
  );
}
