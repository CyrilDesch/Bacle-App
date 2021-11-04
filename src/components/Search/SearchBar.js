import React, {useEffect, useState} from 'react';
import {search} from '../../api/tracker';
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
import SearchResultList from './SearchResultList';

const SearchBar = ({onlyCity, showResult, setSearchData, onSubmit}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!showResult) {
      setSearchData(data);
    }
  }, [data]);

  const callSearchAPI = async () => {
    if (text.length > 1) {
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
      onSubmit(data);
    }
  };

  return (
    <View style={styles.searchBar}>
      <Input
        inputContainerStyle={styles.searchFieldContainer}
        inputStyle={styles.input}
        value={text}
        renderErrorMessage={false}
        onChangeText={text => {
          if (data.length != 0) {
            setData([]);
          }
          setText(text);
        }}
        onSubmitEditing={callSearchAPI}
        placeholder={'Rechercher'}
      />
      <ActivityIndicator
        style={styles.indicator}
        animating={loading}
        size="small"
        color="#1c3052"
      />
      {showResult && data.length > 0 ? (
        <View style={{padding: wp(1), marginTop: -wp(3)}}>
          <SearchResultList data={data} />
        </View>
      ) : null}
    </View>
  );
};

SearchBar.defaultProps = {
  showResult: true,
  onlyCity: false,
};

const styles = StyleSheet.create({
  searchBar: {
    width: wp(95),
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
    paddingTop: wp(2.5),
    marginBottom: wp(2.5),
    marginHorizontal: wp(3.5),
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
  },
});

export default SearchBar;
