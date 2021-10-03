import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import Map, { getLatLngList, getMarkerList } from './Map';


// Abstraction du component Map pour le SearchScreen.
const SearchMap = ({style, searchData}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
      setMarkers(getMarkerList(searchData))
    }, 
    [searchData]
  );

  return (
    <Map
      style={style}
      markers={markers}
      polylines={[]}
      position={
        (markers.length > 0) 
        ? markers[0] 
        : { latitude: 48.858260200000004, longitude: 2.2944990543196795 }
      }
    />
  );

}


const styles = StyleSheet.create({

});


export default SearchMap;
