import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';


const Map = ({ style, steps }) => {
  return (
    <MapView
      provider="google"
      style={[styles.map, style]}
      initialRegion={{...steps[0], latitudeDelta: 0.02, longitudeDelta: 0.02}}
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

const styles = StyleSheet.create({
  map: {

  }
});

Map.defaultProp = {
  style: null
}

export default Map;