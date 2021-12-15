import React,{useEffect} from 'react';
import {VStack, Text, theme} from 'native-base';

import {fp} from '../../helpers/respDimension';
import {DBAppBar} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getNotification } from '../../redux/slices/notificationSlice';

const Notification = ({navigation}) => {
  const dispatch = useDispatch()
  const Notifications = useSelector((state) => state.notificationSlice);
  //console.log(Notifications,"notifications");
  
  useEffect(()=>{
    dispatch(getNotification());
  },[])


  return (
    <>
      <DBAppBar
        title="Notifications"
        navigation={navigation}
        titleColor={theme.colors.white}
        iconColor={theme.colors.white}
        bgColor={theme.colors.secondary[500]}
      />
      <VStack flex="1" justifyContent="center" alignItems="center">
        <Text  fontSize={fp(3)}>
          Coming Soon
        </Text>
        <Text fontSize={fp(2)} color="gray.500">
          This screen is in under Developement.
        </Text>
      </VStack>
    </>
  );
};

export default Notification;
