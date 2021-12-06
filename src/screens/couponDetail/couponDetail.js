import React from 'react';
import {Stack} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {wp} from '../../helpers/respDimension';
import { useSelector, useDispatch } from 'react-redux';
import {CouponCard} from '../../components';

const CouponDetail = (props) => {
    const {route:{params:{id}},navigation} = props;
    const dispatch = useDispatch()
    console.log(id)
    const { couponList } = useSelector(state => state.couponSlice);
    const couponData = couponList.find((instance)=> instance._id === id);
    const handleRedeem = (id) => {
        console.log(id)
    } 
    return (
      <>
        <Stack bg="secondary.500" flex="1" zIndex={-100} justifyContent="center">
          <ReactNativeSwipeableViewStack
            onSwipe={swipedIndex => console.log(swipedIndex)}
            initialSelectedIndex={1}
            data={[1]}
            renderItem={() => <CouponCard {...{couponData, handleRedeem}}  />}
            onItemClicked={element => console.log(element)}
            stackSpacing={wp(12)}
          />
        </Stack>
      </>
    );
  };
  
export default CouponDetail;
  