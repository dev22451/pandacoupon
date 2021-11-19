import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {
  Coupon,
  DashBoard,
  Home,
  Rewards,
  Account,
  Setting,
} from '../../screens';
import BottomTab from '../bottomTab/BottomTab';

const Stack = createStackNavigator();

const NavStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashBoard"
        component={DashBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rewards"
        component={Rewards}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavStack;
