import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import Map, {getMarkerList, getViewWindow} from './Map';

// Abstraction du component Map pour le SearchScreen.
// searchData: Place[]              Une liste de lieux (typiquement un résulat de recherche à représenter sur la carte).
// focusedPlaceIndex: int           L'indice du lieu dans le tableau searchData qui doit être focus (-1 = non défini).
const SearchMap = ({style, searchData, focusedPlaceIndex}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(getMarkerList(searchData));
  }, [searchData]);

  return (
    <Map
      style={style}
      markers={markers}
      polylines={[]}
      viewWindow={getViewWindow(
        focusedPlaceIndex === -1 ? searchData : [searchData[focusedPlaceIndex]],
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchMap;
