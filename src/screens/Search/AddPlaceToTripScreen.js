import React, { useContext, useEffect, useState } from 'react';
import {
  Text, 
  View, 
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconIonicons from 'react-native-vector-icons/Ionicons';

import { Context as TripContext } from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';


// TODO: Possibilité de renseigner le temps estimé à rester pour un lieu. 
// Par exemple avec un écran intermédiaire qui a comme titre le nom du voyage et du lieu
// + sélection du temps + un bouton ajouter le lieu
const AddPlaceToTripScreen = ({route, navigation}) => {
  const {state: tripState, getTrips, addPlaceToTrip} = useContext(TripContext);
  const [processState, setProcessState] = useState(0);      // 0: en cours, 1: succès, 2: échec
  const [selectedTripIndex, setSelectedTripIndex] = useState(-1);   // Si l'index est -1, il faut sélectionner un voyage.
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const [notes, setNotes] = useState("");
  const {place} = route.params;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getTrips();
  }, []);


  const selectTrip = () => {
    return (
      <>
        <View style={[styles.header, {paddingTop: insets.top}]}>
          <Text style={{...styles.text, ...styles.title}}>Sélectionnez un voyage</Text>
        </View>
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
    setSelectedTripIndex(-1);
    //setProcessState(0);
  };

  const placeProperties = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>

          <Text style={styles.title}>{tripState.tripList[selectedTripIndex].name}</Text>
          <Text style={styles.subtitle}>{place.name}</Text>

          <Text style={{...styles.text, ...styles.centered}}>Temps estimé à passer sur le lieu</Text>
          <TouchableOpacity
            style={styles.timePressable}
            onPress={() => { setTimePickerVisibility(true); }}>
            <Text style={{...styles.text, ...styles.timeText}}>{selectedHours + ":" + selectedMinutes}</Text>
          </TouchableOpacity>
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

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              addPlaceToTrip(tripState.tripList, selectedTripIndex, place).then(status => {
                setProcessState(status);
              });
            }}>
            <Text style={{...styles.text, ...styles.submitText}}>
              Enregistrer
            </Text>
          </TouchableOpacity>

          {/* Back button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={backButtonAction}>
            <IconIonicons
              name={'arrow-back-outline'}
              size={wp(8)}
              color={"black"}
            />
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  } 

  const successFeedback = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>{tripState.tripList[selectedTripIndex].name}</Text>
        <Text style={styles.subtitle}>{place.name}</Text>

        <View style={styles.feedbackPage}>
          <Text style={{...styles.text, ...styles.feedbackText}}>
            Le lieu a été ajouté avec succès.
          </Text>
          <TouchableOpacity
            style={{...styles.submitButton}}
            onPress={() => {
              setProcessState(0);
              setSelectedTripIndex(-1);
              navigation.navigate('Search');
            }}>
            <Text style={styles.submitText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const failureFeedback = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>{tripState.tripList[selectedTripIndex].name}</Text>
        <Text style={styles.subtitle}>{place.name}</Text>

        <View style={styles.feedbackPage}>
          <Text style={{...styles.text, ...styles.feedbackText}}>
            Le lieu n'a pas pu être ajouté.
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={{...styles.submitButton}}
              onPress={() => setProcessState(0)}>
              <Text style={styles.submitText}>Réessayer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.submitButton}}
              onPress={() => {
                setProcessState(0);
                setSelectedTripIndex(-1);
                navigation.navigate('Search');
              }}>
              <Text style={styles.submitText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };


  return (
    <>
    {
      // Processus en cours
      (processState === 0) ? (
        // Aucun voyage n'a été sélectionné
        (selectedTripIndex === -1) ? (   
          (tripState.loading) ? (
            <SafeAreaView>
              <Text>Wait</Text>
            </SafeAreaView>
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
    </>
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
  subtitle: {
    position: 'relative',    
    textAlign: 'center',
    top: wp(-2),
    marginBottom: wp(6),
    fontSize: wp(5),
    fontWeight: '600'
  }, 
  feedbackPage: {
    height: '80%',
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
    width: wp(40),
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
