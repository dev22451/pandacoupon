import {theme} from 'native-base';
import React from 'react';
import {Text} from 'react-native';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {wp} from '../../helpers/respDimension';
import Featured from '../../screens/tabRoutes/Featured';

export default () => {
  return (
    <ScrollableTabView
      initialPage={0}
      tabBarBackgroundColor={theme.colors.secondary[500]}
      tabBarActiveTextColor={theme.colors.white}
      tabBarInactiveTextColor={theme.colors.coolGray[300]}
      tabBarUnderlineStyle={{
        backgroundColor: theme.colors.white,
        borderRadius: wp(2),
      }}
      renderTabBar={() => <ScrollableTabBar />}>
      <Featured tabLabel="Featured" />
      <Text tabLabel="Food">favorite</Text>
      <Text tabLabel="Clothings">project</Text>
      <Text tabLabel="Electronics">favorite</Text>
      <Text tabLabel="Bars & Pub">project</Text>
    </ScrollableTabView>
  );
};
