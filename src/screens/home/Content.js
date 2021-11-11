import React from 'react';
import {VStack, Stack, Box, Pressable, theme, Text, HStack} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {wp, hp} from '../../helpers/respDimension';
import {NButton} from '../../components';

const locationIcon = (
  <Box ml={wp(3)}>
    <Icon
      type="MaterialIcons"
      name="add-location"
      size={wp(6)}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const curLocIcon = (
  <Box ml={wp(3)}>
    <Icon
      type="MaterialIcons"
      name="my-location"
      size={wp(6)}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const Content = () => {
  return (
    <VStack p={wp(5)}>
      <Text color="coolGray.500">FIND NEARBY DEALS</Text>
      <Stack space={4} my={hp(2)}>
        <Pressable
          height={hp(5)}
          onPress={() => null}
          bg="warmGray.200"
          borderRadius="sm"
          justifyContent="center">
          <HStack>
            {locationIcon}
            <Text mx={wp(2)} fontSize="md">
              Enter your location
            </Text>
          </HStack>
        </Pressable>
        <HStack alignItems="center">
          {curLocIcon}
          <VStack mx={wp(2)}>
            <Text bold>Use current location</Text>
            <Text>Shanghai, China</Text>
          </VStack>
        </HStack>
      </Stack>
      <NButton title={'Continue'} />
    </VStack>
  );
};

export default Content;
