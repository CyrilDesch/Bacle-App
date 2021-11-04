import React, {useEffect, useState} from 'react';
import {search} from '../api/tracker';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {set} from 'date-fns';

const InstantSearchBar = ({onlyCity}) => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const callSearchAPI = async () => {
    setLoading(true);
    const res = await search(text);
    setLoading(false);
    const data = res.data.filter(
      onlyCity
        ? value =>
            value.category == 'boundary' &&
            value.display_name.includes('France')
        : value =>
            (value.category == 'tourism' || value.category == 'boundary') &&
            value.display_name.includes('France'),
    );
    setData(data);
  };

  return (
    <View style={styles.searchBar}>
      <Input
        inputContainerStyle={styles.searchFieldContainer}
        inputStyle={styles.input}
        value={text}
        renderErrorMessage={false}
        onChangeText={setText}
        onSubmitEditing={callSearchAPI}
        placeholder={'Rechercher'}
      />
      <ActivityIndicator
        style={styles.indicator}
        animating={loading}
        size="small"
        color="#1c3052"
      />
      <FlatList
        contentContainerStyle={{paddingBottom: wp(2)}}
        data={data}
        keyExtractor={item => item.osm_id.toString()}
        renderItem={({item}) => (
          <Text style={styles.result}>
            {item.display_name.split(',')[0]}
            {item.display_name.split(',')[4] &&
            item.display_name.split(',')[4] > 0
              ? `à ${item.display_name.split(',')[4]}`
              : ''}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    width: wp(90),
    alignSelf: 'center',
    top: wp(2),
    backgroundColor: 'white',
    borderRadius: wp(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchFieldContainer: {
    borderBottomWidth: 0,
  },
  input: {
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
  },
  indicator: {
    position: 'absolute',
    right: wp(3),
    top: wp(3.5),
    flex: 1,
  },
  result: {
    borderTopWidth: wp(0.2),
    borderTopColor: '#B9B9B9',
    paddingVertical: wp(2),
    marginHorizontal: wp(3.5),
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
  },
});

export default InstantSearchBar;
