import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm';


const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext);
  
  return(
    <View style={styles.container}>
      <AuthForm buttonLabel="S'inscrire" authMethod={signup} />
      <View style={{height: 30}}/>
      <Button title="Ou se connecter" onPress={() => navigation.navigate('SignIn')} />
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

export default SignupScreen;