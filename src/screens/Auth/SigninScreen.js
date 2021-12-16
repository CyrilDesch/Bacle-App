import React, {useContext} from 'react';
import {View, StyleSheet, ImageBackground, StatusBar, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as UserContext} from '../../context/UserContext';
import AuthForm from '../../components/AuthForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SigninScreen = () => {
  const {signin} = useContext(AuthContext);
  const {saveUser} = useContext(UserContext);

  const handleSumbit = (email, password) => {
    signin({email, password, saveUser});
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.containerKeyBoardAware}
      extraScrollHeight={hp(3)}
      enableAutomaticScroll
      enableOnAndroid>
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/test0.jpg')}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Text style={styles.title}>Connectez-vous pour voyager !</Text>
        <View style={styles.center}>
          <AuthForm buttonLabel="Se connecter" authMethod={handleSumbit} />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  containerKeyBoardAware: {
    width: wp(100),
    height: hp(100),
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    height: hp(100),
    paddingTop: wp(25),
  },
  title: {
    fontSize: wp(9),
    width: wp(85),
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    marginLeft: wp(7),
    marginTop: wp(5),
    marginBottom: wp(15),
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold',
  },
  center: {
    width: wp(100),
    alignItems: 'center',
  },
});

export default SigninScreen;
