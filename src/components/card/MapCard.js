import React from 'react';
import {View, Image, VStack, theme, Text, HStack} from 'native-base';

import {wp, fp} from '../../helpers/respDimension';
import Icon from '../../assets/icons/Icon';

const calendarIcon = (
  <Icon
    type="EvilIcons"
    name={'calendar'}
    size={wp(7)}
    color={theme.colors.gray[400]}
  />
);

const MapCard = ({item}, props) => {
  const CARD_WIDTH = props.CARD_WIDTH;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        padding: wp(2),
        elevation: 0.5,
        width: CARD_WIDTH,
        marginHorizontal: 10,
        borderRadius: wp(2),
      }}>
      <Image
        alt="image"
        width={wp(22)}
        height={wp(22)}
        borderRadius="lg"
        source={require('../../assets/images/mcDonald.jpg')}
      />
      <VStack ml={wp(4)} overflow="hidden">
        <Text fontSize={fp(2)} fontWeight="semibold">
          {item.title}
        </Text>
        <Text
          color="coolGray.500"
          fontSize={fp(1.8)}
          lineHeight="18"
          width={wp(50)}>
          {item.description}
        </Text>
        <HStack mt={wp(1)} alignItems="center">
          {calendarIcon}
          <Text fontWeight="medium" color="coolGray.400">
            Valid Till : {item.validTill}
          </Text>
        </HStack>
      </VStack>
    </View>
  );
};

export default MapCard;
