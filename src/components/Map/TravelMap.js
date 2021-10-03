import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import Map, { getLatLngList, getMarkerList } from './Map';


// Abstraction du component Map pour le SearchScreen.
const TravelMap = ({style, travelData, focusedPlaceIndex}) => {
  const [focusPosition, setFocusPosition] = useState({ 
    latitude: 48.858260200000004, 
    longitude: 2.2944990543196795 
  });

  // On creation
  useEffect(() => {
    const chemin = async () => {
      if (steps != null && steps.length > 1) {
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
    console.log("Update chemin");
  }, []);

  // On update of position 
  useEffect(() => {
      if (travelData != null && travelData.length != 0 && focusedPlaceIndex != null) {
        setFocusPosition(getLatLngList(travelData[focusedPlaceIndex])[0]);
      }
    },
    [focusedPlaceIndex]
  );


  // Render
  return (
    <Map
      style={style}
      markers={getMarkerList(travelData)}
      polylines={[]}
      position={focusPosition}
    />
  );

}


const styles = StyleSheet.create({

});


export default TravelMap;
