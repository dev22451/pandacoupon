import React from 'react';
import {
  VStack,
  Box,
  Input,
  theme,
  FlatList,
  HStack,
  Text,
  Spacer,
  IconButton,
  ScrollView,
} from 'native-base';

import {DBAppBar} from '../../components';
import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';

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

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={wp(4)}
    color={theme.colors.black}
  />
);

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Saloon & Spa',
    iconName: 'spa',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Food',
    iconName: 'food',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Clothing',
    iconName: 'tshirt-crew',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb29ba',
    fullName: 'Bars & Pub',
    iconName: 'glass-wine',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6a',
    fullName: 'Hotel',
    iconName: 'bed',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7b',
    fullName: 'Shoes',
    iconName: 'shoe-formal',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6c',
    fullName: 'Gym & Yoga',
    iconName: 'dumbbell',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7d',
    fullName: 'Health',
    iconName: 'heart-pulse',
  },
];

const Categories = ({navigation}) => {
  return (
    <>
      <DBAppBar
        account
        title="Categories"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <Input
        w={{
          base: '100%',
          md: '25%',
        }}
        bg="white"
        placeholderTextColor="black"
        InputLeftElement={searchIcon}
        _focus={{borderColor: 'secondary.500'}}
        placeholder={I18n.t('Categories.search')}
      />
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2">
              <HStack
                space={3}
                justifyContent="space-between"
                alignItems="center">
                <IconButton
                  _pressed={{
                    backgroundColor: theme.colors.secondary[200],
                  }}
                  icon={
                    <Icon
                      type="MaterialCommunityIcons"
                      name={item.iconName}
                      size={wp(7)}
                      color={theme.colors.secondary[500]}
                    />
                  }
                  onPress={() => navigation.toggleDrawer()}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    fontWeight="medium"
                    fontSize="md">
                    {item.fullName}
                  </Text>
                </VStack>
                <Spacer />
                <IconButton
                  _pressed={{
                    backgroundColor: theme.colors.secondary[200],
                  }}
                  icon={backIcon}
                  onPress={() => null}
                  size={wp(5)}
                />
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </>
  );
};

export default Categories;
