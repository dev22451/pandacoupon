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
  FormControl,
  ScrollView,
  Toast
} from 'native-base';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Icon from '../../../assets/icons/Icon';
import I18n from '../../../translations/i18n';
import {AppBar, NButton, Loader} from '../../../components';
import {fp, hp, wp} from '../../../helpers/respDimension';
import {login} from '../../../redux/slices/loginSlice';
import {validateEmail, validatePassword} from '../../../helpers/validation';

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
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState({email: '', valid: ''});
  const [password, setPassword] = useState({password: '', valid: ''});

  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.loginSlice);

  const handleClick = () => setShow(!show);

  const handleEmail = text => {
    validateEmail(text)
      ? setEmail({email: text, valid: true})
      : setEmail({email: text, valid: false});
  };
  const handlePassword = text => {
    (text.length<6)
      ? setPassword({password: text, valid: true})
      : setPassword({password: text, valid: false});
  };

  const handleSignIn = () => {
    const isEmailValidate = email.email !== ''
    //const isEmailValidate = email.email !== validateEmail
    const isPasswordValidate = password.password !== ''  
    
     if (!isEmailValidate && !isPasswordValidate){
      Toast.show({
        title: 'Invalid Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description:'Please Enter Email and Password'
      });

    }
     else if(!isEmailValidate){
      Toast.show({
        title: 'Invalid Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description:'Please Enter Email'
      });

    }else if(email.valid){
      Toast.show({
        title: 'Invalid Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description:'Please Enter Valid Email'
      });

    }else if(!isPasswordValidate) {
      Toast.show({
        title: 'Invalid Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description:'Please Enter Password'
      }); 
    }else if(password.valid) {
      Toast.show({
        title: 'Invalid Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description:'Please Enter Valid Password'
      });
    } else {
      const payload = {
        userEmail: email.email,
        Password: password.password,
        isWeb : false,
      };
      dispatch(login({payload}));
    }
  };

  return (
    <>
      <AppBar navigation={navigation} />
      {isLoading ? <Loader /> : null}
      <ScrollView>
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
          <FormControl
              w={{
                base: '100%',
                md: '25%',
              }}
              isInvalid={email.valid}>
              <Input
                placeholder="Email"
                InputLeftElement={emailIcon}
                value={email.email}
                _focus={{borderColor: 'secondary.500'}}
                onChangeText={text => handleEmail(text)}
              />
              <FormControl.ErrorMessage>Invalid Mail</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              w={{
                base: '100%',
                md: '25%',
              }}
              isInvalid={password.valid}>
                
              <Input
                type={show ? 'text' : 'password'}
                _focus={{borderColor: password.valid ? 'red' : 'secondary.500'}}
                placeholder="Password"
                overflow="visible"
                InputLeftElement={keyIcon}
                InputRightElement={
                  <Pressable mr={wp(4)} onPress={handleClick}>
                    {show ? eyeIcon : eyeSlashIcon}
                  </Pressable>
                }
                value={password.password}
                onChangeText={text => handlePassword(text)}
              />
              <FormControl.ErrorMessage>
                Invalid Password
              </FormControl.ErrorMessage>
            </FormControl>
          </Stack>
          {/* <Link
            onPress={() => navigation.navigate('Forgot')}
            mt={hp(1)}
            justifyContent="flex-end">
            {I18n.t('SignIn.forgotPass')}
          </Link> */}
          <Text color="gray.500" mt={hp(5)}>
            {I18n.t('SignIn.accountCheck')}{' '}
          </Text>
          <Text
            bold
            color="secondary.500"
            onPress={() => navigation.navigate('Register')}>
            {I18n.t('SignIn.signUpLink')}
          </Text>
        </VStack>
        <VStack>
          <NButton
            title={I18n.t('SignIn.login')}
            mt={hp(5)}
            onPress={handleSignIn}
          />
        </VStack>
      </VStack>
      </ScrollView>
    </>
  );
};

export default SignIn;
