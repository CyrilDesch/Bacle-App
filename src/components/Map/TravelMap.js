import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import Map, { getLatLngList, getMarkerList } from './Map';

import { decode } from '../../decode';


// Abstraction du component Map pour le SearchScreen.
// travelData: Place[]              Une liste de lieux (typiquement un trajet à représenter sur la carte).
// focusedPlaceIndex: int           L'indice du lieu dans le tableau travelData qui doit être focus (-1 = non défini).
const TravelMap = ({style, travelData, focusedPlaceIndex}) => {
  const [focusPosition, setFocusPosition] = useState({ 
    latitude: 48.858260200000004, 
    longitude: 2.2944990543196795 
  });
  const [path, setPath] = useState([]);


  // On creation
  useEffect(() => {
    // Pathfinding
    const chemin = async () => {
      if (travelData !== null && travelData.length > 1) {
        let baseUrl = `https://router.hereapi.com/v8/routes?apiKey=xQMtiBGNDxwdDFit6X0LIF3FlEyWRuXscq1BeTVC24E&origin=${
          travelData[0].lat
        },${travelData[0].lon}&destination=${
          travelData[travelData.length - 1].lat
        },${
          travelData[travelData.length - 1].lon
        }&transportMode=pedestrian&return=polyline`;
        for (let i = 1; i < travelData.length - 1; i++) {
          baseUrl += `&via=${travelData[i].lat},${travelData[i].lon}`;
        }
        axios
          .get(baseUrl)
          .then(response => {
            let array = [];
            response.data.routes[0].sections.forEach(element => {
              array = [...array, ...decode(element.polyline).polyline];
            });
            setPath(array);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    chemin();
  }, []);

  // On update of position 
  useEffect(() => {
      if (travelData !== null && travelData.length !== 0 && focusedPlaceIndex !== -1) {
        const positions = getLatLngList([travelData[focusedPlaceIndex]]);
        setFocusPosition(positions[0]);
      }
    },
    [focusedPlaceIndex]
  );


  // Render
  return (
    <Map
      style={style}
      markers={getMarkerList(travelData)}
      polylines={path}
      viewWindow={{
        ...focusPosition, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }}
    />
  );

}


const styles = StyleSheet.create({

});


export default TravelMap;
