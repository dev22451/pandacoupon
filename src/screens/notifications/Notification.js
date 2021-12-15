import React,{useEffect} from 'react';
import {VStack, Text, theme, HStack,Box,FlatList} from 'native-base';

import {DBAppBar} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {TouchableOpacity} from 'react-native';
import { getNotification } from '../../redux/slices/notificationSlice';
import {fp, hp, wp} from '../../helpers/respDimension';
import {NotificatonCard} from '../../components/card/notificationCard';

const Notification = ({navigation}) => {
  const dispatch = useDispatch()
  const Notifications = useSelector((state) => state.notificationSlice);
  //console.log(Notifications,"notifications");
  //const navigateToList = (item) => navigation.navigate('')
  const renderCategory = () => <NotificatonCard/>;
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
      {/* <VStack flex="1" justifyContent="center" alignItems="center">
        <Text  fontSize={fp(3)}>
          Coming Soon
        </Text>
        <Text fontSize={fp(2)} color="gray.500">
          This screen is in under Developement.
        </Text>
      </VStack> */}
      <VStack flex="1" marginTop={hp(2)}>
      <FlatList
            pl={wp(2)}
            pr={wp(2)}
            data={[{}]}
            extraData={[]}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCategory}
            //ListEmptyComponent={<Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>}
          />
      </VStack>
    </>
  );
};

export default Notification;
