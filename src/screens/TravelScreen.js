import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import getBakeries from '../../mocks/getBakeries';


// Contient une petite carte avec des balises reliées entre elles (pour simuler un trajet) 
const TravelScreen = () => {

  // Permet de récupérer uniquement les latitudes et longitudes (sous forme d'objet LatLng) depuis une liste de points géographiques d'OpenStreetMap
  const getLatLng = (pointList) => {
    output = [];
    for (let i = 0; i < pointList.length; i++) {
      if (pointList[i].lat && pointList[i].lon) {
        output.push({
          latitude: Number(pointList[i].lat), 
          longitude: Number(pointList[i].lon) 
        });
      }
    }
    return output;
  }

  const steps = getLatLng(getBakeries());

  return(
    <SafeAreaView style={styles.container}>
      {steps ?
        <Map 
          style={styles.map}
          steps={steps}
        />
      : null}
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
