import React from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const WaitScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <LottieView
        style={styles.animation}
        resizeMode="cover"
        source={require('../../animations/launchAnim.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>BACLE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c3052',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(15),
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  animation: {
    width: wp(60),
  },
});

export default WaitScreen;
