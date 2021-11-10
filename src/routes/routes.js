import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavDrawer from './drawer/NavDrawer';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <NavDrawer />
    </NavigationContainer>
  );
};

export default RootNavigation;
