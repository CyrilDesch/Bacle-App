import BacleAPI from '../api/BacleAPI';

import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchMap from '../components/Map/SearchMap';
import SearchResultList from '../components/Search/SearchResultList';


const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(-1);

  const callSearchAPI = async () => {
    const res = await BacleAPI.search(text);
    const data = res.data.filter(value => (value.category === "tourism" || value.category === "boundary"));
    
    console.log("--- BACLE SEARCH -----------------------------------");
    console.log(data);
    console.log("----------------------------------------------------");

    setData(data);

    // Mise à jour de la sélection de résultat
    if (data.length === 1)
      setSelectedPlaceIndex(0);
    else
      setSelectedPlaceIndex(-1);
  };

  const selectPlace = (placeIndex) => {
    setSelectedPlaceIndex(placeIndex);
    // TODO: Aller à l'emplacement du lieu.
  }

  return (
    <View style={styles.container}>

      {/* Carte */}
      <SafeAreaView style={styles.container}>
        <SearchMap
          style={{...styles.map, top: -insets.top, height: styles.map.height + insets.top}}
          searchData={data}
          focusedPlaceIndex={selectedPlaceIndex}
        />
      </SafeAreaView>

      {/* Barre de recherche */}
      <View style={{...styles.searchBar, top: styles.searchBar.top + insets.top}}>
        <Input 
          style={styles.searchField} 
          inputContainerStyle={styles.searchFieldContainer} 
          value={text} 
          onChangeText={setText} 
          onSubmitEditing={callSearchAPI} 
          placeholder={"Rechercher"}
        />
      </View>

      {(data.length !== 0)
        ? (
          (selectedPlaceIndex === -1)
          // Résultats
          // TODO: Enlever "selectedPlaceIndex === -1" et ajouter un moyen de revenir à la liste après sélection de résultat.!
          ? (
            <View style={styles.resultArea}>
              <SearchResultList data={data} onItemPress={(itemIndex) => { selectPlace(itemIndex) }}/>
            </View>
          )
          // Léger détail du lieu sélectionné
          : (
            <View style={styles.infoCard}>
              <Text>
                {data[selectedPlaceIndex].display_name.split(',')[0]} à
                {data[selectedPlaceIndex].display_name.split(',')[4]}
              </Text>
            </View>
          )
        )
        : null
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: wp(13),
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold',
  },
  map: {
    width: wp(100),
    height: hp(100),
  },
  searchBar: {
    position: 'absolute',
    width: wp(95),
    top: wp(2),
    backgroundColor: 'white',
    borderRadius: wp(6),
    height: wp(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchField: {

  },
  searchFieldContainer: {
    borderBottomWidth: 0,
  },
  infoCard: {
    position: 'absolute',
    bottom: wp(5),
    backgroundColor: 'white',
    borderRadius: wp(4),
    height: wp(30),
    width: wp(90),
    padding: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  resultArea: {
    position: 'absolute',
    bottom: wp(-6),
    backgroundColor: 'white',
    borderRadius: wp(4),
    height: wp(50),
    width: wp(100),
    padding: wp(2),
    paddingBottom: wp(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }
});


export default SearchScreen;
