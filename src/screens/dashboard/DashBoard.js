import {
  Pressable,
  HStack,
  theme,
  Text,
  VStack,
  Input,
  Box,
  FlatList,
  ScrollView,
} from 'native-base';
import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';

import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/respDimension';
import {CardComponent, DBAppBar} from '../../components';
import CardFlatList from '../../components/card/CardFlatList';

const rightArrowIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-right"
    size={20}
    color={theme.colors.white}
  />
);
const rightArrowIcon1 = (
  <Icon
    type="MaterialIcons"
    name="arrow-right"
    size={20}
    color={theme.colors.black}
  />
);
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

const DashBoard = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary[500]} />
      <DBAppBar
        loc={true}
        rewards={true}
        navigation={navigation}
        iconColor={theme.colors.white}
        bgColor={theme.colors.secondary[500]}
      />
      <ScrollView>
        <VStack
          width={wp(100)}
          bg="secondary.500"
          borderBottomLeftRadius="200"
          borderBottomRightRadius="200"
          height={wp(80)}
          px={wp(5)}>
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            my={hp(2)}
            bg="white"
            placeholderTextColor="black"
            InputLeftElement={searchIcon}
            _focus={{borderColor: 'secondary.500'}}
            placeholder={I18n.t('DashBoard.searchTitle')}
          />
          <HStack justifyContent="space-between" alignItems="center">
            <Text bold fontSize={fp(2)} color="white">
              {I18n.t('DashBoard.explore')}
            </Text>

            <TouchableOpacity onPress={() => null}>
              <HStack alignItems="center">
                <Text fontSize={fp(1.8)} color="white">
                  {I18n.t('DashBoard.seeAll')}
                </Text>
                {rightArrowIcon}
              </HStack>
            </TouchableOpacity>
          </HStack>
          <Text fontSize={fp(1.8)} color="white">
            {I18n.t('DashBoard.latestDeal')}
          </Text>
        </VStack>
        <FlatList
          ml={wp(4)}
          position="absolute"
          top={hp(18)}
          data={[1, 2, 3]}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CardFlatList item={item} />}
        />
        <VStack my={hp(1)}>
          <HStack
            mx={wp(5)}
            mt={hp(3)}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={fp(2)} fontWeight="medium" color="warmGray.600">
              {I18n.t('DashBoard.browseCategory')}
            </Text>
            <TouchableOpacity onPress={() => null}>
              <HStack alignItems="center">
                <Text fontSize={fp(1.8)} color="black">
                  {I18n.t('DashBoard.seeAll')}
                </Text>
                {rightArrowIcon1}
              </HStack>
            </TouchableOpacity>
          </HStack>
          <FlatList
            ml={wp(2)}
            mr={wp(2)}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            maxHeight={hp(12)}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <Pressable
                  mt={wp(2)}
                  mb={wp(2)}
                  mr={wp(2)}
                  ml={wp(2)}
                  rounded="lg"
                  overflow="hidden"
                  width={wp(20)}
                  height={wp(20)}
                  shadow={1}
                  justifyContent="center"
                  alignItems="center"
                  _pressed={{backgroundColor: 'secondary.200'}}
                  _light={{backgroundColor: 'gray.50'}}
                  _dark={{backgroundColor: 'gray.700'}}>
                  <Box
                    width={wp(10)}
                    height={wp(10)}
                    bg="secondary.100"
                    alignItems="center"
                    borderRadius="full"
                    justifyContent="center">
                    {rightArrowIcon1}
                  </Box>
                  <Text fontSize={fp(1.4)} mt={wp(1)}>
                    Saloon
                  </Text>
                </Pressable>
              </>
            )}
          />
        </VStack>
        <HStack
          mx={wp(5)}
          my={hp(1)}
          alignItems="center"
          justifyContent="space-between">
          <Text fontSize={fp(2)} fontWeight="medium" color="warmGray.600">
            {I18n.t('DashBoard.featDetails')}
          </Text>
          <TouchableOpacity onPress={() => null}>
            <HStack alignItems="center">
              <Text fontSize={fp(1.8)} color="black">
                {I18n.t('DashBoard.seeAll')}
              </Text>
              {rightArrowIcon1}
            </HStack>
          </TouchableOpacity>
        </HStack>
        <FlatList
          mx={wp(5)}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CardComponent item={item} />}
        />
      </ScrollView>
    </>
  );
};

export default DashBoard;
