import React from 'react';
import {Button, Text} from 'native-base';

import {hp} from '../../helpers/respDimension';

const NButton = ({title, variant, onPress, titleColor = 'white', ...props}) => {
  return (
    <Button
      size="sm"
      variant={variant}
      colorScheme="secondary"
      _text={{fontSize: 'sm'}}
      onPress={onPress}
      borderRadius="full"
      //height={hp(4)}
      {...props}>
      <Text fontSize="md" color={titleColor}>
        {title}
      </Text>
    </Button>
  );
};

export default NButton;
