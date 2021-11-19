import React from 'react';
import {Text, theme, View} from 'native-base';

import styles from './styles';
import Icon from '../../assets/icons/Icon';
import {TouchableOpacity} from 'react-native';
import {fp, hp, wp} from '../../helpers/respDimension';

const Footer = ({state, descriptors, navigation}) => {
  const [selected, setSelected] = React.useState(1);

  const bellIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 3 ? 'bell' : 'bell-outline'}
      size={wp(5)}
      color={theme.colors.white}
    />
  );

  const homeIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 3 ? 'home' : 'home-outline'}
      size={wp(5)}
      color={theme.colors.white}
    />
  );

  const locIcon = (
    <Icon
      type="Ionicons"
      name={selected === 1 ? 'location-sharp' : 'location-outline'}
      size={wp(5)}
      color={theme.colors.white}
    />
  );

  const categoryIcon = (
    <Icon
      type="MaterialIcons"
      name={'category'}
      size={wp(5)}
      color={theme.colors.white}
    />
  );

  const accountIcon = (
    <Icon
      type="MaterialCommunityIcons"
      name={selected === 4 ? 'account' : 'account-outline'}
      size={wp(5)}
      color={theme.colors.white}
    />
  );

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const tabBarIcon =
          options.tabBarLabel === 'Home'
            ? homeIcon
            : options.tabBarLabel === 'Nearby'
            ? locIcon
            : options.tabBarLabel === 'Profile'
            ? accountIcon
            : options.tabBarLabel === 'Categories'
            ? categoryIcon
            : options.tabBarLabel === 'Notification'
            ? bellIcon
            : null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={0.7}
            onLongPress={onLongPress}
            style={styles.container}>
            <View>{tabBarIcon}</View>
            <Text
              fontSize={fp(1.5)}
              style={{color: isFocused ? '#fff' : '#ffffff80'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;
