import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

const CreateTravelScreen = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: wp(13),
  },
});

export default CreateTravelScreen;
