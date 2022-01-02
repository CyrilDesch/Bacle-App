import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Context as TripContext} from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';

const SelectTravelScreen = ({navigation}) => {
  const {state: tripState, getTrips, selectTrip} = useContext(TripContext);

  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, marginBottom: hp(8)}}>
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <Text style={styles.title}>Sélectionnez un voyage</Text>
      </View>
      {tripState.loading ? (
        <SafeAreaView>
          <Text>Wait</Text>
        </SafeAreaView>
      ) : (
        <SelectTrip
          trips={tripState.tripList}
          onSelection={(item, index) => {
            selectTrip(index);
            navigation.navigate('TravelDetail');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: wp(0.5),
  },
  title: {
    fontSize: wp(5.5),
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
    paddingBottom: wp(3),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});

export default SelectTravelScreen;
