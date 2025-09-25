import { Text } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

export default function RoutePage() {
  const navigate = useNavigate();
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-50'>
        <BackHeader title='노선 선택' />
      </div>
      <div className='flex-1 overflow-y-auto px-4 py-4'>
        <Text>테스트</Text>
      </div>
      <div className='sticky bottom-0 z-50 px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='다음' onClick={() => navigate('/route/confirm')} />
      </div>
    </div>
  );
}
