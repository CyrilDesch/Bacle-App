import BacleAPI from '../api/BacleAPI';

import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchMap from '../components/Map/SearchMap';


const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const callSearchAPI = async () => {
    const res = await BacleAPI.search(text);
    const data = res.data.filter(value => (value.category == "tourism" || value.category == "boundary"));
    
    console.log("--- BACLE SEARCH -----------------------------------");
    console.log(data);
    console.log("----------------------------------------------------");

    setData(data);
  };

  return (
    <View style={styles.container}>

      {/* Carte */}
      <SafeAreaView style={styles.container}>
        <SearchMap
          style={{...styles.map, top: -insets.top, height: styles.map.height + insets.top}}
          searchData={data}
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
        {/* <FlatList
          data={data}
          keyExtractor={item => item.osm_id.toString()}
          renderItem={({item}) => (
            <Text>
              {item.display_name.split(',')[0]} à{' '}
              {item.display_name.split(',')[4]}
            </Text>
          )}
        /> */}
      </View>

      {/* Résultats */}
      {(data.length > 1)
      // TODO: Liste de résultats
        ? null 
        : null
      }

      {/* Léger détail du lieu sélectionné */}
      {(data.length == 1)
        ? (
          <View style={styles.infoCard}>
            <Text>
              {data[0].display_name.split(',')[0]} à
              {data[0].display_name.split(',')[4]}
            </Text>
          </View>
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
  }
});


export default SearchScreen;
