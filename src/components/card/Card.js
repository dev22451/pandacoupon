import {
  Box,
  Text,
  Stack,
  Image,
  theme,
  HStack,
  VStack,
  Heading,
  AspectRatio,
} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/respDimension';
import {mcDonald, SvgExample} from '../../assets/images';
import moment from 'moment';

const rightArrowIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="check-decagram"
    size={18}
    color={theme.colors.success[500]}
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

function CardComponent({item, navigateToDetail}) {
  console.log({item})
  const {
    brandLocation,
    brandName,
    brandPhone,
    brandWebsite,
    brandcouponDescription,
    couponCategoryImageId,
    couponCode,
    couponDescription,
    couponTitle,
    expiryDate,
    noOfUser = 0,
    _id:id
  } = item;
  const handleItemPressed = () => navigateToDetail(id)
  return (
    <TouchableOpacity activeOpacity={0.9} key={item.id} onPress={handleItemPressed}>
      <Box
        mb={wp(4)}
        rounded="lg"
        key={item.id}
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
              {brandName}
              </Text>
              <Text fontSize={fp(1.6)} color="warmGray.500" fontWeight="500">
                {brandcouponDescription}
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
        <Box mt={5} px={wp(2)}>
          <AspectRatio ratio={16 / 9}>
            <Image
              source={mcDonald}
              alt="image"
              width={wp(86)}
              height={hp(23)}
              resizeMode="stretch"
              borderRadius="lg"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1" fontWeight="semibold">
            {couponTitle}
          </Heading>
          <Text fontWeight="400" color="warmGray.600">
            {couponDescription}
          </Text>
        </Stack>
        <HStack mx={wp(5)} mb={wp(4)} justifyContent="space-around">
          <HStack>
            <HStack>{calendarIcon}</HStack>
            <VStack mx="3">
              <Text fontWeight="600" color="warmGray.500">
                Expires
              </Text>
              <Text fontSize="xs" fontWeight="600" color="black">
               {moment(expiryDate).format('DD MMM YYYY')}
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
                {/*62 times (103 remainings)*/}{noOfUser}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}

export default CardComponent;
