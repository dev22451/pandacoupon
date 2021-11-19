import React from 'react';
import {StatusBar} from 'react-native';
import {theme, VStack, Input, Box} from 'native-base';

import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {hp, wp} from '../../helpers/respDimension';
import Footer from '../../components/footer/Footer';
import SwipeList from '../../components/swipeList/SwipeList';

const searchIcon = (
  <Box ml={wp(4)}>
    <Icon
      type="MaterialIcons"
      name="search"
      size={20}
      color={theme.colors.gray}
    />
  </Box>
);

const EditLocation = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary[500]} />
      <VStack width={wp(100)} bg="secondary.500" px={wp(5)}>
        <Input
          w={{
            base: '100%',
            md: '25%',
          }}
          mt={hp(2)}
          mb={hp(1)}
          bg="white"
          placeholderTextColor="black"
          InputLeftElement={searchIcon}
          _focus={{borderColor: 'secondary.500'}}
          placeholder={I18n.t('DashBoard.searchTitle')}
        />
      </VStack>
      <SwipeList />
    </>
  );
};

export default EditLocation;
