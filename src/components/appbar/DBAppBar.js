import React from 'react';
import {HStack, IconButton, Text, theme} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/respDimension';

const menuIcon = (
  <Icon
    type="AntDesign"
    name="menu-fold"
    size={20}
    color={theme.colors.black}
  />
);

const accIcon = (
  <Icon type="AntDesign" name="user" size={20} color={theme.colors.black} />
);

const DBAppBar = ({search, account, title, ...props}) => {
  const navigation = props.navigation;
  return (
    <HStack
      py="3"
      px={wp(2)}
      bg={theme.colors.white}
      justifyContent="space-between"
      alignItems="center">
      <HStack space="4" alignItems="center">
        <IconButton
          _pressed={{
            backgroundColor: theme.colors.secondary[200],
          }}
          icon={menuIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      </HStack>
      <Text color="black" fontSize={fp(2)}>
        {title}
      </Text>
      <HStack space="2">
        {account ? (
          <IconButton
            icon={accIcon}
            _pressed={{
              backgroundColor: theme.colors.secondary[200],
            }}
          />
        ) : null}
      </HStack>
    </HStack>
  );
};

export default DBAppBar;
