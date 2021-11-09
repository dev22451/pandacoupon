import React from 'react';
import {VStack, Heading, Text} from 'native-base';

import I18n from '../../../translations/i18n';
import {fp, hp, wp} from '../../../helpers/respDimension';
import NButton from '../../../components/button/NButton';

const Intro = ({navigation}) => {
  return (
    <VStack space={4} mt={hp(10)} p={wp(15)}>
      <Heading
        bold
        fontSize="6xl"
        textAlign="center"
        mb={hp(5)}
        color="secondary.500">
        {I18n.t('Intro.appName')}
      </Heading>
      <Heading width={wp(45)} fontSize={fp(4)} lineHeight={hp(5)} color="black">
        {I18n.t('Intro.headline')}
      </Heading>
      <Text color="gray.500">{I18n.t('Intro.description')}</Text>
      <VStack mt={hp(2)} space={hp(2)}>
        <NButton title={I18n.t('Intro.login')} />
        <NButton variant="outline" title={I18n.t('Intro.signUp')} />
      </VStack>
      <Text color="gray.500" mt={hp(3)} textAlign="center">
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
