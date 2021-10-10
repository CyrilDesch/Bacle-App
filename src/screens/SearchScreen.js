import BacleAPI from '../api/BacleAPI';
('../api/BacleAPI');

import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

import SearchMap from '../components/Map/SearchMap';

const SearchScreen = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await BacleAPI.search(text);
    const data = res.data.filter(
      value => value.category == 'tourism' || value.category == 'boundary',
    );

    console.log('--- BACLE SEARCH -----------------------------------');
    console.log(data);
    console.log('----------------------------------------------------');

    setData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <Input value={text} onChangeText={setText} onSubmitEditing={callApi} />
      <FlatList
        data={data}
        keyExtractor={item => item.osm_id.toString()}
        renderItem={({item}) => (
          <Text>
            {item.display_name.split(',')[0]} à{' '}
            {item.display_name.split(',')[4]}
          </Text>
        )}
      />
      <SafeAreaView style={styles.container}>
        <SearchMap style={styles.map} searchData={data} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold',
  },
  map: {
    width: wp(100),
    height: hp(100),
  },
});

export default SearchScreen;
