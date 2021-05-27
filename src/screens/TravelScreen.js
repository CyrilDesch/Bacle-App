import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import getBakeries from '../../mocks/getBakeries';


// Permet de récupérer uniquement les latitudes et longitudes (sous forme d'objet LatLng) depuis une liste de points géographiques d'OpenStreetMap
function getLatLng(pointList) {
  output = [];
  for (let i = 0; i < pointList.length; i++) {
    // console.log(pointList[i]);
    if (pointList[i].lat && pointList[i].lon) {
      output.push({
        latitude: Number(pointList[i].lat), 
        longitude: Number(pointList[i].lon) 
      });
    }
  }
  console.log("OUTPUT:", output);
  return output;
}


// Contient une petite carte avec des balises reliées entre elles (pour simuler un trajet) 
const TravelScreen = () => {
  return(
    <SafeAreaView style={styles.container}>
      <Map 
        style={styles.map}
        stepsProps={getLatLng(getBakeries())}
      />
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
    marginTop: 50,
    width: wp(100), 
    height: wp(100),
  }
});


export default TravelScreen;
