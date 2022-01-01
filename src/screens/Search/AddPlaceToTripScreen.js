import React, { useContext, useEffect, useState } from 'react';
import {
  Text, 
  View, 
  Button,
  StyleSheet,
  Pressable,
  TextInput
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconIonicons from 'react-native-vector-icons/Ionicons';

import { Context as TripContext } from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';
import CustomPressable from '../../components/CustomPressable';


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
  const [notes, setNotes] = useState("");
  const {place} = route.params;

  useEffect(() => {
    getTrips();
  }, []);


  const selectTrip = () => {
    return (
      <>
        <Text style={{...styles.text, ...styles.title}}>Sélectionnez un voyage</Text>
        <SelectTrip
          trips={tripState.tripList}
          onSelection={(item, index) => {
            setSelectedTripIndex(index);
          }}
        />
      </>
    );
  };

  const backButtonAction = () => {
    console.log("back");
  };

  const placeProperties = () => {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>{tripState.tripList[selectedTripIndex].name}</Text>
        <Text style={styles.subtitle}>{place.name}</Text>

        <Text style={{...styles.text, ...styles.centered}}>Temps estimé à passer sur le lieu</Text>
        <Pressable
          style={styles.timePressable}
          onPress={() => { setTimePickerVisibility(true); }}>
          <Text style={{...styles.text, ...styles.timeText}}>{selectedHours + ":" + selectedMinutes}</Text>
        </Pressable>
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

        <Text style={{...styles.text, ...styles.centered}}>Notes</Text>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => { setNotes(text); }}
          value={notes}/>

        <Pressable
          style={styles.submitButton}
          onPress={() => {
            addPlaceToTrip(tripState.tripList, selectedTripIndex, place).then(status => {
              setProcessState(status);
            });
          }}>
          <Text style={{...styles.text, ...styles.submitText}}>
            Enregistrer
          </Text>
        </Pressable>

        {/* Back button */}
        <Pressable 
          style={styles.backButton}
          onPress={backButtonAction}>
          <IconIonicons
            name={'arrow-back-outline'}
            size={wp(8)}
            color={"black"}
          />
        </Pressable>

      </View>
    );
  } 

  const successFeedback = () => {
    return (
      <View style={styles.feedbackPage}>
        <Text style={{...styles.text, ...styles.feedbackText}}>
          Le lieu a été ajouté avec succès.
        </Text>
        <CustomPressable
          style={{...styles.submitButton}}
          onPress={() => {
            setProcessState(0);
            setSelectedTripIndex(-1);
            navigation.navigate('Search');
          }}>
          <Text style={styles.submitText}>Ok</Text>
        </CustomPressable>
      </View>
    );
  };

  const failureFeedback = () => {
    return (
      <View style={styles.feedbackPage}>
        <Text style={{...styles.text, ...styles.feedbackText}}>
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
  flex1: {
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4),
  },
  centered: {
    textAlign: 'center',
  },
  title: {
    marginBottom: wp(3),
    fontSize: wp(7),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    position: 'relative',    
    textAlign: 'center',
    top: wp(-2),
    marginBottom: wp(6),
    fontSize: wp(5),
    fontWeight: '600'
  }, 
  feedbackPage: {
    height: '100%',
    justifyContent: 'center',
  },
  feedbackText: {
    marginBottom: wp(3),
    textAlign: 'center',
  },
  backButton: {
    width: wp(10),
    height: wp(10),
    position: 'absolute',
    left: wp(2),
  },
  timePressable: {
    marginTop: wp(2),
    marginBottom: wp(6),
    width: wp(25),
    backgroundColor: '#fff',
    padding: wp(1),
    borderRadius: wp(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  timeText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    textAlign: 'center',
  },
  textArea: {
    backgroundColor: '#fff',
    marginTop: wp(2),
    marginHorizontal: wp(5),
    marginBottom: wp(4),
    borderRadius: wp(2),
  },
  submitButton: {
    marginTop: wp(5),
    width: wp(45),
    backgroundColor: '#fff',
    padding: wp(2),
    borderRadius: wp(3),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  submitText: {
    textAlign: 'center',
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  buttons: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',  }
});


export default AddPlaceToTripScreen;
