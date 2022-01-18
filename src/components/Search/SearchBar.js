import React, {useEffect, useState} from 'react';
import {searchCity, searchAll} from '../../api/tracker';
import axios from 'axios';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Input} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchResultListInput from './SearchResultListInput';

let source = axios.CancelToken.source();

const SearchBar = ({
  onlyCity,
  showResult,
  setSearchData,
  onSubmit,
  style,
  onClose,
  setSelected,
  selected,
}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selected) {
      setText('');
    }
  }, [selected]);

  useEffect(() => {
    if (!showResult) {
      setSearchData(data);
    }
  }, [data]);

  const callSearchCityAPI = async text => {
    source.cancel();
    source = axios.CancelToken.source();
    if (text.length > 0) {
      try {
        setLoading(true);
        const res = await searchCity(text, source.token);
        console.log(res.data);
        setLoading(false);
        setData(res.data);
        onSubmit(res.data);
      } catch {}
    } else {
      setLoading(false);
      setData([]);
      onSubmit([]);
    }
  };

  const callSearchAPI = async () => {
    if (text.length > 1) {
      setLoading(true);
      const res = await searchAll(text);
      setLoading(false);
      let data = res.data;
      setData(data);
      onSubmit(data);
    }
  };

  useEffect(() => {
    if (onlyCity) {
      const delayDebounceFn = setTimeout(() => {
        callSearchCityAPI(text);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [text]);

  return (
    <>
      <View style={[styles.searchBar, style]}>
        <Input
          inputContainerStyle={styles.searchFieldContainer}
          inputStyle={styles.input}
          value={text}
          renderErrorMessage={false}
          onChangeText={text => {
            if (data.length >= 0) {
              onlyCity ? null : setData([]);
              if (setSelected) {
                setSelected(null);
              }
            }
            setText(text);
          }}
          onSubmitEditing={onlyCity ? null : callSearchAPI}
          placeholder={'Rechercher'}
          leftIcon={<Icon name="search1" size={wp(5)} color="#00000090" />}
          rightIcon={
            loading ? (
              <ActivityIndicator
                animating={loading}
                size="small"
                color="#1c3052"
              />
            ) : text.length > 0 && onClose != null ? (
              <Pressable
                onPress={() => {
                  setText('');
                  onClose();
                }}>
                <Icon name="closecircle" size={wp(5)} color="#00000090" />
              </Pressable>
            ) : null
          }
        />
      </View>
      {showResult && data.length > 0 ? (
        <View style={styles.result}>
          <SearchResultListInput
            data={data}
            onItemPress={index => {
              setText(
                data[index].display_name.split(',')[0] +
                  ' - ' +
                  data[index].display_name.split(',')[1],
              );
              if (setSelected) {
                setSelected(data[index]);
              }
              setData([]);
            }}
          />
        </View>
      ) : null}
    </>
  );
};

SearchBar.defaultProps = {
  showResult: true,
  onlyCity: null,
  onClose: null,
  onSubmit: () => {},
  style: null,
};

const styles = StyleSheet.create({
  searchBar: {
    zIndex: 2,
    paddingHorizontal: wp(1),
    width: '100%',
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
  result: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    top: wp(22),
    paddingHorizontal: wp(1),
  },
});

export default SearchBar;
