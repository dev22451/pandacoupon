import React,{useEffect} from 'react';
import {Stack} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import { useSelector, useDispatch } from 'react-redux';
import {getCoupon} from '../../redux/slices/couponSlice'

import {CouponCard} from '../../components';
import {wp} from '../../helpers/respDimension';

const Coupon = ({navigation}) => {
  const dispatch = useDispatch()
  const { couponList } = useSelector(state => state.couponSlice);

  useEffect(()=>{
      dispatch(getCoupon());
  },[]);
  return (
    <>
      <Stack bg="secondary.500" flex="1" zIndex={-100} justifyContent="center">
        <ReactNativeSwipeableViewStack
          onSwipe={swipedIndex => console.log(swipedIndex)}
          initialSelectedIndex={1}
          data={couponList}
          renderItem={(item) => <CouponCard couponData={item} />}
          onItemClicked={element => console.log(element)}
          stackSpacing={wp(12)}
        />
      </Stack>
    </>
  );
};

export default Coupon;
