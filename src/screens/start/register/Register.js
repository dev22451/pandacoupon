import React, {useState} from 'react';
import {
  VStack,
  Heading,
  Text,
  Input,
  Stack,
  theme,
  Box,
  FormControl,
} from 'native-base';
import {TouchableOpacity} from 'react-native';

import {AppBar} from '../../../components';
import I18n from '../../../translations/i18n';
import Icon from '../../../assets/icons/Icon';
import NButton from '../../../components/button/NButton';
import {wp, hp, fp} from '../../../helpers/respDimension';
import {validateEmail, validatePassword} from '../../../helpers/validation';

const userIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="MaterialCommunityIcons"
      name="account"
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

const phoneIcon = (
  <Box ml={wp(5)}>
    <Icon
      type="MaterialIcons"
      name="phone-in-talk"
      size={20}
      color={theme.colors.secondary[500]}
    />
  </Box>
);

const Register = ({navigation}) => {
  const [email, setEmail] = useState({email: '', valid: ''});
  const [password, setPassword] = useState({password: '', valid: ''});

  const handleEmail = text => {
    validateEmail(text)
      ? setEmail({email: '', valid: true})
      : setEmail({email: text, valid: false});
  };
  const handlePassword = text => {
    validatePassword(text)
      ? setPassword({password: '', valid: true})
      : setPassword({password: text, valid: false});
  };

  return (
    <>
      <AppBar navigation={navigation} />
      <VStack paddingX={wp(10)} mt={hp(3)}>
        <Heading fontSize={fp(4)} lineHeight={hp(5)} color="black">
          {I18n.t('Register.title')}
        </Heading>
        <Text color="gray.500" mt={hp(2)}>
          {I18n.t('Register.loginHelp')}{' '}
          <Text
            bold
            color="secondary.500"
            mt={hp(2)}
            onPress={() => console.log('hello world')}>
            {I18n.t('Register.help')}
          </Text>
        </Text>
        <Stack space={4} mt={hp(5)} alignItems="center">
          <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            _focus={{borderColor: 'secondary.500'}}
            InputLeftElement={userIcon}
            placeholder="Name"
          />
          <FormControl
            w={{
              base: '100%',
              md: '25%',
            }}
            isInvalid={email.valid}>
            <Input
              placeholder="Email"
              InputLeftElement={emailIcon}
              _focus={{borderColor: 'secondary.500'}}
              onChangeText={text => handleEmail(text)}
            />
            <FormControl.ErrorMessage>Invalid Mail</FormControl.ErrorMessage>
          </FormControl>
          <Input
            placeholder="Number"
            InputLeftElement={phoneIcon}
            _focus={{borderColor: 'secondary.500'}}
          />
          <FormControl
            w={{
              base: '100%',
              md: '25%',
            }}
            isInvalid={password.valid}>
            <Input
              placeholder="Password"
              InputLeftElement={keyIcon}
              _focus={{borderColor: 'secondary.500'}}
              onChangeText={text => handlePassword(text)}
            />
            <FormControl.ErrorMessage>
              Invalid Password
            </FormControl.ErrorMessage>
          </FormControl>
        </Stack>
        <Text color="gray.500" mt={hp(5)}>
          {I18n.t('Register.accountCheck')}{' '}
        </Text>
        <Text
          bold
          color="gray.600"
          onPress={() => navigation.navigate('SignIn')}>
          {I18n.t('Register.loginLink')}
        </Text>
        <NButton title={I18n.t('Register.signUp')} mt={hp(5)} />
        <Text color="gray.500" mt={hp(10)} textAlign="center">
          {I18n.t('Intro.footerLine')}{' '}
          <Text color="black" bold>
            {I18n.t('Intro.terms')}
          </Text>{' '}
          {I18n.t('Intro.and')}{' '}
          <Text color="black" bold>
            {I18n.t('Intro.policy')}
          </Text>
        </Text>
      </VStack>
    </>
  );
};

export default Register;
