import React from 'react';
import {VStack, Heading, Text} from 'native-base';

import I18n from '../../../translations/i18n';
import {fp, hp, wp} from '../../../helpers/respDimension';
import NButton from '../../../components/button/NButton';

const Intro = ({navigation}) => {
  return (
    <VStack space={4} mt={hp(10)} paddingX={wp(10)}>
      <Heading
        bold
        fontSize="6xl"
        textAlign="center"
        my={hp(8)}
        color="secondary.500">
        {I18n.t('Intro.appName')}
      </Heading>
      <Heading width={wp(45)} fontSize={fp(4)} lineHeight={hp(5)} color="black">
        {I18n.t('Intro.headline')}
      </Heading>
      <Text color="gray.500">{I18n.t('Intro.description')}</Text>
      <VStack mt={hp(6)} space={hp(2)}>
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
      <Text color="gray.500" mt={hp(1)} textAlign="center">
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
  );
};

export default Intro;
