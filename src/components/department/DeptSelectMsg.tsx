import { Text, VStack } from '@vapor-ui/core';

const DeptSelectMsg = () => {
  return (
    <VStack marginBottom='$400'>
      <Text className='leading-v-400 tracking-v-300 mb-2' typography='heading3'>
        어떤 진료과목을 <br />
        선택하시겠어요?
      </Text>
      <Text className='text-[#5D5D5D]' typography='body1'>
        자주 방문하는 진료과목을 선택해 주세요
      </Text>
      <Text className='text-[#5D5D5D]' typography='body1'>
        진료과목은 나중에 바꿀 수 있어요
      </Text>
    </VStack>
  );
};

export default DeptSelectMsg;
