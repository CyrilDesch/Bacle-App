import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import {Marker, Polyline, Animated} from 'react-native-maps';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';


// Permet de récupérer uniquement les latitudes et longitudes (sous forme d'objet LatLng) depuis une liste de points géographiques d'OpenStreetMap
const getLatLngList = (placeList) => {
  const output = [];
  for (let i = 0; i < placeList.length; i++) {
    if (placeList[i].lat && placeList[i].lon) {
      output.push({
        latitude: Number(placeList[i].lat),
        longitude: Number(placeList[i].lon),
      });
    }
  }
  return output;
};

const getMarkerList = (placeList) => {
  const output = [];
  for (let i = 0; i < placeList.length; i++) {
    if (placeList[i].lat && placeList[i].lon) {
      output.push({
        latitude: Number(placeList[i].lat),
        longitude: Number(placeList[i].lon),
        title: String(
            (placeList[i].display_name != null && placeList[i].display_name.length > 0) 
            ? placeList[i].display_name.split(',')[0]
            : ""
          )
      });
    }
  }
  return output;
};


// markers: { LatLng, title }[]       Une liste de positions où afficher des marqueurs avec leur nom.
// polylines: { LatLng }[][]          Une liste de listes positions représentant des séries de points reliés entre eux (typiquement des chemins à suivre). 
// position: LatLng                   Une position vers laquelle la carte doit focus.
const Map = ({style, markers, polylines, position}) => {
  const map = useRef();
  const [initialRegion, setInitialRegion] = useState(
    (position != null) 
      ? {
        ...position,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }
      : {
        latitude: 48.858260200000004,   // Par défaut : Tour Eiffel
        longitude: 2.2944990543196795,  // TODO: Mettre par défaut la géolocalisation de l'appareil.
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    }
  );

  // ERROR: "Location Permission not granted."
  // Je voulais mettre "initialRegion" à la géolocalisation de l'appareil si il n'y a pas d'étape dans "steps".
  const getPosition = () => {
    console.log("Querying position");
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("Position: ", position);
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      }
    );
    return null;
  }

  // On update of position
  useEffect(() => {
    if (position != null) {
      let region = {
        ...position,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
      // Si la position vers laquelle focus est la même, pas besoin de faire de transition.
      if (
        region.latitude != initialRegion.latitude 
        || region.longitude != initialRegion.longitude
        || region.latitudeDelta != initialRegion.latitudeDelta 
        || region.longitudeDelta != initialRegion.longitudeDelta
      ) {
        map.current.animateToRegion(
          region,
          500,
        );
        setInitialRegion(region);
      }
    }
  }, [position]);


  return (
    <Animated
      ref={map}
      provider="google"
      customMapStyle={MapStyle}
      initialRegion={initialRegion}
      style={[style]}>

      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude, 
            longitude: marker.longitude
          }}
          title={marker.title}
          icon={{uri: 'https://static.thenounproject.com/png/8262-200.png'}}
        />
      ))}
      <Polyline
        coordinates={polylines}
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


export { getLatLngList, getMarkerList };
export default Map;
