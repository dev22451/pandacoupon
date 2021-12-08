import React,{useEffect} from 'react';
import {Box} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {wp} from '../../helpers/respDimension';
import { useSelector, useDispatch } from 'react-redux';
import {CouponCard} from '../../components';
import {redeemCoupon,getCouponRedeem,getCoupon} from '../../redux/slices/couponSlice'
import { DBAppBar } from '../../components';
//import { useEffect } from 'react';

const CouponDetail = (props) => {
    
    const dispatch = useDispatch()
    const {route:{params:{id}},navigation} = props;
    const { couponList } = useSelector(state => state.couponSlice);
    const couponData = couponList.find((instance)=> instance._id === id);
    const handleRedeem = (itemID) => {
        dispatch(redeemCoupon(itemID))
    } 
    useEffect(()=>{
        getCoupon()
        dispatch(getCouponRedeem(id))
    },[]);
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
  