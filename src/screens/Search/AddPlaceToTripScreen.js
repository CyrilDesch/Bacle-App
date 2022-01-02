import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import {Context as TripContext} from '../../context/TripContext';
import SelectTrip from '../../components/Trip/SelectTrip';

// TODO: Possibilité de renseigner le temps estimé à rester pour un lieu.
// Par exemple avec un écran intermédiaire qui a comme titre le nom du voyage et du lieu
// + sélection du temps + un bouton ajouter le lieu
const AddPlaceToTripScreen = ({route, navigation}) => {
  const {state: tripState, addPlaceToTrip} = useContext(TripContext);
  const [processState, setProcessState] = useState(0); // 0: en cours, 1: succès, 2: échec
  const [selectedTripIndex, setSelectedTripIndex] = useState(-1); // Si l'index est -1, il faut sélectionner un voyage.
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [notes, setNotes] = useState('');
  const {place} = route.params;
  const insets = useSafeAreaInsets();

  const backButtonAction = () => {
    setSelectedTripIndex(-1);
  };

  // Changement du comportement du retour arrière.
  useBackHandler(() => {
    if (processState === 0 && selectedTripIndex !== -1) {
      // Comportement custom
      backButtonAction();
      return true;
    }
    // Comportement normal
    return false;
  });

  const selectTrip = () => {
    return (
      <>
        <View style={[styles.header, {paddingTop: insets.top}]}>
          <Text style={{...styles.text, ...styles.title}}>
            Sélectionnez un voyage
          </Text>
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

  const placeProperties = () => {
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.containerKeyBoardAware}
          extraScrollHeight={hp(3)}
          enableAutomaticScroll
          enableOnAndroid>
          <View style={styles.container}>
            <Text style={styles.title}>
              {tripState.tripList[selectedTripIndex].name}
            </Text>
            <Text style={styles.subtitle}>{place.name}</Text>

            <Text style={{...styles.text, ...styles.centered}}>
              {`Temps estimé à passer sur le lieu\n(en minute)`}
            </Text>
            <TextInput
              style={(styles.text, styles.timeText)}
              maxLength={3}
              placeholder="0"
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={minute => {
                setSelectedMinutes(minute);
              }}
            />

            <Text style={{...styles.text, ...styles.centered}}>Notes</Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.textArea}
              autoCapitalize="none"
              maxLength={500}
              autoCorrect={false}
              multiline={true}
              numberOfLines={10}
              onChangeText={text => {
                setNotes(text);
              }}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                addPlaceToTrip(
                  tripState.tripList,
                  selectedTripIndex,
                  place,
                ).then(status => {
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
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };

  const successFeedback = () => {
    return (
      <SafeAreaView>
        <Text style={styles.title}>
          {tripState.tripList[selectedTripIndex].name}
        </Text>
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
        <Text style={styles.title}>
          {tripState.tripList[selectedTripIndex].name}
        </Text>
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
    // Processus en cours
    processState === 0 ? (
      // Aucun voyage n'a été sélectionné
      selectedTripIndex === -1 ? (
        tripState.loading ? (
          <SafeAreaView>
            <Text>Wait</Text>
          </SafeAreaView>
        ) : (
          selectTrip()
        )
      ) : (
        // Un voyage a été sélectionné
        placeProperties()
      )
    ) : // Processus réussi
    processState === 1 ? (
      successFeedback()
    ) : (
      // Proccessus échoué
      failureFeedback()
    )
  );
};

const styles = StyleSheet.create({
  containerKeyBoardAware: {
    width: wp(100),
    height: hp(100),
  },
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
    fontSize: wp(5.5),
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
    paddingBottom: wp(3),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  subtitle: {
    position: 'relative',
    textAlign: 'center',
    top: wp(-2),
    marginBottom: wp(6),
    fontSize: wp(5),
    fontWeight: '600',
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
  timeText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    textAlign: 'center',
    marginTop: wp(2),
    marginBottom: wp(6),
    width: wp(20),
    backgroundColor: '#fff',
    padding: wp(1),
    borderRadius: wp(2),
    alignSelf: 'center',
  },
  textArea: {
    fontFamily: 'Montserrat-Medium',
    textAlignVertical: 'top',
    height: wp(50),
    fontSize: wp(4),
    backgroundColor: '#fff',
    padding: wp(4),
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
    justifyContent: 'space-between',
  },
});

export default AddPlaceToTripScreen;
