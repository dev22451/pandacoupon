import {
  VStack,
  Heading,
  Text,
  Input,
  Stack,
  theme,
  Box,
  FormControl,
  ScrollView,
  Pressable,
  Toast,
} from 'native-base';
import React, {useState} from 'react';
import { Linking } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppBar, Loader} from '../../../components';
import I18n from '../../../translations/i18n';
import Icon from '../../../assets/icons/Icon';
import NButton from '../../../components/button/NButton';
import {wp, hp, fp} from '../../../helpers/respDimension';
import {register} from '../../../redux/slices/loginSlice';
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

const Register = ({navigation}) => {
  const [email, setEmail] = useState({email: '', valid: ''});
  const [password, setPassword] = useState({password: '', valid: ''});
  const [confirmPassword, setConfirmPassword] = useState({confirmPassword: '', valid: ''});
  const [number, setNumber] = useState({number: '',valid:''});
  const [name, setName] = useState({name:'',valid:''});
  const [show, setShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow]=useState(false);

  const dispatch = useDispatch();
  const {isLoading,reset} = useSelector(state => state.loginSlice);
  const handleClick = () => setShow(!show);
  const handleConfirmPasswordClick = () => setConfirmPasswordShow(!confirmPasswordShow);

  const hanldePolicy =()=>{
    Linking.openURL('https://www.privacypolicytemplate.net/live.php?token=15DAogfxiUv02luwfVRDjcDaD02xAGVe');
  }

  const hanldeTerms =()=>{
    Linking.openURL('https://www.privacypolicytemplate.net/live.php?token=15DAogfxiUv02luwfVRDjcDaD02xAGVe');
  }

  const handleName= text =>{
    (text==='')?
    setName({name:text,valid:true}):
    setName({name:text,valid:false});
  }

  const handleEmail = text => {
    validateEmail(text)
      ? setEmail({email: text, valid: true})
      : setEmail({email: text, valid: false});
   // setEmail({email: text, valid: false});import { Linking } from 'react-native';
  };
  const handleNumber = text => {
    (text==='')
      ? setNumber({number: text, valid: true})
      : setNumber({number: text, valid: false});
  };
  const handleConfirmPassword = (text) => {
    (password.password!==text)?
    setConfirmPassword({confirmPassword:text,valid: true})
    : setConfirmPassword({confirmPassword:text,valid: false});
  };

  const handleSignUp = () => {
    const isNameValidate=name.name!=='';
    const isEmailValidate = email.email !== '';
    const isPasswordValidate = password.password !== '';
    const isConfirmPasswordValidate=confirmPassword.confirmPassword!=='';
    const isValidPhoneNumber = number.number !== '';
    if (isNameValidate && isEmailValidate &&  isValidPhoneNumber && isPasswordValidate && isConfirmPasswordValidate) {
      const payload = {
        userName: name.name,
        PhoneNumber: number.number,
        userEmail: email.email,
        Password: password.password,
      };
      const request = {
        payload,
        onSuccess: () => {
          setName({name:'',valid:''})
          setEmail({email:'',valid:''})
          setNumber({number:'',valid:''})
          setPassword({password:'',valid:''})
          setConfirmPassword({confirmPassword:'',valid:''})
          navigation.navigate('SignIn');
  
        },
        onFail: (err) => {
          // apiErrorHandle(err)
        },
      };
      dispatch(register(request));
     
    } 
    else if(!isNameValidate && !isEmailValidate && !isPasswordValidate && !isValidPhoneNumber && !isConfirmPasswordValidate){
      let message = 'Please Enter All Data';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(!isNameValidate){
      let message = 'Please Enter Name';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }

    else if(!isEmailValidate && !email.valid ){
      let message = 'Please Enter Email';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(email.valid){
      let message = 'Please Enter Valid Email';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(!isValidPhoneNumber){
      let message = 'Please Enter Number';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(!isPasswordValidate && !password.valid){
      let message = 'Please Enter Password';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(password.valid){
      let message = 'Password length should be more than 6';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else if(!isConfirmPasswordValidate && !confirmPassword.valid){
      let message = 'Please Enter Confirm Password ';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    else {
      let message = 'Password not match';
      Toast.show({
        title: 'Fill All Data',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: message,
      });
    }
    
  };

  return (
    <>
      <AppBar navigation={navigation} />
      {isLoading ? <Loader /> : null}
    <ScrollView> 
        <VStack paddingX={wp(10)} my={hp(3)}>
          <Heading fontSize={fp(4)} lineHeight={hp(5)} color="black">
            {I18n.t('Register.title')}
          </Heading>
          <Text color="gray.500" mt={hp(2)}>
            {I18n.t('Register.loginHelp')}{' '}
            <Text bold color="secondary.500" mt={hp(2)} onPress={() => null}>
              {I18n.t('Register.help')}
            </Text>
          </Text>
          <Stack space={4} mt={hp(5)} alignItems="center">
          <FormControl
              w={{
                base: '100%',
                md: '25%',
              }}
              isInvalid={name.valid}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              _focus={{borderColor: 'secondary.500'}}
              InputLeftElement={userIcon}
              placeholder="Name"
              value={name.name}
              onChangeText={text => handleName(text)}
            />
            <FormControl.ErrorMessage>Enter Name</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              w={{
                base: '100%',
                md: '25%',
              }}
              isInvalid={email.valid}>
              <Input
                placeholder="Email"
                value={email.email}
                InputLeftElement={emailIcon}
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
              isInvalid={number.valid}>
            <Input
              placeholder="Number"
              InputLeftElement={phoneIcon}
              value={number.number}
              _focus={{borderColor: 'secondary.500'}}
              onChangeText={text => handleNumber(text)}/>
            <FormControl.ErrorMessage>Enter Number</FormControl.ErrorMessage>
            </FormControl>
            {/* <FormControl
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
            </FormControl> */}
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
                value={password.password}
                InputLeftElement={keyIcon}
                InputRightElement={
                  <Pressable mr={wp(4)} onPress={handleClick}>
                    {show ? eyeIcon : eyeSlashIcon}
                  </Pressable>
                }
                // value={password.password}
                onChangeText={text => handlePassword(text)}
              />
              <FormControl.ErrorMessage>
                Invalid Password
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              w={{
                base: '100%',
                md: '25%',
              }}
              isInvalid={confirmPassword.valid}>
                
              <Input
                type={confirmPasswordShow ? 'text' : 'password'}
                _focus={{borderColor: confirmPassword.valid ? 'red' : 'secondary.500'}}
                placeholder="Confirm Password"
                overflow="visible"
                value={confirmPassword.confirmPassword}
                InputLeftElement={keyIcon}
                InputRightElement={
                  <Pressable mr={wp(4)} onPress={handleConfirmPasswordClick}>
                    {confirmPasswordShow ? eyeIcon : eyeSlashIcon}
                  </Pressable>
                }
                // value={password.password}
                onChangeText={text => handleConfirmPassword(text)}
              />
              <FormControl.ErrorMessage>
               Password Not Match
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
          <NButton
            title={I18n.t('Register.signUp')}
            mt={hp(4)}
            onPress={handleSignUp}
          />
          <Text color="gray.500" mt={hp(5)} textAlign="center">
            {I18n.t('Intro.footerLine')}{' '}
            <Text color="black" bold>
              {I18n.t('Intro.terms')}
            </Text>{' '}
            {I18n.t('Intro.and')}{' '}
            <Text color="black" bold onPress={hanldePolicy}>
              {I18n.t('Intro.policy')}
            </Text>
          </Text>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Register;
