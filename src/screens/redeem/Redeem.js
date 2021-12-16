import React,{useEffect} from 'react';
import {FlatList, VStack, Text} from 'native-base';
import { useSelector,useDispatch } from 'react-redux';
import {hp, wp, fp} from '../../helpers/respDimension';
import {CardComponent, DBAppBar} from '../../components';
import {getredeemCouponbyUser} from '../../redux/slices/couponSlice'

const Redeem = ({navigation}) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.loginSlice.userData);
  const redeemCouponbyUser=useSelector((state)=>state.couponSlice.redeemUserCoupon);
  
  const navigateToDetail = (item) => navigation.navigate('CouponDetail',{id:item.couponId, page:'history'});
  const renderCouponCard = ({item}) => <CardComponent {...{item,navigateToDetail}} />;

  const renderEmpty=()=>( <Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>) 

  useEffect(()=>{
      dispatch(getredeemCouponbyUser({
        userEmail:userData.email
      }));
  },[]);
  return (
    <>
      <DBAppBar
        title="Redeem history"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <VStack alignItems="center" width={wp(100)} marginBottom={wp(17)}>
        <FlatList
          data={redeemCouponbyUser}
          extraData={redeemCouponbyUser}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderCouponCard}
          contentContainerStyle={{marginTop: hp(2)}}
          ListEmptyComponent={renderEmpty}
        />
      </VStack>
    </>
  );
};

export default Redeem;
