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
import Icon from 'react-native-vector-icons/Ionicons';
import SearchResultList from './SearchResultList';

const SearchBar = ({
  onlyCity,
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
      setLoading(false);
      let data;
      if (onlyCity) {
        data = res.data.filter(
          value =>
            value.display_name.split(',').length == 6 &&
            value.display_name.includes(onlyCity.display_name.split(',')[0]),
        );
      } else if (onlyCountry) {
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
        rightIcon={
          loading ? (
            <ActivityIndicator
              animating={loading}
              size="small"
              color="#1c3052"
            />
          ) : data.length > 0 && onClose != null ? (
            <Pressable
              onPress={() => {
                setText('');
                onClose();
              }}>
              <Icon name="close" size={wp(6)} color="black" />
            </Pressable>
          ) : null
        }
      />
      {showResult && data.length > 0 ? (
        <View style={{padding: wp(1), marginTop: -wp(3)}}>
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
    </View>
  );
};

SearchBar.defaultProps = {
  showResult: true,
  onlyCity: null,
  onlyCountry: null,
  onClose: null,
  onSubmit: () => {},
  style: null,
};

const styles = StyleSheet.create({
  searchBar: {
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
