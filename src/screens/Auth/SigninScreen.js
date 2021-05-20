import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm';

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext);

  return(
    <View style={styles.container}>
      <AuthForm buttonLabel="Se connecter" authMethod={signin} />
      <View style={{height: 30}}/>
      <Button title="Ou s'inscrire"  onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold'
  }
});

export default SigninScreen;