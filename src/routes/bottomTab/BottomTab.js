import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Footer from '../../components/footer/Footer';
import {
  Redeem,
  Setting,
  DashBoard,
  Categories,
  EditLocation,
  PasswordChange,
} from '../../screens';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Footer {...props} />}>
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="PasswordChange" component={PasswordChange} />
      <Tab.Screen name="Redeem" component={Redeem} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="DashBoard" component={DashBoard} />
      <Tab.Screen name="EditLocation" component={EditLocation} />
    </Tab.Navigator>
  );
};

export default BottomTab;
