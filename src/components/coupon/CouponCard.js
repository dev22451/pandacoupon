import React from 'react';
import {
  Box,
  Text,
  Stack,
  theme,
  HStack,
  VStack,
  AspectRatio,
  Spacer,
  Divider,
  View,
  Center,
} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {SvgExample} from '../../assets/images';
import {hp, wp, fp} from '../../helpers/respDimension';
import {alignItems} from 'styled-system';
import NButton from '../button/NButton';

const rightArrowIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="check-decagram"
    size={18}
    color={theme.colors.success[500]}
  />
);

const telegramIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="telegram"
    size={wp(5)}
    color={theme.colors.white}
  />
);

const phoneIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="phone"
    size={wp(5)}
    color={theme.colors.white}
  />
);

const webIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="web"
    size={wp(5)}
    color={theme.colors.white}
  />
);

const calendarIcon = (
  <Icon
    type="SimpleLineIcons"
    name="calendar"
    size={18}
    color={theme.colors.secondary[500]}
  />
);
const giftIcon = (
  <Icon
    type="Octicons"
    name="gift"
    size={20}
    color={theme.colors.secondary[500]}
  />
);

const CouponCard = ({navigation}) => {
  return (
    <>
      <Stack>
        <Box
          mb={wp(4)}
          rounded="lg"
          overflow="hidden"
          width={wp(90)}
          shadow={1}
          _light={{backgroundColor: 'gray.50'}}
          _dark={{backgroundColor: 'gray.700'}}>
          <HStack mt={5} mx="2" justifyContent="space-between">
            <HStack>
              <Box width={wp(15)} px={wp(2)}>
                <AspectRatio ratio={1 / 1}>
                  <SvgExample />
                </AspectRatio>
              </Box>
              <VStack>
                <Text fontSize={fp(1.8)} bold fontWeight="500">
                  Cafe Coffee Day
                </Text>
                <Text fontSize={fp(1.6)} color="warmGray.500" fontWeight="500">
                  Speciality Coffee Shop
                </Text>
              </VStack>
            </HStack>
            <HStack px={wp(2)}>
              {rightArrowIcon}
              <Text
                fontSize="xs"
                _light={{color: 'success.500'}}
                _dark={{color: 'success.300'}}
                fontWeight="500"
                mx="1">
                Verified Seller
              </Text>
            </HStack>
          </HStack>
          <VStack my={wp(5)} px={wp(5)}>
            <Text fontSize={fp(3)} fontWeight="500">
              50% off first purchase
            </Text>
            <Text fontSize={fp(1.6)} color="warmGray.500" fontWeight="500">
              Buy any coffee for the first time and recieve flat 50% discount.
            </Text>
          </VStack>
          <VStack mb={wp(5)} px={wp(5)}>
            <HStack my={wp(1)} alignItems="center">
              <Text fontSize={fp(2)} color="warmGray.400" fontWeight="500">
                Branch Location
              </Text>
              <Spacer />
              <Text fontSize={fp(2)} fontWeight="500">
                Juffair Manama
              </Text>
              <Box
                ml={wp(2)}
                width={wp(7)}
                height={wp(7)}
                bg="secondary.500"
                borderRadius="full"
                justifyContent="center"
                alignItems="center">
                {telegramIcon}
              </Box>
            </HStack>
            <HStack my={wp(1)} alignItems="center">
              <Text fontSize={fp(2)} color="warmGray.400" fontWeight="500">
                Phone
              </Text>
              <Spacer />
              <Text fontSize={fp(2)} fontWeight="500">
                +973-893482
              </Text>
              <Box
                ml={wp(2)}
                width={wp(7)}
                height={wp(7)}
                bg="secondary.500"
                borderRadius="full"
                justifyContent="center"
                alignItems="center">
                {phoneIcon}
              </Box>
            </HStack>
            <HStack my={wp(1)} alignItems="center">
              <Text fontSize={fp(2)} color="warmGray.400" fontWeight="500">
                Website
              </Text>
              <Spacer />
              <Text fontSize={fp(2)} fontWeight="500">
                mcdonalds.com
              </Text>
              <Box
                ml={wp(2)}
                width={wp(7)}
                height={wp(7)}
                bg="secondary.500"
                borderRadius="full"
                justifyContent="center"
                alignItems="center">
                {webIcon}
              </Box>
            </HStack>
            <Stack>
              <View
                borderStyle="dashed"
                borderBottomWidth={wp(0.5)}
                borderColor="coolGray.400"
                my={wp(5)}
              />
            </Stack>
            <VStack>
              <Center>
                <Text fontSize={fp(2.5)} fontWeight="medium">
                  Coupon Code
                </Text>
                <Stack
                  my={wp(5)}
                  borderStyle="dashed"
                  borderWidth={1.5}
                  borderColor="secondary.500"
                  px={wp(12)}
                  rounded="sm"
                  py={wp(2)}>
                  <Text
                    fontSize={fp(2)}
                    color="secondary.500"
                    fontWeight="light">
                    code : 0958658678056
                  </Text>
                </Stack>
              </Center>
              <HStack mx={wp(5)} mb={wp(4)} justifyContent="space-between">
                <HStack>
                  <HStack>{calendarIcon}</HStack>
                  <VStack mx="3">
                    <Text fontWeight="600" color="warmGray.500">
                      Expires
                    </Text>
                    <Text fontSize="xs" fontWeight="600" color="black">
                      21 Feb 2022
                    </Text>
                  </VStack>
                </HStack>
                <HStack>
                  <HStack>{giftIcon}</HStack>
                  <VStack mx="3">
                    <Text fontWeight="600" color="warmGray.500">
                      Used
                    </Text>
                    <Text fontSize="xs" fontWeight="600" color="black">
                      62 times (103 remainings)
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
              <VStack alignItems="center">
                <NButton
                  title="Reedem"
                  height={hp(6)}
                  width={wp(50)}
                  my={wp(5)}
                />
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Stack>
    </>
  );
};

export default CouponCard;
