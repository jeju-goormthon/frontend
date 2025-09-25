import { Grid, IconButton, Text } from '@vapor-ui/core';
import { ChevronLeftOutlineIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({ title }: BackHeaderProps) {
  const navigate = useNavigate();

  return (
    <Grid.Root
      alignItems='center'
      className='bg-white'
      height='$700'
      paddingX='$300'
      templateColumns='40px 1fr 40px' // ✅ 좌 40px / 가운데 1fr / 우 40px
      width='100%'
    >
      <Grid.Item>
        <IconButton aria-label='뒤로가기' variant='ghost' onClick={() => navigate(-1)}>
          <ChevronLeftOutlineIcon className='stroke-2 text-[#5D5D5D]' size={24} />
        </IconButton>
      </Grid.Item>

      <Grid.Item className='justify-self-center'>
        <Text className='text-[18px] leading-[1.3] font-semibold text-[#262626]'>{title}</Text>
      </Grid.Item>

      <Grid.Item>
        <div aria-hidden className='h-8 w-8' />
      </Grid.Item>
    </Grid.Root>
  );
}
