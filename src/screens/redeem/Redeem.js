import React,{useEffect,useState,useCallback} from 'react';
import {FlatList, VStack, Text} from 'native-base';
import {View, ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import {hp, wp, fp} from '../../helpers/respDimension';
import {CardComponent, DBAppBar, Loader} from '../../components';
import {getredeemCouponbyUser,updateredeemCouponbyUser} from '../../redux/slices/historieSlice'

const Redeem = ({navigation}) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.loginSlice.userData);
  const {redeemUserCoupon, isLoading, page,totalpages}=useSelector((state)=>state.historieSlice);
  //console.log(page,'redeem');
  
  const navigateToDetail = (item) => navigation.navigate('CouponDetail',{id:item.couponId, page:'history'});
  const renderCouponCard = ({item}) => <CardComponent {...{item,navigateToDetail}} />;

  const renderEmpty=()=>( <Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>) 
  
  const [loading,setLoading]=useState(false);

  const BottomView = () => {
    return (
      <View>
        {
          (!loading&& page<totalpages)
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
      //  if(page < totalpages){
        //dispatch(updateredeemCouponbyUser(pagepage<=totalpages?page+1:page))
        dispatch(updateredeemCouponbyUser({userEmail:userData.email,page:page+1,limit:2}))
    //    }
    //    else return;
    // }
    }
    ,[page])



  useEffect(()=>{
      dispatch(getredeemCouponbyUser({
        userEmail:userData.email,
        page:page,
        limit:2,
      }));
  },[]);
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
          contentContainerStyle={{marginTop: hp(2)}}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleLoadMore}
          refreshing={loading}
          onEndReachedThreshold={0.9}
          ListFooterComponent={BottomView}
        />
      </VStack>
      {/* )} */}
    </>
  );
};

export default Redeem;
