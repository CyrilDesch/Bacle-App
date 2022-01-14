import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements/dist/buttons/Button';
import Carousel from 'react-native-snap-carousel';
import SearchBar from '../Search/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

const InformationForm = ({submit, step, loading}) => {
  const typeEnum = {
    TEXT: 1,
    DATE: 2,
    SEARCH: 3,
  };

  const carouselRef = useRef(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (carouselRef.current != null) {
      carouselRef.current.snapToItem(step);
    }
  }, [step]);

  useEffect(() => {
    setSelectedCity(null);
  }, [selectedCountry]);

  const [show, setShow] = useState(false);
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  defaultDate.setFullYear(defaultDate.getFullYear());
  const maximumDate = new Date();
  maximumDate.setFullYear(defaultDate.getFullYear() + 30);

  const dataForm = [
    {
      title: 'Rentrer les informations du voyage',
      required: [name, date],
      data: [
        {
          name: 'Nom du voyage',
          type: typeEnum.TEXT,
          state: name,
          setState: setName,
        },
        {
          name: 'Date de départ',
          type: typeEnum.DATE,
          state: date,
          setState: setDate,
        },
      ],
    },
    {
      title: 'Information',
      required: [selectedCountry],
      data: [
        {
          name: 'Pays du voyage',
          type: typeEnum.SEARCH,
          state: name,
          onlyCountry: true,
          setState: setName,
          selected: selectedCountry,
          onSelect: setSelectedCountry,
        },
      ],
    },
    {
      title: 'Information',
      required: [selectedCity],
      data: [
        {
          name: 'Ville de destination',
          type: typeEnum.SEARCH,
          state: name,
          setState: setName,
          selected: selectedCity,
          onSelect: setSelectedCity,
        },
      ],
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        {item.data.map(inputData => {
          switch (inputData.type) {
            case typeEnum.TEXT:
              return (
                <Input
                  key={inputData.name}
                  value={inputData.state}
                  onChangeText={inputData.setState}
                  inputContainerStyle={styles.textInput}
                  inputStyle={styles.text}
                  labelStyle={styles.label}
                  label={inputData.name}
                />
              );
            case typeEnum.DATE:
              return (
                <View key={inputData.name} style={styles.inputDateContainer}>
                  <Text style={styles.labelDate}>{inputData.name}</Text>
                  <Pressable onPress={() => setShow(!show)}>
                    <Text style={styles.textInputDate}>
                      {inputData.state
                        ? format(inputData.state, 'dd/MM/yyyy')
                        : 'Selectionner une date'}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    mode="date"
                    isVisible={show}
                    date={inputData.state ? inputData.state : defaultDate}
                    locale="fr-FR"
                    onConfirm={selectedDate => {
                      setShow(false);
                      if (selectedDate !== undefined && selectedDate !== date) {
                        inputData.setState(selectedDate);
                      }
                    }}
                    onCancel={() => setShow(false)}
                    minimumDate={defaultDate}
                    maximumDate={maximumDate}
                  />
                </View>
              );
            case typeEnum.SEARCH:
              return (
                <View key={inputData.name} style={styles.inputDateContainer}>
                  <Text style={styles.labelDate}>{inputData.name}</Text>
                  <SearchBar
                    style={styles.searchBar}
                    key={inputData.name}
                    onlyCountry={inputData.onlyCountry}
                    setSelected={inputData.onSelect}
                    selected={inputData.selected}
                  />
                  {inputData.selected ? (
                    <Icon
                      style={styles.valid}
                      name="checkmark-circle"
                      size={wp(4)}
                      color="#228B22"
                    />
                  ) : null}
                </View>
              );
          }
        })}
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.button}
          title={dataForm.length - 1 != index ? 'Suivant' : 'Créer'}
          onPress={() => {
            let count = 0;
            item.required.forEach(element =>
              (element != null && Object.values(element).length > 0) ||
              (element instanceof Date && element.getTime() > 0)
                ? count++
                : null,
            );

            if (count == item.required.length) {
              if (index == dataForm.length - 1) {
                submit({
                  name: name,
                  defaultStartLoc: {
                    lat: selectedCity.lat,
                    lon: selectedCity.lon,
                  },
                  startDate: date,
                });
              } else {
                submit();
              }
              setErrorMessage('');
            } else {
              setErrorMessage('Remplir les champs');
            }
          }}
          TouchableComponent={Pressable}
        />
        {loading ? (
          <View style={{marginTop: wp(2)}}>
            <ActivityIndicator color="#1c3052" />
          </View>
        ) : null}
        <Text>{errorMessage}</Text>
      </View>
    );
  };

  return (
    <Carousel
      scrollEnabled={false}
      ref={carouselRef}
      data={dataForm}
      renderItem={renderItem}
      sliderWidth={wp(100)}
      itemWidth={wp(100)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(8),
  },
  title: {
    marginBottom: wp(7),
    fontSize: wp(7),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#1c3052',
  },
  searchBar: {
    marginBottom: wp(5),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: '#989898',
    elevation: 0,
    shadowOpacity: 0,
  },
  textInput: {
    borderWidth: wp(0.3),
    marginBottom: -wp(2),
    padding: wp(0.5),
    paddingHorizontal: wp(2),
    borderBottomWidth: wp(0.3),
    borderColor: '#989898',
    borderRadius: wp(1),
    alignSelf: 'center',
  },

  button: {
    width: wp(80),
    height: wp(12),
    marginTop: wp(7),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(4),
    backgroundColor: '#1c3052',
  },
  text: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  label: {
    fontSize: wp(4),
    marginBottom: wp(2),
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  inputDateContainer: {
    width: '95%',
    marginLeft: wp(2),
  },
  textInputDate: {
    width: '100%',
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    borderWidth: wp(0.3),
    paddingVertical: wp(4),
    paddingHorizontal: wp(3),
    borderBottomWidth: wp(0.3),
    borderColor: '#989898',
    borderRadius: wp(1),
    alignSelf: 'center',
  },
  labelDate: {
    fontSize: wp(4),
    marginBottom: wp(2),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  valid: {
    position: 'absolute',
    right: 0,
    top: wp(1.5),
  },
});

export default InformationForm;
