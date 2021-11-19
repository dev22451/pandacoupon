import React, {useEffect} from 'react';
import Geocoder from 'react-native-geocoding';
import {NavigationContainer} from '@react-navigation/native';

import NavDrawer from './drawer/NavDrawer';
import StarterStack from './stack/StarterStack';
import {hasLocationPermission} from '../helpers/locRequest';

Geocoder.init('AIzaSyAB720ENkbeEfGrROeMMCxNvEUFqeeuxJw');

const RootNavigation = () => {
  useEffect(() => {
    hasLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      {/* <StarterStack /> */}
      <NavDrawer />
    </NavigationContainer>
  );
};

export default RootNavigation;
