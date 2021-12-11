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
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              borderTopWidth: wp(0.3),
              borderTopColor: '#B9B9B9',
            }}
          />
        );
      }}
      keyExtractor={item => item.osm_id.toString()}
      renderItem={({item, index}) => (
        <SearchResultItem item={item} onPress={() => onItemPress(index)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: wp(5),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: wp(2),
    borderTopWidth: 0,
    borderWidth: wp(0.3),
    borderColor: '#989898',
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default SearchResultList;
