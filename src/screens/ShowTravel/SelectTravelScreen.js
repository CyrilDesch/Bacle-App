import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Context as TripContext} from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';

const SelectTravelScreen = ({navigation}) => {
  const {state: tripState, getTrips, selectTrip} = useContext(TripContext);

  const insets = useSafeAreaInsets();
  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {tripState.loading ? (
        <SafeAreaView>
          <Text>Wait</Text>
        </SafeAreaView>
      ) : (
        <>
          <View style={[styles.header, {paddingTop: insets.top}]}>
            <Text style={styles.title}>Sélectionnez un voyage</Text>
          </View>
          <SelectTrip
            trips={tripState.tripList}
            onSelection={(item, index) => {
              selectTrip(index);
              navigation.navigate('TravelDetail');
            }}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: wp(0.5),
  },
  title: {
    fontSize: wp(7),
    paddingTop: wp(0.5),
    padding: wp(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
  },
});

export default SelectTravelScreen;
