import { HStack, Text } from '@vapor-ui/core';
import { UserOutlineIcon } from '@vapor-ui/icons';

export default function Header() {
  return (
    <HStack alignItems='center' height='$700' justifyContent='space-between' paddingX='$300' width='100%'>
      {/* TODO: 로고 자리 */}
      <Text>로고 자리</Text>
      <UserOutlineIcon size={22} />
    </HStack>
  );
}
