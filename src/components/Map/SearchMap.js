import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import Map, { getMarkerList, getViewWindow } from './Map';


// Abstraction du component Map pour le SearchScreen.
// searchData: Place[]              Une liste de lieux (typiquement un résulat de recherche à représenter sur la carte).
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
      viewWindow={getViewWindow(searchData)}
    />
  );

}


const styles = StyleSheet.create({

});


export default SearchMap;
