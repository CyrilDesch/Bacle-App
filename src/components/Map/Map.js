import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { Marker, Polyline, Animated, AnimatedRegion } from "react-native-maps";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Map = ({ style, steps, data, currentMarkerFocus }) => {
  const animatedRegion = useRef(
    new AnimatedRegion({
      longitude: steps[0].longitude,
      latitude: steps[0].latitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    })
  ).current;

  // BUG POLYLINE VERISON 0.28
  const [lineDashPattern, setLineDashPattern] = useState([0]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLineDashPattern(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    animatedRegion
      .timing({
        longitude: steps[currentMarkerFocus].longitude,
        latitude: steps[currentMarkerFocus].latitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
      .start();
  }, [currentMarkerFocus]);

  return (
    <Animated
      provider="google"
      customMapStyle={MapStyle}
      style={[styles.map, style]}
      region={animatedRegion}
    >
      {/* Markers */}
      {steps.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          title={data[index].display_name.split(",")[0]}
          icon={{ uri: data[index].icon }}
        />
      ))}
      <Polyline
        coordinates={steps}
        strokeColor="blue"
        strokeWidth={2}
        lineDashPattern={lineDashPattern}
      />
    </Animated>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    marginBottom: wp(1.5),
    padding: wp(1),
    backgroundColor: "#f3f3f3",
    borderRadius: wp(10),
    alignSelf: "center",
    borderColor: "white",
    borderWidth: wp(1),
    zIndex: 2,
  },
  markerImage: {
    width: wp(7),
    height: wp(7),
  },
  markerBottom: {
    width: wp(7),
    height: wp(7),
    bottom: 0,
    position: "absolute",
    left: wp(2),
  },
});

Map.defaultProp = {
  style: null,
};

const MapStyle = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#686868",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: "-22",
      },
      {
        visibility: "on",
      },
      {
        color: "#b4b4b4",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        saturation: "-51",
      },
      {
        lightness: "11",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        saturation: "3",
      },
      {
        lightness: "-56",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: "-52",
      },
      {
        color: "#9094a0",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "6.13",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        weight: "1.24",
      },
      {
        saturation: "-100",
      },
      {
        lightness: "-10",
      },
      {
        gamma: "0.94",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b4b4b4",
      },
      {
        weight: "5.40",
      },
      {
        lightness: "7",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#231f1f",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#595151",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        lightness: "-16",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#d7d7d7",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text",
    stylers: [
      {
        color: "#282626",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: "-41",
      },
      {
        lightness: "-41",
      },
      {
        color: "#2a4592",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "1.10",
      },
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: "-16",
      },
      {
        weight: "0.72",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: "-37",
      },
      {
        color: "#2a4592",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#eeed6a",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#0a0808",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#b7e4f4",
      },
      {
        visibility: "on",
      },
    ],
  },
];

export default Map;
