/* eslint-disable react-native/no-inline-styles */
import {theme} from 'native-base';
import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';

import {hp} from '../../helpers/respDimension';

const ModalContent = ({content, show}) => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  show && onOpen();

  return (
    <>
      <Modalize
        ref={modalizeRef}
        alwaysOpen={hp(30)}
        modalStyle={{elevation: 5}}
        adjustToContentHeight={true}
        overlayStyle={{backgroundColor: 'transparent'}}
        handleStyle={{backgroundColor: theme.colors.coolGray[400]}}>
        {content}
      </Modalize>
    </>
  );
};

export default ModalContent;
