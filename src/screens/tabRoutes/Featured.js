import React, {useRef, useState} from 'react';
import MapView, {Circle, Marker} from 'react-native-maps';
import {View, Text, theme, Image, VStack, HStack} from 'native-base';
import {Animated, Dimensions, StyleSheet, Platform} from 'react-native';

import styles from '../home/styles';
import Icon from '../../assets/icons/Icon';
import {mcDonald} from '../../assets/images';
import {fp, hp, wp} from '../../helpers/respDimension';

const calendarIcon = (
  <Icon
    type="EvilIcons"
    name={'calendar'}
    size={wp(7)}
    color={theme.colors.gray[400]}
  />
);

const Featured = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [forceLocation, setForceLocation] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [locationDialog, setLocationDialog] = useState(true);

  const _scrollView = useRef(null);
  let mapAnimation = new Animated.Value(0);
  const CARD_WIDTH = width * 0.8;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  const [loc, setLoc] = useState({
    heading: 0,
    accuracy: 0,
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

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
              {newmark.map((marker, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: theme.colors.white,
                    padding: wp(2),
                    elevation: 0.5,
                    width: CARD_WIDTH,
                    marginHorizontal: 10,
                    borderRadius: wp(2),
                  }}
                  key={index}>
                  <Image
                    alt="image"
                    width={wp(22)}
                    height={wp(22)}
                    borderRadius="lg"
                    source={require('../../assets/images/mcDonald.jpg')}
                  />
                  <VStack ml={wp(4)} overflow="hidden">
                    <Text fontSize={fp(2)} fontWeight="semibold">
                      {marker.title}
                    </Text>
                    <Text
                      color="coolGray.500"
                      fontSize={fp(1.8)}
                      lineHeight="18"
                      width={wp(50)}>
                      {marker.description}
                    </Text>
                    <HStack mt={wp(1)} alignItems="center">
                      {calendarIcon}
                      <Text fontWeight="medium" color="coolGray.400">
                        Valid Till : {marker.validTill}
                      </Text>
                    </HStack>
                  </VStack>
                </View>
              ))}
            </Animated.ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default Featured;
