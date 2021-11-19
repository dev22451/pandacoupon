import React from 'react';
import {Input, VStack, theme, Stack, Box} from 'native-base';

import {DBAppBar, NButton} from '../../components';
import Icon from '../../assets/icons/Icon';
import {hp, wp} from '../../helpers/respDimension';

const keyIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="Octicons"
      name="key"
      size={20}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const PasswordChange = ({navigation}) => {
  return (
    <>
      <DBAppBar
        cog
        back
        iconColor="white"
        titleColor="white"
        title="Change Password"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <Stack space={4} mt={hp(5)} px={wp(5)} alignItems="center">
        <Input
          w={{
            base: '100%',
            md: '25%',
          }}
          _focus={{borderColor: 'secondary.500'}}
          InputLeftElement={keyIcon}
          placeholder="Old Password"
          placeholderTextColor="gray.500"
        />
        <Input
          w={{
            base: '100%',
            md: '25%',
          }}
          _focus={{borderColor: 'secondary.500'}}
          InputLeftElement={keyIcon}
          placeholder="Retype Password"
          placeholderTextColor="gray.500"
        />
        <Input
          w={{
            base: '100%',
            md: '25%',
          }}
          _focus={{borderColor: 'secondary.500'}}
          InputLeftElement={keyIcon}
          placeholder="Password"
          placeholderTextColor="gray.500"
        />
      </Stack>
      <VStack px={wp(5)}>
        <NButton title={'Change Password'} mt={hp(4)} />
      </VStack>
    </>
  );
};

export default PasswordChange;
