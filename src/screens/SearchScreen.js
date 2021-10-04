import axios from 'axios';

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {SafeAreaView} from 'react-native-safe-area-context';
import Map, {getLatLng} from '../components/Map/Map';

const SearchScreen = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get('https://nominatim.openstreetmap.org/', {
      params: {
        q: text,
        format: 'json',
        'accept-language': 'fr',
      },
    });
    const data = res.data.filter(
      value => value.class == 'tourism' || value.class == 'boundary',
    );
    console.log(data);
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
        <Map
          style={styles.map}
          steps={getLatLng(data)}
          data={data}
          currentMarkerFocus={null}
        />
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
