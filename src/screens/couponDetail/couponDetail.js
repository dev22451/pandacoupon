import React from 'react';
import {Box} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {wp} from '../../helpers/respDimension';
import { useSelector, useDispatch } from 'react-redux';
import {CouponCard} from '../../components';
import {redeemCoupon} from '../../redux/slices/couponSlice'
import { DBAppBar } from '../../components';

const CouponDetail = (props) => {
    const {route:{params:{id}},navigation} = props;
    const dispatch = useDispatch()
    const { couponList } = useSelector(state => state.couponSlice);
    const couponData = couponList.find((instance)=> instance._id === id);
    const handleRedeem = (itemID) => {
        dispatch(redeemCoupon(itemID))
    } 
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
      <Box alignItems='center' mt={wp(5)} >
        <CouponCard {...{couponData, handleRedeem}}  />
      </Box>
      </>
    );
  };
  
export default CouponDetail;
  