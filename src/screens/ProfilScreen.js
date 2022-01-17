import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {StyleSheet, ImageBackground, View, Text, Pressable} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ProfilScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const {state} = useContext(UserContext);

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/test0.jpg')}>
        <View style={styles.background2}></View>
      </ImageBackground>
      <View style={styles.headerBar}>
        <Text style={styles.title}>Mon compte</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {`Bonjour\n${state.firstName ? state.firstName : ''} ${
            state.lastName ? state.lastName : ''
          }`}
        </Text>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.button}
          title="Se déconnecter"
          onPress={signout}
          TouchableComponent={Pressable}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: wp(5),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    padding: wp(2),
  },
  animation: {
    position: 'absolute',
    alignSelf: 'center',
    height: wp(30),
    marginTop: wp(4),
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
    padding: wp(5),
    alignItems: 'center',
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
  button: {
    width: wp(80),
    height: wp(12),
    marginTop: wp(7),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(4),
    backgroundColor: '#1c3052',
  },
});

export default ProfilScreen;
