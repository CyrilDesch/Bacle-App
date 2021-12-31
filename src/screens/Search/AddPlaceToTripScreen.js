import React, { useContext, useEffect, useState } from 'react';
import {
  Text, 
  View, 
  Button,
  StyleSheet,
  Pressable
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Context as TripContext } from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';


// TODO: Possibilité de renseigner le temps estimé à rester pour un lieu. 
// Par exemple avec un écran intermédiaire qui a comme titre le nom du voyage et du lieu
// + sélection du temps + un bouton ajouter le lieu
const AddPlaceToTripScreen = ({route, navigation}) => {
  const {state: tripState, getTrips, addPlaceToTrip} = useContext(TripContext);
  const [processState, setProcessState] = useState(0);      // 0: en cours, 1: succès, 2: échec
  const [selectedTripIndex, setSelectedTripIndex] = useState(-1);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const {place} = route.params;

  useEffect(() => {
    getTrips();
  }, []);


  const selectTrip = () => {
    return (
      <SelectTrip
        trips={tripState.tripList}
        onSelection={(item, index) => {
          setSelectedTripIndex(index);
        }}
        // onSelection={(item, index) => {
        //   addPlaceToTrip(tripState.tripList, index, place).then(status => {
        //     setProcessState(status);
        //   });
      />
    );
  };


  const placeProperties = () => {
    return (
      <View>
        <Pressable onPress={() => { console.log("back"); }}>
          <Text>BACK</Text>
        </Pressable>
        <Text style={styles.title}>Nom du voyage</Text>
        <Text style={styles.subtitle}>Nom du lieu</Text>
        <Text>Temps estimé à passé sur le lieu</Text>
        <Button
          title={selectedHours + ":" + selectedMinutes}
          onPress={() => { setTimePickerVisibility(true); }}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          date={new Date(0, 0, 0, selectedHours, selectedMinutes)}
          onConfirm={(date) => {
            setSelectedHours(date.getHours());
            setSelectedMinutes(date.getMinutes());
            setTimePickerVisibility(false);
          }}
          onCancel={() => { setTimePickerVisibility(false); }}
        />
        <Button
          title="Enregistrer"
          onPress={() => {
            addPlaceToTrip(tripState.tripList, selectedTripIndex, place).then(status => {
              setProcessState(status);
            });
          }}
        />
      </View>
    );
  } 

  const successFeedback = () => {
    return (
      <View>
        <Text style={styles.feedbackText}>
          Le lieu a été ajouté avec succès.
        </Text>
        <Button
          title="Ok"
          onPress={() => {
            setProcessState(0);
            setSelectedTripIndex(-1);
            navigation.navigate('Search');
          }}
        />
      </View>
    );
  };

  const failureFeedback = () => {
    return (
      <View>
        <Text style={styles.feedbackText}>
          Le lieu n'a pas pu être ajouté.
        </Text>
        <Button title="Réessayer" onPress={() => setProcessState(0)} />
        <Button
          title="Annuler"
          onPress={() => {
            setProcessState(0);
            setSelectedTripIndex(-1);
            navigation.navigate('Search');
          }}
        />
      </View>
    );
  };


  return (
    <SafeAreaView>
    {
      // Processus en cours
      (processState === 0) ? (
        // Aucun voyage n'a été sélectionné
        (selectedTripIndex === -1) ? (   
          (tripState.loading) ? (
            <Text>Wait</Text>
          ) 
          : (
            selectTrip()
          )
        ) 
        // Un voyage a été sélectionné 
        : (
          placeProperties()
        )
      )

      // Processus réussi
      : (processState === 1) ? (
        successFeedback()
      ) 

      // Proccessus échoué
      : (
        failureFeedback()
      )
    }
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  title: {
    marginBottom: wp(6),
    fontSize: wp(6),
    fontWeight: '800'
  },
  subtitle: {
    position: 'relative',
    top: wp(-4),
    marginBottom: wp(6),
    fontSize: wp(5),
    fontWeight: '600'
  }, 
  feedbackText: {
    marginBottom: wp(3),
  },
  button: {
    width: wp(10)
  }
});


export default AddPlaceToTripScreen;
