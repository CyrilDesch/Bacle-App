import React, {useContext, useEffect, useState, useRef} from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as navigation from '../navigationRef';
import {Context as AuthContext} from '../context/AuthContext';
import {emailCheckRequest} from '../api/userRequest';

const authValidator = (email, password) => {
  const emailVerif = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email,
  );
  const passwordVerif = password => {
    return (
      password.length > 8 &&
      /\d/g.test(password) &&
      /[A-Z]/g.test(password) &&
      /[a-z]/g.test(password)
    );
  };

  if (!emailVerif && !passwordVerif) {
    throw "L'adresse email entrée est invalide.\nPour votre sécurité, le mot de passe doit contenir au moin 8 caractères dont une majuscule, une minuscule et un chiffre.";
  } else if (!emailVerif) {
    throw "L'adresse email entrée est invalide.";
  } else if (!passwordVerif) {
    throw 'Pour votre sécurité, le mot de passe doit contenir au moin 8 caractères dont une majuscule, une minuscule et un chiffre.';
  }
};

const AuthForm = ({buttonLabel, authMethod, showSecondForm}) => {
  const [email, setEmail] = useState('test@bacle.eu.org'); // TODO: Enlever les logins de test
  const [password, setPassword] = useState('MdpDeT3st');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {state, removeError, addError} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current;
  const moveDown = useRef(new Animated.Value(-20)).current;
  const fadeSubmitButton = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state.error && state.error != '') setLoading(false);
  }, [state]);
  useEffect(() => {
    setLoading(false);
    if (showSecondForm && showSecondForm[0] && !showSecondForm[1]) {
      Animated.timing(fadeSubmitButton, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }

    if (showSecondForm && showSecondForm[0] && showSecondForm[1]) {
      Animated.stagger(500, [
        Animated.parallel([
          Animated.timing(fadeIn, {
            duration: 1000,
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(moveDown, {
            duration: 1000,
            toValue: 0,
            useNativeDriver: true,
          }),
        ]),

        Animated.timing(fadeSubmitButton, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showSecondForm]);

  return (
    <View>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="e.g. margaux@emailaddress.com"
        editable={showSecondForm && !showSecondForm[0]}
        inputContainerStyle={[
          styles.textInput,
          showSecondForm && showSecondForm[0]
            ? {backgroundColor: '#63636399'}
            : {},
        ]}
        inputStyle={styles.text}
        labelStyle={styles.label}
        placeholderTextColor="#989898"
        rightIcon={<IconAnt name="mail" size={wp(6)} color="white" />}
        label="Email"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        editable={showSecondForm && !showSecondForm[0]}
        inputContainerStyle={[
          styles.textInput,
          showSecondForm && showSecondForm[0]
            ? {backgroundColor: '#63636399'}
            : {},
        ]}
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
      {showSecondForm && showSecondForm[1] ? (
        <Animated.View
          style={{transform: [{translateY: moveDown}], opacity: fadeIn}}>
          <Input
            value={lastName}
            onChangeText={setLastName}
            inputContainerStyle={styles.textInput}
            inputStyle={styles.text}
            labelStyle={styles.label}
            label="Nom"
          />
          <Input
            value={firstName}
            onChangeText={setFirstName}
            inputContainerStyle={styles.textInput}
            inputStyle={styles.text}
            labelStyle={styles.label}
            label="Prénom"
          />
        </Animated.View>
      ) : null}
      <Animated.View style={{opacity: fadeSubmitButton}}>
        <Text style={styles.error}>{state.error}</Text>
        <Button
          loading={loading}
          titleStyle={styles.button}
          title={buttonLabel}
          TouchableComponent={Pressable}
          onPress={async () => {
            try {
              removeError();
              setLoading(true);
              if (showSecondForm && showSecondForm[1]) {
                if (lastName.length > 1 && firstName.length > 1)
                  authMethod(email, password, lastName, firstName);
                else throw 'Veuillez renseigner votre nom et votre prénom.';
              } else if (showSecondForm) {
                authValidator(email, password);
                await emailCheckRequest(email);
                authMethod(email, password);
              } else {
                authMethod(email, password);
              }
            } catch (err) {
              addError({error: err});
            }
          }}
        />
        <View height={wp(4)} />

        <Button
          titleStyle={{color: '#375ea1'}}
          raised="false"
          TouchableComponent={Pressable}
          type="clear"
          onPress={() => {
            removeError();
            buttonLabel == 'Se connecter'
              ? navigation.navigate('SignUp')
              : navigation.navigate('SignIn');
          }}
          title={
            buttonLabel == 'Se connecter' ? "Ou s'inscrire" : 'Ou se connecter'
          }
        />
      </Animated.View>
    </View>
  );
};

AuthForm.defaultProps = {
  showSecondForm: null,
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: wp(0.3),
    padding: wp(0.5),
    paddingHorizontal: wp(2),
    borderBottomWidth: wp(0.3),
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
    marginBottom: wp(2),
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  button: {
    width: wp(85),
    marginLeft: wp(2.5),
    fontFamily: 'Montserrat-Medium',
    height: wp(13),
    backgroundColor: '#1c3052',
  },
  error: {
    width: wp(85),
    fontSize: wp(3.5),
    marginLeft: wp(2.5),
    padding: wp(1.5),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#ae0000',
  },
});

export default AuthForm;
