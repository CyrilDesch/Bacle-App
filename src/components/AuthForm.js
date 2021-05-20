import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AuthForm = ({ buttonLabel, authMethod }) => {

  const [email, setEmail] = useState('julie.bosse@gmail.com');
  const [password, setPassword] = useState('test');

  return(
    <View>
      <TextInput value={email} onChangeText={setEmail} style={styles.textInput}  />
      <TextInput value={password} onChangeText={setPassword} style={styles.textInput} />
      <Button title={buttonLabel} onPress={() => authMethod({email, password})} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#d1d1d1d1',
    padding: wp(2),
    marginBottom: hp(2),
    width: wp(50),
    height: hp(10)
  }
});

export default AuthForm;