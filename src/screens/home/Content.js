import React from 'react';
import {TouchableOpacity} from 'react-native';
import {VStack, Stack, Box, Input, theme, Text, HStack} from 'native-base';

import {NButton} from '../../components';
import Icon from '../../assets/icons/Icon';
import {wp, hp} from '../../helpers/respDimension';

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

const Content = ({navigation}) => {
  const handleCurrentLocation = () => navigation.navigate('BottomTab');
  const handleContinue = () => navigation.navigate('BottomTab');
  return (
    <VStack p={wp(5)}>
      <Text color="coolGray.500">FIND NEARBY DEALS</Text>
      <Stack space={4} my={hp(2)}>
        <Input
          w={{
            base: '100%',
            md: '25%',
          }}
          bg="white"
          placeholderTextColor="black"
          InputLeftElement={locationIcon}
          _focus={{borderColor: 'secondary.500'}}
          placeholder={'Enter Your Location'}
        />
        <TouchableOpacity onPress={handleCurrentLocation}>
          <HStack alignItems="center">
            {curLocIcon}
            <VStack mx={wp(2)}>
              <Text bold>Use current location</Text>
              <Text>Shanghai, China</Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </Stack>
      <NButton title={'Continue'} onPress={handleContinue} />
    </VStack>
  );
};

export default Content;
