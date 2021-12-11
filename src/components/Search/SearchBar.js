import React, {useEffect, useState} from 'react';
import {search} from '../../api/tracker';
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
import SearchResultList from './SearchResultList';

const SearchBar = ({
  onlyCountry,
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

  const callSearchAPI = async () => {
    if (text.length > 1) {
      setLoading(true);
      const res = await search(text);
      console.log(res.data);
      setLoading(false);
      let data;
      if (onlyCountry) {
        data = res.data.filter(
          value => value.display_name.split(',').length == 1,
        );
      } else {
        data = res.data.filter(
          value =>
            (value.category == 'tourism' || value.category == 'boundary') &&
            value.display_name.includes('France'),
        );
      }
      setData(data);
      onSubmit(data);
    }
  };

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
              setData([]);
              if (setSelected) {
                setSelected(null);
              }
            }
            setText(text);
          }}
          onSubmitEditing={callSearchAPI}
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
          <SearchResultList
            data={data}
            onItemPress={index => {
              setText(data[index].display_name.split(',')[0]);
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
  onlyCountry: null,
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
