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
      data={data}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              borderTopWidth: wp(0.1),
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

const styles = StyleSheet.create({});

export default SearchResultList;
