import {StyleSheet, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Circle, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import styles from './styles';
import Content from './Content';
import I18n from '../../translations/i18n';
import {DBAppBar, ModalContent} from '../../components';

Geocoder.init('AIzaSyAB720ENkbeEfGrROeMMCxNvEUFqeeuxJw');

const Home = ({navigation}) => {
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

  const mapRef = useRef(null);

  useEffect(() => {
    if (!!loc && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: loc.latitude,
          longitude: loc.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [loc]);

  Geocoder.from(loc.latitude, loc.longitude)
    .then(json => {
      var addressComponent = json.results[0].address_components[0];
      console.log(addressComponent);
    })
    .catch(error => console.warn(error));

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLoc({
          heading: position.coords.heading,
          accuracy: position.coords.accuracy,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: loc.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        // Alert.alert(error.message.toString());
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  useEffect(() => {
    geoLocation();
  }, []);

  return (
    <>
      <DBAppBar
        navigation={navigation}
        account={true}
        title={`${I18n.t('Dash.welcome')}, Umer`}
      />
      <ModalContent show={true} content={<Content />} />
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
      </View>
    </>
  );
};

export default Home;
