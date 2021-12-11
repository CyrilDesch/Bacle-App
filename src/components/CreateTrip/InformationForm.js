import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import {Input} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import {Button} from 'react-native-elements/dist/buttons/Button';
import SearchBar from '../Search/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

const InformationForm = ({submit, step}) => {
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
    if (carouselRef.current.currentIndex > step) {
      switch (step) {
        case 0:
          setSelectedCountry(null);
          break;
        case 1:
          setSelectedCity(null);
          break;
      }
    }
    if (carouselRef.current != null) {
      carouselRef.current.snapToItem(step);
    }
  }, [step]);

  const [show, setShow] = useState(false);
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  defaultDate.setFullYear(defaultDate.getFullYear());

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
          name: 'Date du voyage',
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
          name: 'Ville à proximité \n(pour recommendation)',
          type: typeEnum.SEARCH,
          state: name,
          onlyCity: selectedCountry,
          setState: setName,
          selected: selectedCity,
          onSelect: setSelectedCity,
        },
      ],
    },
  ];

  const renderItem = ({item}) => {
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
                    minimumDate={new Date(1910, 0, 1)}
                    maximumDate={new Date(2010, 11, 31)}
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
                    onlyCity={inputData.onlyCity}
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
          title="Suivant"
          onPress={() => {
            let count = 0;

            item.required.forEach(element =>
              (element != null && element.length > 0) ||
              (element instanceof Date && element.getTime() > 0)
                ? count++
                : null,
            );
            if (count == item.required.length) {
              submit();
              setErrorMessage('');
            } else {
              setErrorMessage('Remplir les champs');
            }
          }}
          TouchableComponent={Pressable}
        />
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
    marginLeft: wp(2),
    height: wp(12),
    marginTop: wp(7),
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