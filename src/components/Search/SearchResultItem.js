import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Représentation d'un résultat de recherche pour "SearchResultList".
// itemData: Place                  Les informations sur un lieu
// onPress: func(itemIndex: int)    La fonction callback appelée quand le composant est "touché".
//                                  Elle est définie dans la liste et est différente pour chaque élément.
const SearchResultItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.result}>
        {item.display_name.split(',')[0]}
        {item.display_name.split(',')[4] && item.display_name.split(',')[4] > 0
          ? `à ${item.display_name.split(',')[4]}`
          : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  result: {
    padding: wp(2.5),
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
  },
});

export default SearchResultItem;
