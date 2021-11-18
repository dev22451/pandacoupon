import React from 'react';
import {theme} from 'native-base';
import {useWindowDimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Categories, Register, Notification} from '../../screens';
import NavStack from '../stack/NavStack';
import SignIn from '../../screens/start/signIn/SignIn';
import CustomDrawer from '../../components/customDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

const NavDrawer = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.blue[500]},
        headerShown: false,
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? null : {width: '75%'},
      }}>
      <Drawer.Screen name="Home" component={NavStack} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Settings" component={Register} />
      <Drawer.Screen name="Logout" component={SignIn} />
    </Drawer.Navigator>
  );
};

export default NavDrawer;
