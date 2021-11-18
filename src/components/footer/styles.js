import {theme} from 'native-base';
import {StyleSheet} from 'react-native';

import {hp} from '../../helpers/respDimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: hp(7),
    backgroundColor: theme.colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
