import axios from 'axios';

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Map, {getLatLngList, getMarkerList} from './Map';

import {decode} from '../../decode';

// Abstraction du component Map pour le SearchScreen.
// travelData: Place[]              Une liste de lieux (typiquement un trajet à représenter sur la carte).
// focusedPlaceIndex: int           L'indice du lieu dans le tableau travelData qui doit être focus (-1 = non défini).
const TravelMap = ({style, travelData, focusedPlaceIndex}) => {
  const [focusPosition, setFocusPosition] = useState({
    latitude: 48.858260200000004,
    longitude: 2.2944990543196795,
  });
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  const updatePos = () => {
    if (
      travelData !== null &&
      travelData.length !== 0 &&
      focusedPlaceIndex !== -1
    ) {
      if (travelData[focusedPlaceIndex].localization.lat) {
        // LIST PROVENANT D'OPENSTREETMAP
        const positions = getLatLngList([
          travelData[focusedPlaceIndex].localization,
        ]);
        setFocusPosition(positions[0]);
      } else {
        // LIST PROVENANT DE L'API BACLE
        const positions = getLatLngList([
          travelData[focusedPlaceIndex].localization,
        ]);
        setFocusPosition(positions[0]);
      }
    }
  };
  // On creation
  useEffect(() => {
    setPath([]);
    setLoading(true);
    // Pathfinding
    const chemin = async () => {
      if (travelData !== null && travelData.length > 1) {
        let baseUrl = `https://router.hereapi.com/v8/routes?apiKey=xQMtiBGNDxwdDFit6X0LIF3FlEyWRuXscq1BeTVC24E&origin=${
          travelData[0].localization.lat
        },${travelData[0].localization.lon}&destination=${
          travelData[travelData.length - 1].localization.lat
        },${
          travelData[travelData.length - 1].localization.lon
        }&transportMode=pedestrian&return=polyline`;
        for (let i = 1; i < travelData.length - 1; i++) {
          baseUrl += `&via=${travelData[i].localization.lat},${travelData[i].localization.lon}`;
        }
        await axios
          .get(baseUrl)
          .then(response => {
            let array = [];
            response.data.routes[0].sections.forEach(element => {
              array = [...array, ...decode(element.polyline).polyline];
            });
            setPath(array);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    chemin();
    updatePos();
  }, [travelData]);

  // On update of position
  useEffect(() => {
    updatePos();
  }, [focusedPlaceIndex]);

  // Render
  return (
    <>
      <Map
        style={style}
        markers={getMarkerList(travelData)}
        polylines={path}
        viewWindow={{
          ...focusPosition,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: wp(7),
          right: wp(4),
          alignSelf: 'flex-end',
        }}>
        <ActivityIndicator size="large" animating={loading} color="#0000008e" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default TravelMap;
