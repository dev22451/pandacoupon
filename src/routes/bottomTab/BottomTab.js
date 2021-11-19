import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Account,
  DashBoard,
  Categories,
  EditLocation,
  Notification,
} from '../../screens';
import Footer from '../../components/footer/Footer';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Footer {...props} />}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="EditLocation"
        component={EditLocation}
        options={{
          tabBarLabel: 'Nearby',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Account}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
