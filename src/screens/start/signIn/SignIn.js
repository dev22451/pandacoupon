import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Stack,
  Input,
  Box,
  theme,
  Link,
  Pressable,
} from 'native-base';

import Icon from '../../../assets/icons/Icon';
import I18n from '../../../translations/i18n';
import {fp, hp, wp} from '../../../helpers/respDimension';
import {AppBar, NButton} from '../../../components';

const emailIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="MaterialCommunityIcons"
      name="email"
      size={20}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

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

const eyeIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="MaterialIcons"
      name="visibility"
      size={20}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const eyeSlashIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="MaterialIcons"
      name="visibility-off"
      size={20}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const SignIn = ({navigation}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <AppBar navigation={navigation} />
      <VStack paddingX={wp(10)} mt={hp(3)}>
        <VStack>
          <Heading fontSize={fp(4)} lineHeight={hp(5)} color="black">
            {I18n.t('SignIn.title')}{' '}
          </Heading>
          <Heading fontSize={fp(4)} lineHeight={hp(5)} color="secondary.500">
            {I18n.t('SignIn.acc')}
          </Heading>
          <Text color="gray.500" mt={hp(2)}>
            {I18n.t('SignIn.loginHelp')}
          </Text>
          <Stack space={4} mt={hp(5)} alignItems="center">
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              _focus={{borderColor: 'secondary.500'}}
              InputLeftElement={emailIcon}
              placeholder="Email"
            />
            <Input
              type={show ? 'text' : 'password'}
              _focus={{borderColor: 'secondary.500'}}
              overflow="visible"
              w={{
                base: '100%',
                md: '25%',
              }}
              InputLeftElement={keyIcon}
              InputRightElement={
                <Pressable mr={wp(4)} onPress={handleClick}>
                  {show ? eyeIcon : eyeSlashIcon}
                </Pressable>
              }
              placeholder="Password"
            />
          </Stack>
          <Link
            onPress={() => navigation.navigate('Forgot')}
            mt={hp(1)}
            justifyContent="flex-end">
            {I18n.t('SignIn.forgotPass')}
          </Link>
          <Text color="gray.500" mt={hp(5)}>
            {I18n.t('SignIn.accountCheck')}{' '}
          </Text>
          <Text
            bold
            color="gray.600"
            onPress={() => navigation.navigate('Register')}>
            {I18n.t('SignIn.signUpLink')}
          </Text>
        </VStack>
        <VStack>
          <NButton title={I18n.t('SignIn.login')} mt={hp(5)} />
        </VStack>
      </VStack>
    </>
  );
};

export default SignIn;
