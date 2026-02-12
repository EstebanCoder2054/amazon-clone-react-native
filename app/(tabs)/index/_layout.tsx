import { StyledStack } from '@/components/navigation/stack';
import { Stack } from 'expo-router';
import React from 'react';

const layout = () => {
  return (
    <StyledStack
      contentClassName="bg-gray-100 dark:bg-dark"
      headerClassName="bg-dark"
      headerTextClassName="text-white"
    >
        <Stack.Screen name="index" 
        // options={{ title: '' }}
         />
    </StyledStack>
  );
};

export default layout;