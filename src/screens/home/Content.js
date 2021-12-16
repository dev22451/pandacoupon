import React from 'react';
import {TouchableOpacity} from 'react-native';
import {VStack, Stack, Box, Input, theme, Text, HStack} from 'native-base';

import {NButton} from '../../components';
import Icon from '../../assets/icons/Icon';
import {wp, hp} from '../../helpers/respDimension';
import {storeData,getData} from '../../helpers/localStorgae';
import { useSelector } from 'react-redux';

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
  const { location } = useSelector(state => state.locationSlice);
  const {fbDeviceToken}=useSelector(state=>state.loginSlice);

  const handleCurrentLocation = async() => {
    await storeData('locationData',{location});
    navigation.navigate('BottomTab');
  }

  const handleContinue = async () => {
    await storeData('locationData',{location});
    //const data = await getData('locationData');
    navigation.navigate('BottomTab');
  }

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
              <Text>Using GPS</Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </Stack>
      <NButton title={'Continue'} onPress={handleContinue} />
    </VStack>
  );
};

export default Content;
