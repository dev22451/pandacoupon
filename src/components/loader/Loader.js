/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {theme} from 'native-base';
import {Bars, Bubbles} from 'react-native-loader';
import {hp, wp} from '../../helpers/respDimension';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1000,
        width: wp(100),
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp(25),
          height: wp(25),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.white,
          borderRadius: wp(2),
          elevation: 5,
        }}>
        <Bars size={wp(4)} color={theme.colors.secondary[500]} />
      </View>
    </View>
  );
};

export default Loader;
