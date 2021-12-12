import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Context as TripContext } from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';


const AddPlaceToTripScreen = ({ route, navigation }) => {
  const { state: tripState, getTrips, addPlaceToTrip } = useContext(TripContext);
  const [processState, setProcessState] = useState(0);    // 0: en cours, 1: succès, 2: échec
  const { place } = route.params;

  useEffect(() => {
    getTrips();
  }, []);

  return ((tripState.loading) 
    ? (
      <Text>Wait</Text>
    ) 
    : (
      (processState === 0)
      ? (
        <SelectTrip
          trips = {tripState.tripList}
          onSelection = {(item, index) => {

            addPlaceToTrip(tripState.tripList, index, place)
              .then((status) => {
                setProcessState(status);
              });
          }}
        />
      )
      : (
        (processState === 1)
        ? (
          <View>
            <Text>Le lieu a été ajouté avec succès.</Text>
            <Button 
              title="Ok" 
              onPress={() => {
                setProcessState(0);
                navigation.navigate('Search');
              }}/>
          </View>
        )
        : (
          <View>
            <Text>Le lieu n'a pas pu être ajouté.</Text>
            <Button 
              title="Réessayer"
              onPress={() => setProcessState(0)}/>
            <Button 
              title="Annuler"
              onPress={() => {
                setProcessState(0);
                navigation.navigate('Search');
              }}/>
          </View>
        )
      )
    )
  );
};


export default AddPlaceToTripScreen;
