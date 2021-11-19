import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Image, AspectRatio} from 'native-base';

import {mcDonald} from '../../assets/images';
import {hp, wp} from '../../helpers/respDimension';

function CardFlatList({item}) {
  return (
    <TouchableOpacity onPress={() => null} activeOpacity={0.8}>
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
              height={hp(25)}
              source={mcDonald}
              resizeMode="stretch"
              alt="image"
              borderRadius="lg"
            />
          </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export default CardFlatList;
