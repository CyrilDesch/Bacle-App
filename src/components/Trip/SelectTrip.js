import React from 'react';
import {FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// onSelection: (item, index) => {}
const SelectTrip = ({trips, onSelection}) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: wp(5),
        paddingVertical: wp(2),
      }}
      keyExtractor={item => item._id + new Date().toDateString()}
      data={trips}
      ListEmptyComponent={<Text>Veuillez créer un voyage</Text>}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => {
            onSelection(item, index);
          }}>
          <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: wp(5),
    marginBottom: wp(2),
    justifyContent: 'center',
    padding: wp(4),
  },
  text: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
});

export default SelectTrip;
