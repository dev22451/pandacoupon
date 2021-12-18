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
  import FastImage from 'react-native-fast-image';

 export function NotificatonCard({item, navigateToDetail}) {
    
    const handleItemPressed = () => navigateToDetail(item.couponID)
    
    return (
      <TouchableOpacity activeOpacity={0.9}  onPress={handleItemPressed}>
        <Box
        mb={wp(4)}
        mx={2}
        alignSelf="center"
        rounded="lg"
        overflow="hidden"
        width={wp(92)}
        shadow={1}
        _light={{backgroundColor: 'gray.50'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <VStack py={4} px={2} >
        <HStack   mx="3" justifyContent="space-between">
          <HStack width={wp(55)} >
            <Box width={wp(15)} px={wp(2)}>
              <AspectRatio ratio={1 / 1}>
              {item.brandImage?
                    <FastImage
                    source={{
                      uri: item.brandImage,
                      priority: FastImage.priority.normal,
                    }}
                    style={{height:wp(10),width:wp(10)}}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  :
                  <SvgExample />
                }
              </AspectRatio>
            </Box>
            <VStack>
            <HStack px={3} >
              <Text fontSize={fp(1.8)} bold fontWeight="500">
              {item.notificationMsg.title}
              </Text>
             
              </HStack>
              <HStack px={3} style={{flexWrap:'wrap',width:wp(40)}} >
              <Text fontSize={fp(1.8)} color="warmGray.500" fontWeight="500" numberOfLines={2} >
                {item.notificationMsg.body}
              </Text>
              </HStack>
            </VStack>
            
          </HStack>
          <HStack px={3} alignItems="center">
              <Text fontSize={fp(1.8)} color="warmGray.500" fontWeight="500">
                {moment.utc(item.createdAt).fromNow()}
              </Text>
              </HStack>
          </HStack>

          </VStack>
      </Box>
      </TouchableOpacity>
    );
  }
  
  