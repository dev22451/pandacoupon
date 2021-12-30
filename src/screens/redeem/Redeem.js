import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, VStack, Text } from 'native-base';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { hp, wp, fp } from '../../helpers/respDimension';
import { CardComponent, DBAppBar, Loader } from '../../components';
import { getredeemCouponbyUser, updateredeemCouponbyUser } from '../../redux/slices/historieSlice';
import { getCouponWithId } from '../../redux/slices/couponSlice';

const Redeem = ({ navigation }) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.loginSlice.userData);
  const {
    redeemUserCoupon,
    isLoading,
    page,
    totalpages,
    totalDocs
  } = useSelector((state) => state.historieSlice);
  

  const navigateToDetail = (item) => {
    dispatch(getCouponWithId(item._id))
    navigation.navigate('CouponDetail', { id: item.couponId, page: 'history' });}
  const renderCouponCard = ({ item }) => <CardComponent {...{ item, navigateToDetail }} />;

  const renderEmpty = () => (
    <Text py={hp(4)}
      alignSelf='center' bold fontSize={fp(2)}>
      The list is empty
    </Text>)

  const [loading, setLoading] = useState(false);
  // const docLength = redeemUserCoupon>

  const BottomView = () => {
    return (
      <View>
        {
          (!loading && totalpages > page || page <= totalpages && redeemUserCoupon.length)
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
      if (page <= totalpages) {
        dispatch(updateredeemCouponbyUser({
          userEmail: userData.email,
          page: totalpages >= page ? page + 1 : page,
          limit: 2
        }));
      }
      else return;
    }
    , [page])

  useEffect(() => {
    if (page === 1)
      dispatch(getredeemCouponbyUser({
        userEmail: userData.email,
        page: page,
        limit: 2,
      }));
  }, []);
  return (
    <>
      <DBAppBar
        back={true}
        title="Redeem history"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <VStack alignItems="center" width={wp(100)} marginBottom={wp(17)}>
        <FlatList
          data={redeemUserCoupon}
          extraData={redeemUserCoupon}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderCouponCard}
          contentContainerStyle={{ marginTop: hp(2) }}
          ListEmptyComponent={totalDocs == 0 ? renderEmpty : null}
          onEndReached={handleLoadMore}
          refreshing={loading}
          contentContainerStyle={{ paddingTop: 5 }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={BottomView}
        />
      </VStack>
      {/* )} */}
    </>
  );
};

export default Redeem;
