import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {
  Home,
  Coupon,
  Redeem,
  Rewards,
  Account,
  Setting,
  DashBoard,
  Notification,
  PasswordChange,
  CouponDetail,
  CouponList,
} from '../../screens';
import BottomTab from '../bottomTab/BottomTab';
import {storeData,getData} from '../../helpers/localStorgae';

const Stack = createStackNavigator();

const NavStack = () => {
  const data = async ()=> {

  let locD = await getData('locationData');
  console.log(locD,"ernderer");
  return (locD)
  }
  data()
  return (
    <Stack.Navigator
      initialRouteName={(data() ===null)?"HomeScreen":"BottomTab"}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
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
        name="PasswordChange"
        component={PasswordChange}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rewards"
        component={Rewards}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Redeem"
        component={Redeem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponDetail"
        component={CouponDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponList"
        component={CouponList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavStack;
