import React from 'react';
import {theme} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';

import NavStack from '../stack/NavStack';
import CustomDrawer from '../../components/customDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

const NavDrawer = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      drawerContent={props => {
        <CustomDrawer {...props} />;
      }}
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.blue[500]},
        headerShown: false,
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? null : {width: '75%'},
      }}>
      <Drawer.Screen name="Main" component={NavStack} />
    </Drawer.Navigator>
  );
};

export default NavDrawer;
