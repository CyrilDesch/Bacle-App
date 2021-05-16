import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = ({ style }) => {
  return(
    <MapView
      provider="google"
      style={[styles.map, style]}
    />
  );
}

const styles = StyleSheet.create({});

Map.defaultProp = {
  style: null
}

export default Map;