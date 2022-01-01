import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import IconIonicons from 'react-native-vector-icons/Ionicons';

// Représentation d'un résultat de recherche pour "SearchResultList".
// itemData: Place                  Les informations sur un lieu
// onPress: func(itemIndex: int)    La fonction callback appelée quand le composant est "touché".
//                                  Elle est définie dans la liste et est différente pour chaque élément.
const SearchResultItem = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', paddingTop: wp(2), marginLeft: wp(2)}}
      onPress={onPress}>
      <View
        style={{
          borderWidth: wp(0.2),
          borderColor: 'gray',
          borderRadius: wp(6),
          width: wp(11),
          justifyContent: 'center',
          alignItems: 'center',
          height: wp(11),
        }}>
        <IconIonicons name="location-outline" size={wp(6)} />
      </View>
      <Text style={styles.result}>{item.display_name.split(',')[0]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  result: {
    padding: wp(3),
    fontSize: wp(4),
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default SearchResultItem;
