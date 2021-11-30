import {
  Avatar,
  Center,
  VStack,
  Heading,
  Badge,
  Text,
  theme,
  IconButton,
  Box,
  Divider,
  HStack,
  Pressable,
} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import Icon from '../../assets/icons/Icon';
import I18n from '../../translations/i18n';
import {hp, wp} from '../../helpers/respDimension';
import {resetLogin} from '../../redux/slices/loginSlice';

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={20}
    color={theme.colors.gray[400]}
  />
);

const getIcon = screenName => {
  switch (screenName) {
    case 'Home':
      return 'home';
    case 'Settings':
      return 'cog';
    case 'Logout':
      return 'logout';
    case 'Categories':
      return 'view-list';
    case 'Notification':
      return 'bell';
    default:
      return undefined;
  }
};

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView>
      <Center mt={hp(5)}>
        <VStack justifyContent="center" alignItems="center">
          <Avatar bg="pink.600" size="lg" space={2}>
            JD
          </Avatar>
          <Heading mt={hp(2)}>John Doe</Heading>
          {/* <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Rewards')}>
            <Badge
              colorScheme="coolGray"
              flexDirection="row"
              px={wp(3)}
              py={wp(2)}
              borderRadius="full">
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
                  <Text color={theme.colors.white}>P</Text>
                </Avatar>
              </Box>
              <Text bold mr={wp(2)}>
                {I18n.t('Drawer.rewards')} : 265 Points
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
          </TouchableOpacity> */}
        </VStack>
        <Divider mt={hp(5)} />
      </Center>
      <VStack space={hp(1)}>
        {props.state.routeNames.map((name, index) => (
          <Pressable
            px="5"
            py="3"
            rounded="md"
            key={index}
            bg={index === props.state.index ? '#83184310' : 'transparent'}
            onPress={event => {
              if (name === 'Logout') {
                dispatch(resetLogin(''));
              } else {
                props.navigation.navigate(name);
              }
            }}>
            <HStack space={wp(5)} alignItems="center">
              <Icon
                type="MaterialCommunityIcons"
                name={getIcon(name)}
                size={wp(5)}
                color={index === props.state.index ? '#ec4899' : '#71717a'}
              />
              <Text
                fontWeight="500"
                color={
                  index === props.state.index ? 'secondary.500' : 'gray.700'
                }>
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
