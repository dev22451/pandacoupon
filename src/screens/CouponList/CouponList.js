import React, { useEffect, useState, useCallback } from 'react';
import { Box, FlatList, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { hp, wp, fp } from '../../helpers/respDimension';
import { CardComponent, DBAppBar, Loader } from '../../components';
import { getCoupon, updateCoupon, } from '../../redux/slices/couponSlice';
import { getCategoryCoupon, updateCategoryCoupon, resetCategoryCouponSlice } from '../../redux/slices/categoryCouponSlice';

const CouponList = (props) => {
  const { navigation } = props;
  const categoryId = (props?.route?.params && props?.route?.params?.item) ? props?.route?.params?.item?._id : ''

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const { couponList, isLoading, page, totalpages, totalDoc } = useSelector(state => state.couponSlice);
  const { couponCategoryList,
    totalDocs,
    pages,
    isLoading: isLoadingForCouponCategoryData,
    totalPage
  } = useSelector(state => state.categoryCouponSlice);
  
  const categoryDataList = categoryId ? couponCategoryList : couponList

  const navigateToDetail = (item) => navigation.navigate('CouponDetail', { id: item._id })

  const BottomView = () => {
    return (
      <View>
        {
          // (!loading && totalPage > pageForCouponCategoryData || pageForCouponCategoryData <= totalPage && couponCategoryList.length)
  
          (!loading && totalPage>=pages && totalDocs>0)
  
         // (!isLoading ? (!loading && totalpages>=page): (!loading && totalPage>=pages && totalDocs>0))
          //  ( !loading &&
          //   ( totalPage > pages
          //     || pages <= totalPage 
          //   )
          //   ||
          //   ( totalpages > page
          //     || page <= totalpages 
          //   )
          //  )
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
      if (categoryId) {
        console.log(pages,'gdfygdsuyg');
        if (pages <= totalPage) {
          dispatch(updateCategoryCoupon({
            categoryID: categoryId,
            limit: 2,
            page: pages + 1
              
          }))
        } else return;
      }
      else {

        if (page <= totalpages) {
          dispatch(updateCoupon(totalpages>=page ? page + 1 : page))
        }
        else return;
      }
    }
    , [page, pages])

    useEffect(() => {
      
      if (categoryId) {
        //if(pages==1){
          dispatch(getCategoryCoupon({
            categoryID: categoryId,
            limit: 2,
            page: 1,
          }))
        //}else return; 
      }
      else {
        if (page == 1) {
          dispatch(getCoupon(1));
        }
      }
    }, []);

 
  const renderCouponCard = ({ item }) => <CardComponent {...{ item, navigateToDetail }} />;

  const renderEmpty = () => (<Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>)

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
      {(isLoadingForCouponCategoryData) ? (
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
          onEndReached={() => handleLoadMore()}
          refreshing={loading}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={totalDoc >= 0 ? renderEmpty: null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 5 }}
          ListFooterComponent={BottomView}
        />
      </Box>
    )}
    </>
  );
};

export default CouponList;
