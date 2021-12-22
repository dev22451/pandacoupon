import React,{useEffect,useState,useCallback} from 'react';
import {Box, FlatList,Text} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, View, ActivityIndicator} from 'react-native';

import {hp, wp,fp} from '../../helpers/respDimension';
import {CardComponent,  DBAppBar, Loader} from '../../components';
import {getCoupon, getCategoryCoupon} from '../../redux/slices/couponSlice'

const CouponList = (props) => {
  const {navigation} = props;
  const categoryId = (props?.route?.params && props?.route?.params?.item) ? props?.route?.params?.item?._id : ''
 
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(false);

  const { couponList, couponCategoryList,isLoading,page } = useSelector(state => state.couponSlice);

  const categoryDataList = categoryId ? couponCategoryList : couponList
 
  const navigateToDetail = (item) => navigation.navigate('CouponDetail',{id:item._id})

  const BottomView = () => {
    return (
      <View>
        {
          (!loading)
            ?
            <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 6 }} />
            :
            null
        }
      </View>
    )
  }

  const handleLoadMore = useCallback(
    () => {
      // if(!isLoading){
        //  setPage(page + 1)
        //  if(categoryId) {
        //   dispatch(getCategoryCoupon(categoryId))
        // }
        // else{
          dispatch(getCoupon(page+1));
       // }
      // }
    }
    ,[dispatch,page])

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
      {(isLoading) ? (
        <Loader />
      ) : (
      <Box  >
      <FlatList
          mx={wp(5)}
          mb={hp(9)}
          data={categoryDataList}
          extraData={categoryDataList}
          keyExtractor={item => item._id}
          renderItem={renderCouponCard}
          // onEndReached={() => handleLoadMore()}
          // refreshing={isLoading}
          // onEndReachedThreshold={0.5}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop:5}}
          //ListFooterComponent={BottomView}
        />
      </Box>
       )}
      </>
    );
  };
  
export default CouponList;
  