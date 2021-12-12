import React from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';


// onSelection: (item, index) => {}
const SelectTrip = ({trips, onSelection}) => {

  return (
    <FlatList
      contentContainerStyle={{padding: wp(5)}}
      keyExtractor={item => item._id}
      data={trips}
      renderItem={({item, index}) => (
        <View>
          <Pressable
            onPress={() => {
              onSelection(item, index);
            }}>
            <Text>Nom du voyage : {item.name}</Text>
          </Pressable>
        </View>
      )}
    />
  );
};


export default SelectTrip;
