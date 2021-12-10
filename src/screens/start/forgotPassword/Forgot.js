import React from 'react';
import {VStack, Heading, Text, Input, Stack, theme, Box} from 'native-base';

import I18n from '../../../translations/i18n';
import Icon from '../../../assets/icons/Icon';
import {wp, hp, fp} from '../../../helpers/respDimension';
import {NButton, AppBar} from '../../../components';

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

const Forgot = ({navigation}) => {
  return (
    <>
      <AppBar navigation={navigation} />
      <VStack paddingX={wp(10)} mt={hp(3)}>
        <Heading fontSize={fp(4)} lineHeight={hp(5)} color="black">
          {I18n.t('Forgot.title')}
        </Heading>
        <Text bold color="black" mt={hp(2)}>
          {I18n.t('Forgot.emailHelp1')}{' '}
          <Text color="gray.500" mt={hp(2)} onPress={() => null}>
            {I18n.t('Forgot.emailHelp2')}
          </Text>
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
        </Stack>
        <Text color="gray.500" mt={hp(5)}>
          {I18n.t('Forgot.cantReset')}{' '}
        </Text>
        <Text
          color="secondary.500"
          onPress={() => navigation.navigate('SignIn')}>
          {I18n.t('Forgot.support')}
        </Text>
        <NButton title={I18n.t('Forgot.resetPass')} mt={hp(5)} />
      </VStack>
    </>
  );
};

export default Forgot;
