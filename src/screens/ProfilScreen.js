import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';

const ProfilScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const {state} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {state.email}</Text>
      <Button title="Se déconnecter" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: wp(5),
    fontFamily: 'Montserrat-Regular',
  },
});

export default ProfilScreen;
