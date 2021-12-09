import React from 'react';
import {TouchableOpacity,Image} from 'react-native';
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  Text,
  theme,
  VStack,
} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/respDimension';

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={wp(4)}
    color={theme.colors.black}
  />
);

const CategoryFlatList = (props) => {
  const {item,navigation} = props;
  const navigateToList = () => navigation.navigate('CouponList',{item})
  return (
    <>
      <TouchableOpacity activeOpacity={0.4} onPress={navigateToList}>
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2">
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <IconButton
              _pressed={{
                backgroundColor: theme.colors.secondary[200],
              }}
              icon={
                
                  (!item.categoryImageURL)?
                  <Icon
                  type="MaterialCommunityIcons"
                  name={item.iconName||'spa'}
                  size={wp(6)}
                  color={theme.colors.secondary[500]}
                /> 
                :
                <Image
                    source={{
                      uri: item.categoryImageURL,
                    }}
                    style={{height:wp(10),width:wp(10)}}
                    resizeMode='contain'
                  />  
              }
              onPress={() => null}
            />
            <VStack>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                fontWeight="medium"
                fontSize="md">
                {item.categoryName}
              </Text>
            </VStack>
            <Spacer />
            <IconButton
              _pressed={{
                backgroundColor: theme.colors.secondary[200],
              }}
              icon={backIcon}
              onPress={() => null}
              size={wp(5)}
            />
          </HStack>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default CategoryFlatList;
