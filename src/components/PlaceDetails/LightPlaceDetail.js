import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const LightPlaceDetail = ({style, placeData, backButtonAction}) => {
  const getText = () => {
    const title = placeData.display_name.split(',')[0];
    const address = placeData.display_name.slice(title.length + 2); // +2 (", ")

    return (
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>
          {placeData.type.charAt(0).toUpperCase() + placeData.type.slice(1)}
        </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    );
  };

  return (
    <View style={{...styles.infoCard, ...style}}>
      <View style={styles.buttons}>
        {/* Bouton retour */}
        {backButtonAction !== null ? (
          <Pressable
            style={{...styles.button, ...styles.backButton}}
            onPress={backButtonAction}>
            <IconIonicons
              name={'arrow-back-outline'}
              size={wp(8)}
              color="black"
            />
          </Pressable>
        ) : null}

        {/* Bouton Ajout à un voyage */}
        <Pressable 
          style={{...styles.button, ...styles.addButton}}
          onPress={() => {}}>
          <IconIonicons
            name={'add-circle-outline'}
            size={wp(8)}
            color="black"
          />
        </Pressable>
      </View>

      <View style={styles.imageElevation}>
        <Image
          style={styles.image}
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
        />
      </View>

      {getText()}
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: wp(4),
    minHeight: wp(30),
    width: wp(90),
    padding: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttons: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: wp(9),
    height: wp(9),
    position: 'relative',
  },
  backButton: {},
  addButton: {},
  imageElevation: {
    position: 'absolute',
    borderRadius: wp(4),
    top: -wp(9),
    right: wp(15),
    zIndex: 10,
    backgroundColor: '#ebebeb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(4),
  },
  text: {
    marginBottom: wp(2),
    marginHorizontal: wp(4),
  },
  title: {
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
