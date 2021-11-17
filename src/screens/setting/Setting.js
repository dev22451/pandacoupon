import React from 'react';
import {
  Box,
  Text,
  theme,
  HStack,
  VStack,
  Spacer,
  Center,
  Heading,
  IconButton,
  SectionList,
} from 'native-base';

import {DBAppBar} from '../../components';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';

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
    title: 'asdasd',
    data: [
      {
        title: 'security',
        id: '1',
        fullName: 'Change Password',
        iconName: 'key',
        recentText: 'Change your password',
      },
      {
        id: '2',
        title: 'security',
        fullName: 'Change language',
        iconName: 'translate',
        recentText: 'Change your language',
      },
    ],
  },
];

const Setting = ({navigation}) => {
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
        sections={data}
        keyExtractor={item => item.id}
        renderSectionHeader={({section: {title}}) => (
          <Heading fontSize="xl" mt="8" pb="4">
            {title}
          </Heading>
        )}
        renderItem={({item}) => (
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
                onPress={() => navigation.toggleDrawer()}
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
        )}
      />
    </>
  );
};

export default Setting;
