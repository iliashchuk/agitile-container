import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/layout';

import { GithubAuthButton } from '../GithubAuth';

export const Header = () => {
  return (
    <HStack p={4} justifyContent="space-between">
      <Heading m={0} as="h1" size="xl">
        Agitile
      </Heading>
      <GithubAuthButton />
    </HStack>
  );
};
