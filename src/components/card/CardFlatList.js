import React,{useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Image, AspectRatio} from 'native-base';
import {mcDonald} from '../../assets/images';
import {hp, wp} from '../../helpers/respDimension';


function CardFlatList({item}) {
  
  return (
    <TouchableOpacity onPress={() => null} key={item.id} activeOpacity={0.8}>
      <Box
        mx={wp(2)}
        mb={wp(5)}
        rounded="lg"
        key={item.id}
        overflow="hidden"
        width="80"
        height='40'
        shadow={1}
        _light={{backgroundColor: 'gray.50'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              width="100%"
              alt="image"
              height="90%"
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
