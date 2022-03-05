import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
  StatusBar,
  SectionList,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const ProfilScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const {state} = useContext(UserContext);


  //{title: 'Modifier vos informations', icon: 'edit', action: navigation.navigate('EditProfil')}
  //{title: "Conditions générales d'utilisation", icon: 'mobile1', action: () => navigation.navigate('ShowDoc', {doc: 'CGT'})}
  const profilSection = [
    {
      title: 'Mes informations',
      data: [{title: 'Se déconnecter', icon: 'logout', action: signout}],
    },
    {
      title: 'Réglages',
      data: [
        {title: 'Politique de confidentialité', icon: 'lock1', action: () => navigation.navigate('ShowDoc', {doc: 'PDC'})},
        {title: 'Crédit', icon: 'copyright', action: () => navigation.navigate('ShowDoc', {doc: 'CREDIT'})},
      ],
    },
  ];

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
        <SectionList
          sections={profilSection}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Pressable onPress={item.action}>
              <View style={styles.card}>
                <Icon name={item.icon} size={wp(6)} color="black" />
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </Pressable>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: wp(1.5),
    marginBottom: wp(3),
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    minWidth: wp(90)
  },
  text: {
    fontSize: wp(4),
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
    backgroundColor: 'red',
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
    backgroundColor: '#EBEBEB',
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
  sectionHeader: {
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-SemiBold',
    color: 'gray',
    marginTop: wp(2),
    marginBottom: wp(1.5),
  },
});

export default ProfilScreen;
