import React from 'react';
import {Center, Container, ScrollView, Heading, Text} from 'native-base';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import styles from '../../screens/home/styles';

const CustomDrawer = props => {
  console.log(props);
  return (
    <DrawerContentScrollView>
      <Text>Hekkko</Text>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
