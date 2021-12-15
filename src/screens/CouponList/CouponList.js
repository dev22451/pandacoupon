import React,{useEffect} from 'react';
import {Box, FlatList,Text} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

import {hp, wp,fp} from '../../helpers/respDimension';
import {CardComponent,  DBAppBar} from '../../components';
import {getCoupon, getCategoryCoupon} from '../../redux/slices/couponSlice'

const CouponList = (props) => {
  const {navigation} = props;
  const categoryId = (props?.route?.params && props?.route?.params?.item) ? props?.route?.params?.item?._id : ''
 
  const dispatch = useDispatch()
  const { couponList, couponCategoryList } = useSelector(state => state.couponSlice);

  const categoryDataList = categoryId ? couponCategoryList.couponCategoryList : couponList
 
  const navigateToDetail = (id) => navigation.navigate('CouponDetail',{id})

  useEffect(()=>{
      if(categoryId) {
        dispatch(getCategoryCoupon(categoryId))
      }
      else{
        dispatch(getCoupon());
      }
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
          data={categoryDataList}
          extraData={categoryDataList}
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
  