import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';

import SearchResultItem from './SearchResultItem';


// Représentation de la liste des résultats de recherche
const SearchResultList = ({data, onItemPress}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.osm_id.toString()}
      renderItem={(itemData) => (
        <SearchResultItem itemData={itemData.item} onPress={() => onItemPress(itemData.index)}/>
      )}
    />
  );
};


const styles = StyleSheet.create({

});

export default SearchResultList;
