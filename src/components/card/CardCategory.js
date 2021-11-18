import React from 'react';
import {Box, Image, Avatar, theme, Text, VStack, HStack} from 'native-base';

import {pizza} from '../../assets/images';
import {fp, hp, wp} from '../../helpers/respDimension';

const CardCategory = () => {
  return (
    <>
      <Box
        mt={wp(5)}
        mx={wp(2)}
        alignSelf="center"
        borderLeftWidth="1"
        borderRightWidth="1"
        borderTopRadius="lg"
        borderBottomWidth="1"
        borderBottomRadius="lg"
        borderColor="coolGray.300">
        <Image
          alt="image"
          width={wp(50)}
          source={pizza}
          height={wp(40)}
          borderTopRadius="lg"
        />
        <VStack px={wp(2)} py={wp(2)} mt={wp(2)}>
          <Text fontWeight={'medium'} fontSize={fp(2)}>
            50% off first purchase
          </Text>
          <HStack alignItems="center" mt={wp(2)}>
            <Box
              borderColor="coolGray.400"
              borderRadius="full"
              borderWidth={wp(0.5)}
              width={wp(7)}
              height={wp(7)}
              justifyContent="center"
              alignItems="center">
              <Avatar size={wp(5)} bg="coolGray.400">
                <Text bold fontSize={fp(1.5)} color={theme.colors.white}>
                  P
                </Text>
              </Avatar>
            </Box>
            <Text
              ml={wp(2)}
              fontWeight="400"
              color="coolGray.400"
              fontSize={fp(2.4)}>
              200
            </Text>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default CardCategory;
