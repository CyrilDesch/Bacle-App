import React from 'react';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';

const HomeScreen = () => {
  return(
    <SafeAreaView style={styles.container}>
      <Map style={styles.map} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  map: {
    flex: 1,
    width: wp(100), 
    height: hp(100),
  }
});

export default HomeScreen;