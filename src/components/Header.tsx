import { HStack, Text } from '@vapor-ui/core';
import { UserOutlineIcon } from '@vapor-ui/icons';

export default function Header() {
  return (
    <HStack alignItems='center' height='$700' justifyContent='space-between' paddingX='$300' width='100%'>
      {/* TODO: 로고 자리 */}
      <Text>로고 자리</Text>
      {/* TODO: 마이페이지 있을 시 버튼으로 대체 */}
      <UserOutlineIcon size={22} />
    </HStack>
  );
}
