import React,{useEffect} from 'react';
import {FlatList, VStack} from 'native-base';
import { useSelector,useDispatch } from 'react-redux';
import {hp, wp} from '../../helpers/respDimension';
import {CardComponent, DBAppBar} from '../../components';
import {getredeemCouponbyUser} from '../../redux/slices/couponSlice'

const Redeem = ({navigation}) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.loginSlice.userData);
  const redeemCouponbyUser=useSelector((state)=>state.couponSlice.redeemUserCoupon);
  
  const navigateToDetail = (id) => navigation.navigate('CouponDetail',{id});
  const renderCouponCard = ({item}) => <CardComponent {...{item,navigateToDetail}} />;

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
        />
      </VStack>
    </>
  );
};

export default Redeem;
