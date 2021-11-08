import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../../screens';

const Stack = createStackNavigator();

const NavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavStack;
