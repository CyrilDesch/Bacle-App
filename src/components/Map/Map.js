import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Marker, Polyline, Animated} from 'react-native-maps';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {decode} from '../../decode';

const Map = ({style, steps, data, currentMarkerFocus}) => {
  const map = useRef();
  const [polyline, setPolyline] = useState([]);
  useEffect(() => {
    const chemin = async () => {
      if (steps.length > 1) {
        let baseUrl = `https://router.hereapi.com/v8/routes?apiKey=xQMtiBGNDxwdDFit6X0LIF3FlEyWRuXscq1BeTVC24E&origin=${
          steps[0].latitude
        },${steps[0].longitude}&destination=${
          steps[steps.length - 1].latitude
        },${
          steps[steps.length - 1].longitude
        }&transportMode=pedestrian&return=polyline`;
        for (let i = 1; i < steps.length - 1; i++) {
          baseUrl += `&via=${steps[i].latitude},${steps[i].longitude}`;
        }
        console.log(baseUrl);
        axios
          .get(baseUrl)
          .then(response => {
            let array = [];
            response.data.routes[0].sections.forEach(element => {
              array = [...array, ...decode(element.polyline).polyline];
            });
            setPolyline(array);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    chemin();
  }, []);

  useEffect(() => {
    map.current.animateToRegion(
      {
        longitude: steps[currentMarkerFocus].longitude,
        latitude: steps[currentMarkerFocus].latitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      500,
    );
  }, [currentMarkerFocus]);

  return (
    <Animated
      ref={map}
      provider="google"
      customMapStyle={MapStyle}
      initialRegion={{
        ...steps[0],
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
      style={[style]}>
      {/* Markers */}
      {steps.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          title={data[index].display_name.split(',')[0]}
          icon={{uri: 'https://static.thenounproject.com/png/8262-200.png'}}
        />
      ))}
      <Polyline
        coordinates={polyline}
        strokeColor="#f3c600"
        strokeWidth={wp(1.5)}
      />
    </Animated>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    marginBottom: wp(1.5),
    padding: wp(1),
    backgroundColor: '#f3f3f3',
    borderRadius: wp(10),
    alignSelf: 'center',
    borderColor: 'white',
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
    position: 'absolute',
    left: wp(2),
  },
});

Map.defaultProp = {
  style: null,
};

const MapStyle = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#686868',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
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
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: '-22',
      },
      {
        visibility: 'on',
      },
      {
        color: '#b4b4b4',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        saturation: '-51',
      },
      {
        lightness: '11',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        saturation: '3',
      },
      {
        lightness: '-56',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-52',
      },
      {
        color: '#9094a0',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '6.13',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        weight: '1.24',
      },
      {
        saturation: '-100',
      },
      {
        lightness: '-10',
      },
      {
        gamma: '0.94',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#b4b4b4',
      },
      {
        weight: '5.40',
      },
      {
        lightness: '7',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        color: '#231f1f',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        color: '#595151',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        lightness: '-16',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#d7d7d7',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#282626',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: '-41',
      },
      {
        lightness: '-41',
      },
      {
        color: '#2a4592',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '1.10',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: '-16',
      },
      {
        weight: '0.72',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-37',
      },
      {
        color: '#2a4592',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
      {
        color: '#eeed6a',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
      {
        color: '#0a0808',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#b7e4f4',
      },
      {
        visibility: 'on',
      },
    ],
  },
];

export default Map;
