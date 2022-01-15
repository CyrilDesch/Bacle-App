import React from 'react';
import {FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

// onSelection: (item, index) => {}
const SelectTrip = ({trips, onSelection}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
          paddingBottom: hp(7),
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
              <Icon name="arrow-forward-circle-outline" size={wp(7)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: wp(3),
    marginBottom: wp(2.5),
    justifyContent: 'center',
    padding: wp(4),
    paddingHorizontal: wp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
});

export default SelectTrip;
