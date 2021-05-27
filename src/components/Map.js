import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps';


const Map = ({ style, stepsProps }) => {
  const [steps, setSteps] = useState(stepsProps); 
  return (
    <MapView
      provider="google"
      style={[styles.map, style]}
    >
      {/* Markers */}
      {steps.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          title={"Bakery " + (index + 1)}
        />
      ))}
      {/* Linking lines */}
      <Polyline
        coordinates={steps}
        strokeColor="#D46"
        strokeWidth={6}
      />   
    </MapView>
  );
}

const styles = StyleSheet.create({});

Map.defaultProp = {
  style: null
}

export default Map;