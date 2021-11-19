import React from 'react';
import {
  Box,
  Text,
  Image,
  theme,
  Stack,
  HStack,
  VStack,
  Avatar,
  FlatList,
  ScrollView,
} from 'native-base';
import {TouchableOpacity} from 'react-native';

import {DBAppBar} from '../../components';
import Icon from '../../assets/icons/Icon';
import {pinkShades} from '../../assets/images';
import {fp, hp, wp} from '../../helpers/respDimension';
import CardCategory from '../../components/card/CardCategory';

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={wp(4)}
    color={'gray'}
  />
);

const Rewards = ({navigation}) => {
  return (
    <>
      <DBAppBar
        cog
        back
        title="Rewards"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <ScrollView>
        <Box mt={wp(5)} alignSelf="center">
          <Image
            width={wp(90)}
            alt="image"
            height={hp(25)}
            borderRadius="lg"
            source={pinkShades}
          />
          <VStack position="absolute" px={wp(5)} py={wp(6)}>
            <HStack
              justifyContent="space-between"
              width={wp(80)}
              alignItems="center">
              <Text color="white" fontWeight="400" fontSize={fp(2.5)}>
                Available Points
              </Text>
              <Box
                borderColor="white"
                borderRadius="full"
                borderWidth={wp(0.5)}
                width={wp(8)}
                height={wp(8)}
                justifyContent="center"
                alignItems="center">
                <Avatar size={wp(6)} bg="white">
                  <Text
                    bold
                    fontSize={fp(1.8)}
                    color={theme.colors.secondary[500]}>
                    P
                  </Text>
                </Avatar>
              </Box>
            </HStack>
            <HStack mt={hp(2.5)} mb={hp(1.5)} alignItems="flex-end">
              <Text color="white" fontWeight="medium" fontSize={fp(6)}>
                1200
              </Text>
              <Text color="white" mb={2} ml={wp(1)} fontSize={fp(3.5)}>
                points
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="white" fontWeight="300" fontSize={fp(2)}>
                Expiring on 30 Jun, 2020
              </Text>
              <Stack
                bg="white"
                borderRadius="full"
                height={hp(4)}
                width={wp(25)}
                justifyContent="center"
                alignItems="center">
                <TouchableOpacity onPress={() => null}>
                  <Text
                    color="secondary.500"
                    fontWeight="500"
                    fontSize={fp(1.5)}>
                    View History
                  </Text>
                </TouchableOpacity>
              </Stack>
            </HStack>
          </VStack>
        </Box>
        <VStack mx={wp(4)} my={hp(3)}>
          <HStack justifyContent="space-between">
            <Text mx={wp(2)} fontSize={fp(2)} bold>
              Food
            </Text>
            <TouchableOpacity>
              <HStack alignItems="center">
                <Text mx={wp(2)} fontSize={fp(2)}>
                  See All (45)
                </Text>
                {backIcon}
              </HStack>
            </TouchableOpacity>
          </HStack>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({item}) => <CardCategory item={item} />}
          />
        </VStack>
        <VStack mx={wp(4)} my={hp(2)}>
          <HStack justifyContent="space-between">
            <Text mx={wp(2)} fontSize={fp(2)} bold>
              Entertainment
            </Text>
            <TouchableOpacity>
              <HStack alignItems="center">
                <Text mx={wp(2)} fontSize={fp(2)}>
                  See All (45)
                </Text>
                {backIcon}
              </HStack>
            </TouchableOpacity>
          </HStack>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({item}) => <CardCategory item={item} />}
          />
        </VStack>
      </ScrollView>
    </>
  );
};

export default Rewards;
