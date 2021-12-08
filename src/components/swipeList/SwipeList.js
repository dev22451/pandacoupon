import React from 'react';
import {theme} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Featured, Notification} from '../../screens';
import {wp} from '../../helpers/respDimension';

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarBounces: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarIndicatorContainerStyle: {
          zIndex: 100,
        },
        tabBarContentContainerStyle: {
          backgroundColor: theme.colors.secondary[500],
        },
        tabBarItemStyle: {width: wp(28)},
        tabBarPressColor: theme.colors.white,
        tabBarActiveTintColor: theme.colors.white,
      }}>
      <Tab.Screen name="Featured" component={Featured} />
      <Tab.Screen name="Food" component={Notification} />
      <Tab.Screen name="Saloon" component={Notification} />
      <Tab.Screen name="Clothing" component={Notification} />
      <Tab.Screen name="Bars" component={Notification} />
      <Tab.Screen name="Hotel" component={Notification} />
    </Tab.Navigator>
  );
};
