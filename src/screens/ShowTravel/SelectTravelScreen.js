import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Context as TripContext} from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';

const SelectTravelScreen = ({navigation}) => {
  const {state: tripState, getTrips, selectTrip} = useContext(TripContext);

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <SafeAreaView>
    {
      tripState.loading ? (
        <Text style={styles.text}>Wait</Text>
      ) : (
        <>
          <Text style={{...styles.text, ...styles.title}}>Sélectionnez un voyage</Text>
          <SelectTrip
            trips={tripState.tripList}
            onSelection={(item, index) => {
              selectTrip(index);
              navigation.navigate('TravelDetail');
            }}
          />
        </>
      )
    }
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  text: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp(7),
    textAlign: 'center',
    marginBottom: wp(3),
  },
});


export default SelectTravelScreen;
