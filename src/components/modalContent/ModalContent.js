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
        modalStyle={{elevation: 5}}
        handleStyle={{backgroundColor: theme.colors.coolGray[400]}}
        adjustToContentHeight={true}
        overlayStyle={{backgroundColor: 'transparent'}}>
        {content}
      </Modalize>
    </>
  );
};

export default ModalContent;
