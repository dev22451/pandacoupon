import React from 'react';
import {
  Box,
  Text,
  theme,
  HStack,
  VStack,
  Spacer,
  IconButton,
  SectionList,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {DBAppBar} from '../../components';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';
import {logOut} from '../../redux/slices/loginSlice';

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={wp(4)}
    color={theme.colors.black}
  />
);

const data = [
  {
    data: [
      {
        id: '1',
        fullName: 'Change Password',
        iconName: 'key',
        recentText: 'Change your password',
      },
      {
        id: '2',

        fullName: 'Change language',
        iconName: 'translate',
        recentText: 'Change your language',
      },
    ],
  },
  {
    title: 'NOTIFICATIONS',
    data: [
      {
        id: '1',
        fullName: 'Push Notifications',
        iconName: 'bell',
        recentText: 'For daily update you will get it',
      },
    ],
  },
  {
    title: 'MORE',
    data: [
      {
        id: '1',
        fullName: 'Rate Us',
        iconName: 'star',
        recentText: 'Rate us playstore, appstore',
      },
      {
        id: '1',
        fullName: 'FAQs',
        iconName: 'book',
        recentText: 'Frequently asked questions',
      },
    ],
  },
  {
    title: 'ACCOUNT',
    data: [
      {
        id: '1',
        fullName: 'Logout',
        iconName: 'logout',
        recentText: 'Rate us playstore, appstore',
      },
    ],
  },
];

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePress = item => {
    switch (item.fullName) {
      case 'Change Password':
        navigation.navigate('PasswordChange');
        break;

      case 'Push Notifications':
        navigation.navigate('Notification');
        break;

      case 'Logout':
        dispatch(logOut());
        break;

      default:
        break;
    }
  };
  return (
    <>
      <DBAppBar
        back
        title="Settings"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <SectionList
        mb="4"
        zIndex={-1}
        mt={wp(-15)}
        sections={data}
        keyExtractor={item => item.id}
        renderSectionHeader={({section: {title}}) => (
          <Text mt="8" ml={wp(5)} fontWeight="medium" pb="4">
            {title}
          </Text>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => handlePress(item)}>
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
                      size={wp(7)}
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
                    fontSize="md">
                    {item.fullName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item.recentText}
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
      />
    </>
  );
};

export default Setting;
