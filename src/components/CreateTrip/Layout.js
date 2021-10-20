import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const Layout = ({children}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.background}
        source={require('../../../assets/test0.jpg')}>
        <View style={styles.background2}>
          <View style={styles.headerBar}>
            <Icon />
            <Text style={styles.title}>Création du voyage</Text>
          </View>
          <View style={styles.container}></View>
          {children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'gray',
    height: hp(100),
    width: wp(100),
  },
  background2: {
    backgroundColor: '#000000040',
  },
  headerBar: {
    width: wp(90),
    padding: wp(7),
    borderRadius: wp(5),
    justifyContent: 'center',
  },
  container: {
    width: wp(100),
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
  },
  title: {
    fontSize: wp(7),
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
});

export default Layout;
