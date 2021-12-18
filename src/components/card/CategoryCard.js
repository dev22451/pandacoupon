import React from 'react';
import {Box, Pressable, Text, theme,Avatar} from 'native-base';
import { Image } from 'react-native'

import Icon from '../../assets/icons/Icon';
import {fp, wp, hp} from '../../helpers/respDimension';
import FastImage from 'react-native-fast-image';

const CategoryCard = ({item,navigateToList}) => {
  const {categoryName: fullName, categoryImageURL:image} = item;
  const onItemPress = () => navigateToList(item)
  return (
      <Pressable
        mt={wp(2)}
        mb={wp(2)}
        onPress={onItemPress}
        mr={wp(2)}
        ml={wp(2)}
        key={item.id}
        rounded="lg"
        overflow="hidden"
        width={wp(24)}
        height={hp(12)}
        shadow={1}
        justifyContent="center"
        alignItems="center"
        _pressed={{backgroundColor: 'secondary.200'}}
        _light={{backgroundColor: 'gray.50'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Box
          width={wp(10)}
          height={wp(10)}
          // bg="secondary.100"
          alignItems="center"
          borderRadius="full"
          justifyContent="center">
          {
          !image?
          
          <Icon
          type="MaterialCommunityIcons"
          name={item.iconName||'spa'}
          size={wp(6)}
          color={theme.colors.secondary[500]}
        /> 
        :
        <FastImage
            // source={{
            //   uri: image,
            //   priority: FastImage.priority.normal,
            // }}
            // style={{height:wp(10),width:wp(15), borderRadius:wp(30)}}
            // resizeMode={'center'}
          >
           <Avatar style={{height:wp(10),width:wp(15), borderRadius:wp(30)}}
            resizeMode={'center'}
            size="md"
            mt={wp(4)}
            bg="pink.500"
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
            />
          </FastImage>
          }  

        </Box>
        <Text fontSize={wp(3.5)} mt={wp(4)} bold>
          {fullName}
        </Text>
      </Pressable>
  );
};

export default CategoryCard;
