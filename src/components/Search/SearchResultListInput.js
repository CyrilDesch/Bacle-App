import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import SearchResultItem from './SearchResultItem';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Représentation de la liste des résultats de recherche
const SearchResultListInput = ({data, onItemPress}) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: wp(2)}}
        persistentScrollbar
        data={data}
        keyExtractor={item => item.osm_id.toString()}
        renderItem={({item, index}) => (
          <SearchResultItem item={item} onPress={() => onItemPress(index)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: wp(65),
    paddingTop: wp(1),
    backgroundColor: 'white',
    zIndex: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    borderTopWidth: 0,
    borderColor: '#989898',
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default SearchResultListInput;
