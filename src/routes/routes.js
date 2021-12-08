import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import NavDrawer from './drawer/NavDrawer';
import StarterStack from './stack/StarterStack';
import {hasLocationPermission} from '../helpers/locRequest';
import { getData } from '../helpers/localStorgae';
import { restoreUser } from '../redux/slices/loginSlice'
import {getCategoryRequest} from '../redux/slices/categorySlice';
import {getCoupon} from '../redux/slices/couponSlice';

Geocoder.init('AIzaSyAB720ENkbeEfGrROeMMCxNvEUFqeeuxJw');

const RootNavigation = () => {
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector(state => state.loginSlice.isLoggedIn);
  
  const checkLogin = async () => {
    const userData = await getData('userData');
    if(userData){
      dispatch(restoreUser({
        token:userData.accessToken,
        userData
      }));
      dispatch(getCategoryRequest());
    }
  }

  useEffect(() => {
    const init = async () => {
      hasLocationPermission();
    };
    init().finally(async () => {
      await checkLogin();
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? <StarterStack /> : <NavDrawer />}
    </NavigationContainer>
  );
};

export default RootNavigation;
