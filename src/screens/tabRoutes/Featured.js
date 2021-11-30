import {
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';

import {useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Circle, Marker} from 'react-native-maps';
import {View, Text, theme, Image, VStack, HStack} from 'native-base';

import styles from '../home/styles';
import Icon from '../../assets/icons/Icon';
import {mcDonald} from '../../assets/images';
import MapCard from '../../components/card/MapCard';
import {fp, hp, wp} from '../../helpers/respDimension';

const Featured = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [forceLocation, setForceLocation] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [locationDialog, setLocationDialog] = useState(true);
  const [loc, setLoc] = useState({
    heading: 0,
    accuracy: 0,
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  const location = useSelector(state => state.locationSlice.location);

  const _scrollView = useRef(null);
  let mapAnimation = new Animated.Value(0);
  const CARD_WIDTH = width * 0.8;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  useEffect(() => {
    setLoc({
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      coordinates: loc.coordinates.concat({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }),
    });
  }, []);

  const mapRef = useRef(null);

  const newmark = [
    {
      image: mcDonald,
      title: '50% off on first purchase',
      description: 'Buy any coffee for the first time and receive flat 50% ',
      validTill: '21 Feb 2022',
    },
    {
      image: mcDonald,
      title: '50% off on first purchase',
      description: 'Buy any coffee for the first time and receive flat 50% ',
      validTill: '21 Feb 2022',
    },
    {
      image: mcDonald,
      title: '50% off on first purchase',
      description: 'Buy any coffee for the first time and receive flat 50% ',
      validTill: '21 Feb 2022',
    },
    {
      image: mcDonald,
      title: '50% off on first purchase',
      description: 'Buy any coffee for the first time and receive flat 50% ',
      validTill: '21 Feb 2022',
    },
    {
      image: mcDonald,
      title: '50% off on first purchase',
      description: 'Buy any coffee for the first time and receive flat 50% ',
      validTill: '21 Feb 2022',
    },
  ];

  const _onViewableItemsChanged = React.useCallback(
    ({viewableItems, changed}) => {
      console.log('Visible items are', viewableItems);
      console.log('Changed in this iteration', changed);
    },
    [],
  );

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 90,
  };

  return (
    <>
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          initialCamera={{
            altitude: 15000,
            center: {
              latitude: 23.7603,
              longitude: 90.4125,
            },
            heading: 0,
            pitch: 0,
            zoom: 11,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled
          loadingBackgroundColor="white"
          loadingIndicatorColor="#ec4899"
          rotateEnabled={true}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          {!!loc && (
            <>
              <Marker
                anchor={{x: 0.5, y: 0.6}}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                flat
                style={{
                  ...(loc.heading !== -1 && {
                    transform: [
                      {
                        rotate: `${loc.heading}deg`,
                      },
                    ],
                  }),
                }}>
                <View style={styles.dotContainer}>
                  <View style={[styles.arrow]} />
                  <View style={styles.dot} />
                </View>
              </Marker>
              <Circle
                center={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                radius={loc.accuracy}
                strokeColor="#ec489950"
                fillColor="#ec489950"
              />
            </>
          )}
        </MapView>
        {!isKeyboardVisible && (
          <View
            style={{
              position: 'absolute',
              bottom: hp(3),
              backgroundColor: theme.colors.secondary,
              borderRadius: wp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.ScrollView
              ref={_scrollView}
              horizontal
              pagingEnabled
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"
              contentInset={{
                top: 0,
                left: SPACING_FOR_CARD_INSET,
                bottom: 0,
                right: SPACING_FOR_CARD_INSET,
              }}
              contentContainerStyle={{
                paddingHorizontal:
                  Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}>
              <FlatList
                data={newmark}
                horizontal={true}
                onEndReachedThreshold={0.5}
                keyExtractor={item => item.id}
                viewabilityConfig={_viewabilityConfig}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={_onViewableItemsChanged}
                renderItem={({item}) => (
                  <MapCard CARD_WIDTH={CARD_WIDTH} item={item} />
                )}
              />
            </Animated.ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default Featured;
