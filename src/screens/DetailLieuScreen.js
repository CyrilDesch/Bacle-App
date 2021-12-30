import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailLieuScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Pas finito</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
  image: {
    width: wp(30),
    height: wp(60),
    padding: wp(2),
    margin: wp(2),
  },
});

export default DetailLieuScreen;
