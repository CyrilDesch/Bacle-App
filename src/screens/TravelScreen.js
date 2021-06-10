import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import { Button } from 'react-native';


// Contient une petite carte avec des balises reliées entre elles (pour simuler un trajet) 
const TravelScreen = () => {

  const [currentMarkerFocus, setCurrentMarkerFocus] = useState(0);
  const circuit = require('../../customData.json').circuit;
  

  // Permet de récupérer uniquement les latitudes et longitudes (sous forme d'objet LatLng) depuis une liste de points géographiques d'OpenStreetMap
  const getLatLng = (placeList) => {
    output = [];
    for (let i = 0; i < placeList.length; i++) {
      if (placeList[i].lat && placeList[i].lon) {
        output.push({
          latitude: Number(placeList[i].lat), 
          longitude: Number(placeList[i].lon) 
        });
      }
    }
    return output;
  }

  const steps = getLatLng(circuit);

  return(
    <SafeAreaView style={styles.container}>
      {steps ?
        <Map 
          style={styles.map}
          steps={steps}
          data={circuit}
          currentMarkerFocus={currentMarkerFocus}
        />
      : null}
      {currentMarkerFocus > 0 ? <Button title="<" onPress={() => setCurrentMarkerFocus(currentMarkerFocus - 1)} /> : null}
      <Text>{circuit[currentMarkerFocus].display_name.split(",")[0]}</Text>
      {currentMarkerFocus < circuit.length-1 ? <Button title=">" onPress={() => setCurrentMarkerFocus(currentMarkerFocus + 1)} /> : null}
      <Text>Date: {15 + currentMarkerFocus} juillet 2021</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold'
  },
  map: {
    width: wp(100), 
    height: wp(80),
  }
});


export default TravelScreen;
