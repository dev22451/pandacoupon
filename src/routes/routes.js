import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';

import NavDrawer from './drawer/NavDrawer';
import StarterStack from './stack/StarterStack';
import {hasLocationPermission} from '../helpers/locRequest';

Geocoder.init('AIzaSyAB720ENkbeEfGrROeMMCxNvEUFqeeuxJw');

const RootNavigation = () => {
  const userType = useSelector(state => state.loginSlice.userType);

  useEffect(() => {
    const init = async () => {
      hasLocationPermission();
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <NavigationContainer>
      {!userType ? <StarterStack /> : <NavDrawer />}
    </NavigationContainer>
  );
};

export default RootNavigation;
