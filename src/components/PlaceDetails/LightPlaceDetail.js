import React from 'react';

import {StyleSheet, View, Text, Pressable} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const LightPlaceDetail = ({style, placeData, backButtonAction, navigation}) => {
  const title = placeData.display_name.split(',')[0];
  const address = placeData.display_name.slice(title.length + 2); // +2 (", ")

  const onAddToTripButtonPress = () => {
    const place = {
      name: title,
      notes: '',
      lat: placeData.lat,
      lon: placeData.lon,
      displayAddress: address,
    };
    navigation.navigate('AddPlaceToTrip', {place: place});
  };

  return (
    <View style={style}>
      {backButtonAction !== null ? (
        <Pressable style={styles.backButton} onPress={backButtonAction}>
          <Text style={styles.textBackButton}>Retour</Text>
        </Pressable>
      ) : null}
      <View style={styles.infoCard}>
        <View style={styles.line1}>
          <Text style={styles.title}>{title}</Text>
          {/* Bouton Ajout à un voyage */}
          <Pressable
            style={styles.containerAddButton}
            onPress={onAddToTripButtonPress}>
            <Text style={styles.addButton}>Ajouter à un voyage</Text>
          </Pressable>
        </View>
        <Text style={styles.type}>
          {placeData.type.charAt(0).toUpperCase() + placeData.type.slice(1)}
        </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: wp(4),
    minHeight: wp(30),
    width: wp(90),
    padding: wp(1.5),
    paddingHorizontal: wp(3.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: wp(1.5),
    backgroundColor: '#1c3052',
    borderRadius: wp(2),
  },
  textBackButton: {
    paddingHorizontal: wp(2),
    padding: wp(1),
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  line1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerAddButton: {
    backgroundColor: '#1c3052',
    borderRadius: wp(2),
  },
  addButton: {
    paddingHorizontal: wp(1.5),
    padding: wp(0.8),
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.3),
    color: 'white',
  },
  title: {
    width: wp(44),
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(4),
  },
  address: {
    marginTop: wp(1),
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3),
  },
  type: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3),
    color: '#a5a5a5',
  },
});

export default LightPlaceDetail;
