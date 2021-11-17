import React from 'react';
import {Text, theme, HStack, Center, Pressable, Box} from 'native-base';

import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';

const Footer = props => {
  const [selected, setSelected] = React.useState(1);
  const navigation = props.navigation;

  const bellIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 3 ? 'bell' : 'bell-outline'}
      size={wp(6)}
      color={theme.colors.white}
    />
  );

  const locIcon = (
    <Icon
      type="Ionicons"
      name={selected === 1 ? 'location-sharp' : 'location-outline'}
      size={wp(6)}
      color={theme.colors.white}
    />
  );

  const homeIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 0 ? 'home' : 'home-outline'}
      size={wp(6)}
      color={theme.colors.white}
    />
  );

  const searchIcon = (
    <Icon
      type="MaterialIcons"
      name={'category'}
      size={wp(6)}
      color={theme.colors.white}
    />
  );

  const accountIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 4 ? 'account' : 'account-outline'}
      size={wp(6)}
      color={theme.colors.white}
    />
  );

  return (
    <Box bg="white" safeAreaTop>
      <Center flex={1} />
      <HStack bg="secondary.500" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            {homeIcon}
            <Text color="white" bold={selected === 0 ? 1 : 0} fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            {locIcon}
            <Text color="white" bold={selected === 1 ? 1 : 0} fontSize="12">
              Nearby
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(2)}>
          <Center>
            {searchIcon}
            <Text color="white" bold={selected === 2 ? 1 : 0} fontSize="12">
              Categories
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}>
          <Center>
            {bellIcon}
            <Text color="white" bold={selected === 3 ? 1 : 0} fontSize={12}>
              Notification
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 4 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(4)}>
          <Center>
            {accountIcon}
            <Text color="white" bold={selected === 4 ? 1 : 0} fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
