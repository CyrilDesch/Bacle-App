import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Context as TripContext} from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';

const SelectTravelScreen = ({navigation}) => {
  const {state: tripState, getTrips, selectTrip} = useContext(TripContext);

  useEffect(() => {
    getTrips();
  }, []);

  return tripState.loading ? (
    <Text>Wait</Text>
  ) : (
    <SelectTrip
      trips={tripState.tripList}
      onSelection={(item, index) => {
        selectTrip(index);
        navigation.navigate('TravelDetail');
      }}
    />
  );
};

export default SelectTravelScreen;
