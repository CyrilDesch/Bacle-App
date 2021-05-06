import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FavoritesScreen = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Favorites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold'
  }
});

export default FavoritesScreen;