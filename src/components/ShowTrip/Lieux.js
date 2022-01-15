import React from 'react';
import {Text, View, FlatList, StyleSheet, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Lieux = ({trip, navigation}) => (
  <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
    <FlatList
      overScrollMode="never"
      ListHeaderComponent={
        <Pressable
          style={styles.containerButtonAddPlace}
          onPress={() => navigation.navigate('SearchStack')}>
          <Text style={styles.buttonAddPlace}>+ Ajoutez un lieu</Text>
        </Pressable>
      }
      contentContainerStyle={{padding: wp(5), paddingBottom: 0}}
      keyExtractor={item => item._id}
      data={trip.places}
      renderItem={({item, index}) => (
        <Text style={styles.itemListPlace}>{item.name}</Text>
      )}
      ListEmptyComponent={
        <Text style={styles.textEmpty}>Aucun lieu ajouté</Text>
      }
    />
  </View>
);

const styles = StyleSheet.create({
  itemListPlace: {
    marginBottom: wp(3),
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    borderRadius: wp(2),
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
  textEmpty: {
    textAlign: 'center',
    color: '#9f9f9f',
    fontSize: wp(4.5),
    marginTop: hp(10),
    fontFamily: 'Montserrat-Medium',
  },

  containerButtonAddPlace: {
    marginBottom: wp(3),
    backgroundColor: '#1c3052',
    borderRadius: wp(2),
    alignSelf: 'center',
  },
  buttonAddPlace: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
    color: 'white',
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-Regular',
  },
});

export default Lieux;
