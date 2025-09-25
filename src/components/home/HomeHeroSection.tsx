import { Box } from '@vapor-ui/core';

import HomeHeroText from '@/components/home/HomeHeroText';
import HomePrimaryActionsGrid from '@/components/home/HomePrimaryActionsGrid';

export default function HomeHeroSection() {
  return (
    <Box display='flex' flexDirection='column' gap='$300' paddingX='$300' paddingY='$400'>
      <HomeHeroText />
      <HomePrimaryActionsGrid />
    </Box>
  );
}
