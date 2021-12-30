import React, {useEffect} from 'react';
import {Box, ScrollView, Text} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {wp} from '../../helpers/respDimension';
import {useSelector, useDispatch} from 'react-redux';
import {CouponCard} from '../../components';
import {
  redeemCoupon,
  getCouponRedeem,
  getCoupon,
  getCouponWithId,
  getCategoryCoupon,
  resetCouponItem,
} from '../../redux/slices/couponSlice';
import {DBAppBar, Loader} from '../../components';

const CouponDetail = props => {
  const dispatch = useDispatch();
  const {
    route: {params: {id, page}},navigation} = props;

  const {
          couponList, 
          isLoading, 
          couponItem, 
          couponCategoryList, 
          redeemUserCoupon, 
          couponData
       } = useSelector(state => state.couponSlice);
    

    // let couponData;
    // if(page === 'history'){
    //   couponData = redeemUserCoupon?.find(instance => instance._id === id);
    // } else {

    //   couponData = couponList?.find(instance => instance._id === id);
    //   if (!couponData) {
    //     couponData = couponCategoryList?.couponCategoryList?.find(
    //       instance => instance._id === id,
    //       );
    //     }
    //   }

    useEffect(() => {
      dispatch(getCouponWithId(id))
      getCoupon();
  
      if(page !== 'history'){
        dispatch(resetCouponItem());
        dispatch(getCouponRedeem(id))
       
      }
    }, []);

  const handleRedeem = itemID => {
    dispatch(redeemCoupon(itemID));
  };

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
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <Box alignItems="center" mt={wp(5)}>
            {
              couponData ? 
              <CouponCard {...{couponData, handleRedeem, couponItem, page}} />
              :
              null
            }
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default CouponDetail;
