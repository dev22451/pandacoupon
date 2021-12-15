import React, {useEffect} from 'react';
import {Box, ScrollView} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {wp} from '../../helpers/respDimension';
import {useSelector, useDispatch} from 'react-redux';
import {CouponCard} from '../../components';
import {
  redeemCoupon,
  getCouponRedeem,
  getCoupon,
  getCategoryCoupon,
} from '../../redux/slices/couponSlice';
import {DBAppBar, Loader} from '../../components';
//import { useEffect } from 'react';

const CouponDetail = props => {
  const dispatch = useDispatch();
  const {
    route: {
      params: {id, page},
    },
    navigation,
  } = props;
  const {couponList, isRedeemCoupon, couponItem, couponCategoryList, redeemUserCoupon} =
    useSelector(state => state.couponSlice);
    
    let couponData;
    if(page === 'history'){
      couponData = redeemUserCoupon?.find(instance => instance._id === id);
    } else {

      couponData = couponList?.find(instance => instance._id === id);
      if (!couponData) {
        couponData = couponCategoryList?.couponCategoryList?.find(
          instance => instance._id === id,
          );
        }
      }
  const handleRedeem = itemID => {
    dispatch(redeemCoupon(itemID));
  };
  useEffect(() => {
    getCoupon();
    if(page !== 'history'){
      dispatch(getCouponRedeem(id));
    }
  }, []);
  return (
    <>
      <DBAppBar
        back
        title="Coupon Details"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      {isRedeemCoupon ? (
        <Loader />
      ) : (
        <ScrollView>
          <Box alignItems="center" mt={wp(5)}>
            <CouponCard {...{couponData, handleRedeem, couponItem, page}} />
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default CouponDetail;
