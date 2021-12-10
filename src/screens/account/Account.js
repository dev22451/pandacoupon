import {
  Box,
  Text,
  Badge,
  theme,
  Stack,
  Spacer,
  VStack,
  HStack,
  Avatar,
  FlatList,
  IconButton,
  ScrollView,
} from 'native-base';
import React from 'react';
import {TouchableOpacity,View} from 'react-native';
import { useSelector } from 'react-redux';
import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {wp, hp, fp} from '../../helpers/respDimension';
import {login} from '../../redux/slices/loginSlice';

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={20}
    color={theme.colors.gray[400]}
  />
);

const accountIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="account-edit"
    size={wp(6)}
    color={theme.colors.white}
  />
);

const userIcon = (
  <Icon
    type="MaterialCommunityIcons"
    name="account"
    size={wp(4)}
    color={theme.colors.white}
  />
);

const data = [
  
  {
    id: '2',
    fullName: 'Categories',
    iconName: 'file-document-outline',
  },
  
];

const data1 = [
  {
    id: '1',
    fullName: 'Coupons',
    iconName: 'gift',
  },
  {
    id: '2',
    fullName: 'Notifications',
    iconName: 'bell',
  },
  
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Settings',
    iconName: 'cog',
  },
];


const Account = ({navigation}) => {
  const userData = useSelector((state) => state.loginSlice.userData);
  console.log(userData.email,'tygyuhef');
  const handlePressSecond = item => {
    switch (item.fullName) {
      case 'Coupons':
        navigation.navigate('Coupon');
        break;
      case 'Notifications':
        navigation.navigate('Notification');
        break;
      case 'FAQ':
        null;
        break;
      case 'Settings':
        navigation.navigate('Setting');
        break;
      default:
        null;
    }
  };

  const handlePressFirst = item => {
    switch (item.fullName) {
      case 'Histories':
        navigation.navigate('Redeem');
        break;
      case 'Categories':
        navigation.navigate('Categories');
        break;
      case 'Profile Information':
        null;
        break;
      default:
        null;
    }
  };
  console.log(login)

  return (
    <>
      <Stack
        mt={wp(-15)}
        width={wp(100)}
        bg="secondary.500"
        borderBottomLeftRadius="200"
        borderBottomRightRadius="200"
        height={wp(80)}
        px={wp(5)}
        alignItems="center"
        py={wp(5)}>
        {/* <TouchableOpacity style={{top: wp(24), left: wp(40)}}>

          <Text>{accountIcon}</Text>
        </TouchableOpacity> */}
        <Avatar
          zIndex={100}
          position="absolute"
          top={hp(14)}
          bg="pink.600"
          size="xl"
          space={2}>
          JD
        </Avatar>
        <Box
          mt={hp(18)}
          p={wp(5)}
          rounded="xl"
          width={wp(90)}
          height={hp(25)}
          borderWidth="1"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
          borderColor="coolGray.200"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Text mt={hp(2)} bold fontSize={fp(3)}>
            {userData.name}
          </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => null}>
            <VStack mt={hp(1)} justifyContent="center" alignItems="center">
              <Badge
                colorScheme="coolGray"
                flexDirection="row"
                px={wp(3)}
                py={wp(2)}
                borderRadius="full"
                alignItems="center">
                <Box
                  borderColor="coolGray.500"
                  borderRadius="full"
                  borderWidth={wp(0.5)}
                  width={wp(8)}
                  height={wp(8)}
                  justifyContent="center"
                  alignItems="center"
                  mr={wp(2)}>
                  <Avatar size={wp(6)} bg="coolGray.500">
                    {userIcon}
                    {/* <Text color={theme.colors.white}>P</Text> */}
                  </Avatar>
                </Box>
                <Text
                  fontWeight={'medium'}
                  fontSize={fp(2.5)}
                  mr={wp(2)}
                  color={theme.colors.coolGray[600]}>
                  {/* {I18n.t('Drawer.rewards')} : 265 Points */}
                  {userData.email}
                </Text>
                <IconButton
                  _pressed={{
                    backgroundColor: theme.colors.secondary[200],
                  }}
                  icon={backIcon}
                  onPress={() => null}
                  size={wp(5)}
                />
              </Badge>
            </VStack>
          </TouchableOpacity>
        </Box>
          <Box
            mt={hp(3)}
            rounded="xl"
            width={wp(90)}
            borderWidth="1"
            overflow="hidden"
            borderColor="coolGray.200"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handlePressFirst(item)}
                  activeOpacity={0.3}>
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'gray.600',
                    }}
                    borderColor="coolGray.200"
                    pl="4"
                    pr="5"
                    py="2">
                    <HStack
                      space={3}
                      justifyContent="space-between"
                      alignItems="center">
                      <IconButton
                        _pressed={{
                          backgroundColor: theme.colors.secondary[200],
                        }}
                        icon={
                          <Icon
                            type="MaterialCommunityIcons"
                            name={item.iconName}
                            size={wp(6)}
                            color={theme.colors.secondary[500]}
                          />
                        }
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          fontWeight="medium"
                          fontSize="lg">
                          {item.fullName}
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
              )}
              keyExtractor={item => item.id}
            />
          </Box>
          <Box
            mt={hp(3)}
            rounded="xl"
            width={wp(90)}
            borderWidth="1"
            overflow="hidden"
            borderColor="coolGray.200"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <FlatList
              data={data1}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handlePressSecond(item)}
                  activeOpacity={0.3}>
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'gray.600',
                    }}
                    borderColor="coolGray.200"
                    pl="4"
                    pr="5"
                    py="2">
                    <HStack
                      space={3}
                      justifyContent="space-between"
                      alignItems="center">
                      <IconButton
                        _pressed={{
                          backgroundColor: theme.colors.secondary[200],
                        }}
                        icon={
                          <Icon
                            type="MaterialCommunityIcons"
                            name={item.iconName}
                            size={wp(6)}
                            color={theme.colors.secondary[500]}
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
                          fontSize="lg">
                          {item.fullName}
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
              )}
              keyExtractor={item => item.id}
            />
          </Box>
      </Stack>
    </>
  );
};

export default Account;
