import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ProfilScreen = () => {

  const user = require('../../customData.json').user;
  
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Nom: {user.lastName}</Text>
      <Text style={styles.text}>Prénom: {user.firstName}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Trip 1: {JSON.stringify(user.trips[0])}</Text>
      <Text style={styles.text}>Trip 2: {JSON.stringify(user.trips[1])}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontSize: wp(5),
    fontFamily: 'Montserrat-Regular'
  }
});

export default ProfilScreen;