import React from 'react';
import {Box, Image, AspectRatio} from 'native-base';

import {hp, wp} from '../../helpers/respDimension';
import {mcDonald} from '../../assets/images';

function CardFlatList() {
  return (
    <Box
      mr={wp(4)}
      mb={wp(5)}
      rounded="lg"
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
  );
}

export default CardFlatList;
