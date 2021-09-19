import React, {useContext} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Button,
  StatusBar,
  Text,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Context as AuthContext} from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm';

const SignupScreen = ({navigation}) => {
  const {signup} = useContext(AuthContext);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../assets/test0.jpg')}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Text style={styles.title}>Inscrivez-vous pour voyager !</Text>
      <View style={styles.center}>
        <AuthForm buttonLabel="S'inscrire" authMethod={signup} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    flex: 1,
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
