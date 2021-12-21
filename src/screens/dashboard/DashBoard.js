import {
  Box,
  Text,
  theme,
  HStack,
  VStack,
  FlatList,
  ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ActivityIndicator, StatusBar, TouchableOpacity, View} from 'react-native';

import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/respDimension';
import BannerCard from '../../components/card/bannerCard';
import { updateUserLocation } from '../../redux/slices/loginSlice';
import {CardComponent, CategoryCard, DBAppBar} from '../../components';
import { getCoupon, getBannerImage } from '../../redux/slices/couponSlice';
import { updateCurrentLocation } from '../../redux/slices/locationSlice';
import Geolocation from 'react-native-geolocation-service';
import {getCategoryRequest} from '../../redux/slices/categorySlice';
import { useFocusEffect } from '@react-navigation/core';


const searchIcon = (
  <Box ml={wp(4)}>
    <Icon
      type="MaterialIcons"
      name="search"
      size={20}
      color={theme.colors.gray}
    />
  </Box>
);
const rightArrowIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-right"
    size={20}
    color={theme.colors.white}
  />
);
const rightArrowIcon1 = (
  <Icon
    type="MaterialIcons"
    name="arrow-right"
    size={20}
    color={theme.colors.black}
  />
);

const DashBoard = ({navigation}) => {

  
  const dispatch = useDispatch()
  const { categoryList } = useSelector(state => state.categorySlice);
  const { couponList, bannerImage , isLoading:isCouponLoading } = useSelector(state => state.couponSlice);
  
  const  deviceToken =useSelector(state=>state.loginSlice);
  const {location} =useSelector (state=>state.locationSlice);
  
  // const navigateToDetail = (item) => )
  const navigateToList = (item) => navigation.navigate('CouponList',{item})
  
  const renderBanner = ({item}) => <BannerCard {...{item, bannerImage}} />;
  const renderCategory = ({item}) => <CategoryCard item={item} {...{navigateToList}} />;
  const renderCouponCard = ({item}) => <CardComponent {...{item}}  navigateToDetail={(item)=>{
    navigation.navigate('CouponDetail',{id:item._id})
  }} />;
  const renderEmpty=()=>( <Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>) 

  const geoLocation =async () => {
    try{

      await Geolocation.getCurrentPosition(
        async position => {
          await dispatch(
            updateCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
            );
            await dispatch(updateUserLocation({
              _id:deviceToken.userData.user_id,
              userLat:position.coords.latitude,
              userLon:position.coords.longitude,
              deviceToken:deviceToken.fbDeviceToken,
            }));
            dispatch(getCategoryRequest());
            dispatch(getCoupon());
            dispatch(getBannerImage());
          },
          error => {
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            forceLocationManager: false,
            showLocationDialog: true,
          },
          );
        } catch(e){
          console.log('erro',e)
        }
  };
  
  useEffect(()=>{
     geoLocation();
  },[])

  // useFocusEffect(
  //   React.useCallback(()=>{
  //     const intervalId = setTimeout(()=>{
  //       dispatch(getCategoryRequest());
  //       dispatch(getCoupon());
  //       dispatch(getBannerImage());
  //     },1000)

  //     return () => clearInterval(intervalId)
  //   },[])
  // )


  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary[500]} />
      <DBAppBar
        // loc={true}
        rewards={true}
        navigation={navigation}
        iconColor={theme.colors.white}
        bgColor={theme.colors.secondary[500]}
      />
      <ScrollView nestedScrollEnabled={true}>
        <VStack
          width={wp(100)}
          // bg="secondary.500"
          // borderBottomLeftRadius="200"
          // borderBottomRightRadius="200"
          height={ bannerImage.length ?  wp(50) : wp(0)}
          px={wp(5)}>
          {/* <Input
            w={{
              base: '100%',
              md: '25%',
            }}
            my={hp(2)}
            bg="white"
            placeholderTextColor="black"
            InputLeftElement={searchIcon}
            _focus={{borderColor: 'secondary.500'}}
            placeholder={I18n.t('DashBoard.searchTitle')}
          /> */}
          {/* <HStack justifyContent="space-between" alignItems="center">
            <Text bold fontSize={fp(2)} color="white">
              {I18n.t('DashBoard.explore')}
            </Text>
            <TouchableOpacity onPress={() => null}>
              <HStack alignItems="center">
                <Text fontSize={fp(1.8)} color="white" bold >
                  {I18n.t('DashBoard.seeAll')}
                </Text>
                {rightArrowIcon}
              </HStack>
            </TouchableOpacity>
          </HStack> */}
          {/* <Text fontSize={fp(1.8)} color="white">
            {I18n.t('DashBoard.latestDeal')}
          </Text> */}
        </VStack>
        {bannerImage.length ? 
         <FlatList
         marginTop={3}
         data={bannerImage}
         horizontal={true}
         position="absolute"
         keyExtractor={item => item._id}
         showsHorizontalScrollIndicator={false}
         renderItem={renderBanner}
         />
         : null
        }
        <VStack my={hp(2)}>
          <HStack
            mx={wp(5)}
            mt={hp(3)}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={fp(2)} fontWeight="medium" color="warmGray.600" bold >
              {I18n.t('DashBoard.browseCategory')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <HStack alignItems="center">
                <Text fontSize={fp(2)} color="secondary.500" bold >
                  {I18n.t('DashBoard.seeAll')}
                </Text>
                {rightArrowIcon1}
              </HStack>
            </TouchableOpacity>
          </HStack>
          <FlatList
            pl={wp(2)}
            pr={wp(2)}
            data={categoryList}
            extraData={categoryList}
            horizontal={true}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCategory}
            ListEmptyComponent={<Text py={hp(4)} alignSelf='center' bold fontSize={fp(2)}>The list is empty</Text>}
          />
        </VStack>
        <HStack
          mx={wp(5)}
          my={hp(1)}
          alignItems="center"
          justifyContent="space-between">
          <Text fontSize={fp(2)} fontWeight="medium" color="warmGray.600" bold >
            {I18n.t('DashBoard.featDetails')}
          </Text>
          <TouchableOpacity onPress={navigateToList}>
            <HStack alignItems="center">
              <Text fontSize={fp(2)} color="secondary.500" bold>
                {I18n.t('DashBoard.seeAll')}
              </Text>
              {rightArrowIcon1}
            </HStack>
          </TouchableOpacity>
        </HStack>
        <FlatList
          mx={wp(5)}
          data={couponList.slice(0,2)}
          keyExtractor={item => item?.couponCode}
          renderItem={renderCouponCard}
         // horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
        />
      </ScrollView>
    </>
  );
};

export default DashBoard;
