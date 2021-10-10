import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import Map, {getLatLngList, getMarkerList} from './Map';

// Abstraction du component Map pour le SearchScreen.
// searchData: Place[]              Une liste de lieux (typiquement un résulat de recherche à représenter sur la carte).
const SearchMap = ({style, searchData}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(getMarkerList(searchData));
  }, [searchData]);

  return (
    <Map
      style={style}
      markers={markers}
      polylines={[]}
      position={markers.length > 0 ? markers[0] : null}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchMap;
