import {useEffect, useState, useRef} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export default (shouldTrack, callback) => {
  const watchId = useRef(null);
  useEffect(() => {
    const watchPosition = async () => {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        watchId.current = Geolocation.watchPosition(
          position => {
            callback(position);
          },
          error => {
            console.log(error);
          },
          {
            accuracy: {
              android: 'balanced',
              ios: 'hundredMeters',
            },
            enableHighAccuracy: false,
            distanceFilter: 100,
          },
        );
      }
    };

    if (shouldTrack) {
      watchPosition();
    } else {
      if (watchId) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      watchId.current = null;
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [shouldTrack]);

  return;
};
