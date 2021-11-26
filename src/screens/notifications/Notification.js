import React from 'react';
import {VStack, Text, theme} from 'native-base';

import {fp} from '../../helpers/respDimension';
import {DBAppBar} from '../../components';

const Notification = ({navigation}) => {
  return (
    <>
      <VStack flex="1" justifyContent="center" alignItems="center">
        <Text fontWeight="md" fontSize={fp(3)}>
          Coming Soon
        </Text>
        <Text fontWeight="md" fontSize={fp(2)} color="gray.500">
          This screen is in under Developement.
        </Text>
      </VStack>
    </>
  );
};

export default Notification;
