import React from 'react';
import {HStack, IconButton, Text, theme} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';

const menuIcon = (
  <Icon type="MaterialIcons" name="menu" size={20} color={theme.colors.white} />
);

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-back-ios"
    size={20}
    color={theme.colors.black}
  />
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

const AppBar = ({search, fav, title, ...props}) => {
  const navigation = props.navigation;
  return (
    <>
      <HStack
        mx={wp(8)}
        py="3"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="4" alignItems="center">
          <IconButton
            _pressed={{
              backgroundColor: theme.colors.secondary[200],
            }}
            icon={backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack space="2">
          {search ? <IconButton icon={searchIcon} /> : null}
          {fav ? <IconButton icon={favIcon} /> : null}
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
