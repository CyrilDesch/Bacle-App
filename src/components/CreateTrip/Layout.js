import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../navigationRef';

const Layout = ({children, back, step}) => {
  return (
    <SafeAreaView>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <ImageBackground
        style={styles.background}
        source={require('../../../assets/test0.jpg')}>
        <View style={styles.background2}></View>
      </ImageBackground>
      <View style={styles.headerBar}>
        <Text style={styles.title}>Création du voyage</Text>
      </View>
      <View style={styles.container}>
        <LottieView
          style={styles.animation}
          source={require('../../animations/travel.json')}
          autoPlay
          loop
        />
        <View style={styles.inline}>
          <TouchableOpacity style={{height: wp(8)}} onPress={back}>
            {step > 0 ? (
              <Icon
                name="chevron-back"
                size={wp(8)}
                color="#1c3052"
                style={{marginLeft: -wp(2)}}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity style={{height: wp(8)}} onPress={goBack}>
            <Icon name="close" size={wp(8)} color="#1c3052" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    alignSelf: 'center',
    height: wp(40),
  },
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
    height: hp(100),
    width: wp(100),
    backgroundColor: '#00000080',
  },
  headerBar: {
    paddingTop: wp(1),
    paddingBottom: wp(4),
    borderRadius: wp(5),
    justifyContent: 'center',
  },
  container: {
    width: wp(100),
    height: hp(100),
    backgroundColor: 'white',
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    paddingTop: wp(3),
  },
  title: {
    fontSize: wp(7),
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  inline: {
    height: wp(40),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Layout;
