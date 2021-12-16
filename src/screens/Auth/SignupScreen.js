import React, {useContext, useState, useRef} from 'react';
import {ImageBackground, StyleSheet, StatusBar, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as UserContext} from '../../context/UserContext';
import AuthForm from '../../components/AuthForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = () => {
  const {signup} = useContext(AuthContext);
  const {saveUser} = useContext(UserContext);
  const [showSecondForm, setShowSecondForm] = useState([false, false]);

  const titleAnimUp = useRef(new Animated.Value(0)).current;
  const viewAnimUp = useRef(new Animated.Value(0)).current;

  const handleSumbit = (email, password, lastName, firstName) => {
    if (!showSecondForm[0]) {
      setShowSecondForm([true, false]);
      Animated.timing(titleAnimUp, {
        toValue: -1000,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(viewAnimUp, {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowSecondForm([true, true]));
    } else {
      signup({email, password, lastName, firstName, saveUser});
    }
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
        <Animated.Text
          style={[styles.title, {transform: [{translateY: titleAnimUp}]}]}>
          Inscrivez-vous pour voyager !
        </Animated.Text>
        <Animated.View
          style={[styles.center, {transform: [{translateY: viewAnimUp}]}]}>
          <AuthForm
            buttonLabel="S'inscrire"
            authMethod={handleSumbit}
            showSecondForm={showSecondForm}
          />
        </Animated.View>
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
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold',
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
  center: {
    width: wp(100),
    alignItems: 'center',
  },
});

export default SignupScreen;
