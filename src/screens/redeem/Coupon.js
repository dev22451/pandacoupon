import React from 'react';
import {Stack} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';

import {CouponCard} from '../../components';
import {wp} from '../../helpers/respDimension';

const Coupon = ({navigation}) => {
  return (
    <>
      <Stack bg="secondary.500" flex="1" zIndex={-100} justifyContent="center">
        <ReactNativeSwipeableViewStack
          onSwipe={swipedIndex => console.log(swipedIndex)}
          initialSelectedIndex={1}
          data={[1, 2, 3]}
          renderItem={() => <CouponCard />}
          onItemClicked={element => console.log(element)}
          stackSpacing={wp(12)}
        />
      </Stack>
    </>
  );
};

export default Coupon;
