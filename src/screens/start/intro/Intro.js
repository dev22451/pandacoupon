import React from 'react';
import {Flex, VStack, Heading, Text} from 'native-base';

import I18n from '../../../translations/i18n';
import {fp, hp, wp} from '../../../helpers/respDimension';
import NButton from '../../../components/button/NButton';
import { Linking } from 'react-native';

const Intro = ({navigation}) => {
  const hanldePolicy =()=>{
    Linking.openURL('https://www.pinkscoupon.com/privacy-policy');
  }

  const hanldeTerms =()=>{
    Linking.openURL('https://www.pinkscoupon.com/Terms-condition');
  }

  return (
    <VStack space={hp(2)}  paddingX={wp(10)} height={hp(100)} width={wp(100)} >
      <Heading
        bold
        fontSize="6xl"
        textAlign="center"
        my={hp(7)}
        color="secondary.500">
        {I18n.t('Intro.appName')}
      </Heading>
      <Heading width={wp(50)} fontSize={fp(4)} lineHeight={hp(6)} color="black">
        {I18n.t('Intro.headline')}
      </Heading>
      <Text color="gray.500" fontSize={fp(2)}>{I18n.t('Intro.description')}</Text>
      <VStack mt={hp(3)} space={hp(2)}>
        <NButton
          title={I18n.t('Intro.login')}
          onPress={() => navigation.navigate('SignIn')}
        />
        <NButton
          variant="outline"
          titleColor="secondary.500"
          title={I18n.t('Intro.signUp')}
          onPress={() => navigation.navigate('Register')}
        />
      </VStack>
      <Text color="gray.500" mt={hp(2)} textAlign="center">
        {I18n.t('Intro.footerLine')}{' '}
        <Text color="black" bold onPress={hanldeTerms}>
          {I18n.t('Intro.terms')}
        </Text>{' '}
        {I18n.t('Intro.and')}{' '}
        <Text color="black" bold onPress={hanldePolicy}>
          {I18n.t('Intro.policy')}
        </Text>
      </Text>
    </VStack>
    
  );
};

export default Intro;
