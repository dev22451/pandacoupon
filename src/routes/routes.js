import React, {useEffect} from 'react';
import Geocoder from 'react-native-geocoding';
import firebase from '@react-native-firebase/app';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import NavDrawer from './drawer/NavDrawer';
import StarterStack from './stack/StarterStack';
import {getData} from '../helpers/localStorgae';
import {restoreUser, updateDeviceToken} from '../redux/slices/loginSlice';
import {getDeviceToken, requestUserPermission} from '../helpers/firebase';
import {hasLocationPermission} from '../helpers/locRequest';
import {getCategoryRequest} from '../redux/slices/categorySlice';

firebase.initializeApp({});
Geocoder.init('AIzaSyAB720ENkbeEfGrROeMMCxNvEUFqeeuxJw');

const RootNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.loginSlice.isLoggedIn);

  const checkLogin = async () => {
    const userData = await getData('userData');
    if (userData) {
      dispatch(
        restoreUser({
          token: userData.accessToken,
          userData,
        }),
      );
      dispatch(getCategoryRequest());
    }
  };

  useEffect(() => {
    const init = async () => {
      hasLocationPermission();
    };
    init().finally(async () => {
      await requestUserPermission();
      dispatch(updateDeviceToken(await getDeviceToken()));
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
