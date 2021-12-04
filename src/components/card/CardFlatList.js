import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Image, AspectRatio} from 'native-base';

import {mcDonald} from '../../assets/images';
import {hp, wp} from '../../helpers/respDimension';

function CardFlatList({item}) {
  console.log({item})
  return (
    <TouchableOpacity onPress={() => null} key={item.id} activeOpacity={0.8}>
      <Box
        mr={wp(4)}
        mb={wp(5)}
        rounded="lg"
        key={item.id}
        overflow="hidden"
        width="80"
        shadow={1}
        _light={{backgroundColor: 'gray.50'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              width="80"
              alt="image"
              height={hp(22)}
              source={mcDonald}
              borderRadius="lg"
              resizeMode="stretch"
            />
          </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export default CardFlatList;
