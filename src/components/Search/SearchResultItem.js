import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


// Représentation d'un résultat de recherche pour "SearchResultList".
// itemData: Place                  Les informations sur un lieu
// onPress: func(itemIndex: int)    La fonction callback appelée quand le composant est "touché". 
//                                  Elle est définie dans la liste et est différente pour chaque élément. 
const SearchResultItem = ({itemData, onPress}) => {
  console.log("--- RESULT ITEM DATA -----");
  console.log(itemData);
  console.log("---------------------");

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        {itemData.display_name.split(',')[0]} à
        {itemData.display_name.split(',')[4]}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({

});


export default SearchResultItem;
