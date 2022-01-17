import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import SearchResultItem from './SearchResultItem';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Représentation de la liste des résultats de recherche
const SearchResultList = ({data, onItemPress}) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={item =>
        Date.now().toString() +
        item.display_name +
        Math.floor(Math.random() * 100000).toString()
      }
      renderItem={({item, index}) => (
        <SearchResultItem item={item} onPress={() => onItemPress(index)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: wp(1),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: wp(2),
    borderTopWidth: 0,
    borderColor: '#989898',
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default SearchResultList;
