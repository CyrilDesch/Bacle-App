import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Context as TripContext} from '../../context/TripContext';

const SelectTravelScreen = ({navigation}) => {
  const {state: tripState, getTrips, selectTrip} = useContext(TripContext);

  useEffect(() => {
    getTrips();
  }, []);

  return tripState.loading ? (
    <Text>Wait</Text>
  ) : (
    <FlatList
      contentContainerStyle={{padding: wp(5)}}
      keyExtractor={item => item._id}
      data={tripState.listTrips}
      renderItem={({item, index}) => (
        <View>
          <Pressable
            onPress={() => {
              selectTrip(index);
              navigation.navigate('TravelDetail');
            }}>
            <Text>NOM DU VOYAGE: {item.name}</Text>
          </Pressable>
        </View>
      )}
    />
  );
};

export default SelectTravelScreen;
