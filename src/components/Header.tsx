import { HStack } from '@vapor-ui/core';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/assets/icons/LogoIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const navigate = useNavigate();
  const { clearAuth, isAuthenticated } = useAuthStore();
  return (
    <HStack alignItems='center' height='$700' justifyContent='space-between' paddingX='$300' width='100%'>
      {/* TODO: 로고 자리 */}
      <LogoIcon className='cursor-pointer' onClick={() => navigate('/')} />
      {/* TODO: 마이페이지 있을 시 버튼으로 대체 */}
      {isAuthenticated && <LogoutIcon className='text-v-gray-400 size-5 cursor-pointer' onClick={() => clearAuth()} />}
    </HStack>
  );
}
