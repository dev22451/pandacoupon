import React from 'react';
import {HStack, IconButton, Badge, Box, Avatar, Text, theme} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {fp, wp} from '../../helpers/respDimension';
import {TouchableOpacity} from 'react-native';

const DBAppBar = ({
  back,
  search,
  account,
  title,
  cog,
  titleColor = 'black',
  loc = false,
  midTitle = false,
  midTitleText = '',
  rewards = false,
  bgColor = 'white',
  location = 'Shanghai, China',
  iconColor = theme.black,
  ...props
}) => {
  const navigation = props.navigation;
  const locationIcon = (
    <Icon type="MaterialIcons" name="location-on" size={20} color={iconColor} />
  );
  const cogIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name="cog-outline"
      size={20}
      color={iconColor}
    />
  );
  const backIcon = (
    <Icon
      type="MaterialIcons"
      name="arrow-back-ios"
      size={20}
      color={iconColor}
    />
  );
  const editIcon = (
    <Icon type="Feather" name="edit" size={20} color={iconColor} />
  );
  const menuIcon = (
    <Icon type="AntDesign" name="menu-fold" size={20} color={iconColor} />
  );
  const accIcon = (
    <Icon type="AntDesign" name="user" size={20} color={iconColor} />
  );
  return (
    <HStack
      py="3"
      px={wp(2)}
      bg={bgColor}
      justifyContent="space-between"
      alignItems="center">
      <HStack space="4" alignItems="center">
        {!back ? (
          <IconButton
            _pressed={{
              backgroundColor: theme.colors.secondary[200],
            }}
            icon={menuIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ) : (
          <IconButton
            _pressed={{
              backgroundColor: theme.colors.secondary[200],
            }}
            icon={backIcon}
            onPress={() => navigation.goBack()}
          />
        )}
      </HStack>

      {!loc ? (
        <Text color={titleColor} fontWeight="medium" fontSize={fp(2)}>
          {title}
        </Text>
      ) : null}

      {loc ? (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('EditLocation')}>
          <HStack space="1" alignItems="center">
            {locationIcon}
            <Text color="white" fontSize={fp(2)}>
              {location}
            </Text>
            {editIcon}
          </HStack>
        </TouchableOpacity>
      ) : null}

      <HStack space="2">
        {account ? (
          <IconButton
            icon={accIcon}
            onPress={() => navigation.navigate('Setting')}
            _pressed={{
              backgroundColor: theme.colors.secondary[200],
            }}
          />
        ) : null}
        {cog ? (
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            {cogIcon}
          </TouchableOpacity>
        ) : null}
        {rewards ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Rewards')}>
            <Badge
              bg="#ffffff60"
              flexDirection="row"
              px={wp(1)}
              py={wp(1)}
              borderRadius="full">
              <Box
                borderColor="white"
                borderRadius="full"
                borderWidth={wp(0.5)}
                width={wp(6)}
                height={wp(6)}
                justifyContent="center"
                alignItems="center">
                <Avatar size={wp(4)} bg="white">
                  <Text
                    bold
                    fontSize={fp(1)}
                    color={theme.colors.secondary[500]}>
                    P
                  </Text>
                </Avatar>
              </Box>
              <Text color="white" fontSize={fp(2)} mx={wp(1)}>
                0
              </Text>
            </Badge>
          </TouchableOpacity>
        ) : null}
      </HStack>
    </HStack>
  );
};

export default DBAppBar;
