import React, { useEffect, useState, useCallback } from 'react';
import { Box, FlatList, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { hp, wp, fp } from '../../helpers/respDimension';
import { CardComponent, DBAppBar, Loader } from '../../components';
import { getCoupon, updateCoupon, } from '../../redux/slices/couponSlice';
import { getCategoryCoupon, updateCategoryCoupon } from '../../redux/slices/categoryCouponSlice';

const CouponList = (props) => {
  const { navigation } = props;
  const categoryId = (props?.route?.params && props?.route?.params?.item) ? props?.route?.params?.item?._id : ''

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const { couponList, isLoading, page, totalpages, totalDoc } = useSelector(state => state.couponSlice);
  const { couponCategoryList,
    totalDocs,
    page: pageForCouponCategoryData,
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
          (
            (!loading && totalpages > page
              || page <= totalpages && couponList.length
            )
            ||
            (!loading && totalPage > pageForCouponCategoryData
              || pageForCouponCategoryData <= totalPage && couponCategoryList.length
            )
          )
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
        if (pageForCouponCategoryData <= totalPage) {
          dispatch(updateCategoryCoupon({
            categoryID: categoryId,
            limit: 2,
            page:
             pageForCouponCategoryData <= totalPage 
                ? pageForCouponCategoryData + 1
                : pageForCouponCategoryData
          }))
        } else return;
      }
      else {

        if (page <= totalpages) {
          dispatch(updateCoupon(page <= totalpages ? page + 1 : page))
        }
        else return;
      }
    }
    , [page, { page: pageForCouponCategoryData }])

  useEffect(() => {
    if (categoryId) {
       if (pageForCouponCategoryData == 1) {
        dispatch(getCategoryCoupon({
          categoryID: categoryId,
          limit: 2,
          page: 1,
        }))
       }
    }
    else {
      if (page == 1) {
        dispatch(getCoupon(page + 1));
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
      {/* {(isLoading) ? (
        <Loader />
      ) : ( */}
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
          ListEmptyComponent={totalDoc == 0 ? renderEmpty: null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 5 }}
          ListFooterComponent={BottomView}
        />
      </Box>
      {/* )} */}
    </>
  );
};

export default CouponList;
