import React,{useEffect} from 'react';
import {Stack} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import { useSelector, useDispatch } from 'react-redux';
import {getCoupon,getCouponRedeem,redeemCoupon} from '../../redux/slices/couponSlice'

import {CouponCard,Loader} from '../../components';
import {wp} from '../../helpers/respDimension';

const Coupon = ({navigation}) => {
  const dispatch = useDispatch()
  const {couponList, isRedeemCoupon, couponItem, couponCategoryList} =
    useSelector(state => state.couponSlice);
    console.log(isRedeemCoupon);
  
  const handleRedeem = itemID => {
    console.log(itemID,'jdsgfbuj');
    dispatch(redeemCoupon(itemID));
  };

  useEffect(()=>{
      dispatch(getCoupon());
      dispatch(getCouponRedeem(id));
  },[]);
  return (
    <>
     {isRedeemCoupon ? (
        <Loader />
      ) : (
      <Stack bg="secondary.500" flex="1" zIndex={-100} justifyContent="center">
        <ReactNativeSwipeableViewStack
          onSwipe={swipedIndex => console.log(swipedIndex)}
          initialSelectedIndex={1}
          data={couponList}
          renderItem={(item) => <CouponCard couponData={item} handleRedeem={handleRedeem} couponItem={couponItem} />}
          onItemClicked={element => console.log(element)}
          stackSpacing={wp(12)}
        />
      </Stack>
      )}
    </>
  );
};

export default Coupon;
