import React from 'react';
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
  theme,
} from 'native-base';
import Icon from '../../assets/icons/Icon';

const menuIcon = (
  <Icon type="MaterialIcons" name="menu" size={20} color={theme.colors.white} />
);

const favIcon = (
  <Icon type="Entypo" name="heart" size={20} color={theme.colors.white} />
);

const searchIcon = (
  <Icon
    type="MaterialIcons"
    name="search"
    size={20}
    color={theme.colors.white}
  />
);

const AppBar = props => {
  const navigation = props.navigation;
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />
      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="4" alignItems="center">
          <IconButton
            icon={menuIcon}
            onPress={() => navigation.toggleDrawer()}
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack space="2">
          <IconButton icon={searchIcon} />
          <IconButton icon={favIcon} />
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
