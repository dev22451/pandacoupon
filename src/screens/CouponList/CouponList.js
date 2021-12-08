import React,{useEffect} from 'react';
import {Box, FlatList} from 'native-base';
import ReactNativeSwipeableViewStack from 'react-native-swipeable-view-stack';
import {hp, wp} from '../../helpers/respDimension';
import { useSelector, useDispatch } from 'react-redux';
import {CouponCard} from '../../components';
import {getCoupon} from '../../redux/slices/couponSlice'
//import { useEffect } from 'react';
import {CardComponent,  DBAppBar} from '../../components';


const CouponList = (props) => {
    
    const dispatch = useDispatch()
    const {route:{params:{id}},navigation} = props;
    const { couponList } = useSelector(state => state.couponSlice);
    const navigateToDetail = (id) => navigation.navigate('CouponDetail',{id})
    
    useEffect(()=>{
        dispatch(getCoupon());
    },[]);

  const renderCouponCard = ({item}) => <CardComponent {...{item,navigateToDetail}} />;

  const renderEmpty=()=>( <Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>) 


    return (
      <>
       <DBAppBar
        back
        title="Coupon List"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <Box  >
      <FlatList
          mx={wp(5)}
          mb={hp(9)}
          data={couponList}
          keyExtractor={item => item.id}
          renderItem={renderCouponCard}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop:5}}
        />
      </Box>
      </>
    );
  };
  
export default CouponList;
  