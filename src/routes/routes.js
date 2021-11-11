import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import NavDrawer from './drawer/NavDrawer';
import StarterStack from './stack/StarterStack';
import {
  hasLocationPermission,
  requestLocationPermission,
} from '../helpers/locRequest';

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
