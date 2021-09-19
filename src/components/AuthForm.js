import React, {useState} from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Pressable} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as navigation from '../navigationRef';

const AuthForm = ({buttonLabel, authMethod}) => {
  const [email, setEmail] = useState('julie.bosse@gmail.com');
  const [password, setPassword] = useState('test');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="e.g. margaux@emailaddress.com"
        inputContainerStyle={styles.textInput}
        inputStyle={styles.text}
        labelStyle={styles.label}
        placeholderTextColor="#989898"
        rightIcon={<IconAnt name="mail" size={wp(6)} color="white" />}
        label="Email"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        inputContainerStyle={styles.textInput}
        inputStyle={styles.text}
        labelStyle={styles.label}
        label="Mot de passe"
        rightIcon={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <IconIonicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={wp(6)}
              color="white"
            />
          </Pressable>
        }
        placeholderTextColor="#989898"
        secureTextEntry={!showPassword}
      />
      <Button
        buttonStyle={styles.button}
        title={buttonLabel}
        TouchableComponent={Pressable}
        onPress={() => authMethod({email, password})}
      />
      <View height={wp(5)} />
      <Button
        titleStyle={{color: '#375ea1'}}
        raised="false"
        TouchableComponent={Pressable}
        type="clear"
        onPress={() =>
          buttonLabel == 'Se connecter'
            ? navigation.navigate('SignUp')
            : navigation.navigate('SignIn')
        }
        title={
          buttonLabel == 'Se connecter' ? "Ou s'inscrire" : 'Ou se connecter'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: wp(0.4),
    padding: wp(1),
    paddingHorizontal: wp(2),
    borderBottomWidth: wp(0.4),
    borderColor: '#989898',
    borderRadius: wp(1),
    width: wp(85),
  },
  text: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  label: {
    fontSize: wp(4),
    marginBottom: wp(3),
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  button: {
    marginTop: wp(2),
    width: wp(85),
    marginLeft: wp(2.5),
    height: wp(13),
    backgroundColor: '#1c3052',
  },
});

export default AuthForm;
