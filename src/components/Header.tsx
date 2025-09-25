import { HStack } from '@vapor-ui/core';
import { UserOutlineIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/assets/icons/LogoIcon';

export default function Header() {
  const navigate = useNavigate();
  return (
    <HStack alignItems='center' height='$700' justifyContent='space-between' paddingX='$300' width='100%'>
      {/* TODO: 로고 자리 */}
      <LogoIcon className='cursor-pointer' onClick={() => navigate('/')} />
      {/* TODO: 마이페이지 있을 시 버튼으로 대체 */}
      <UserOutlineIcon fill='#5D5D5D' size={22} />
    </HStack>
  );
}
