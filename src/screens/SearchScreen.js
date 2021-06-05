import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SearchScreen = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const callApi = async() => {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/",
      {
        params: { 
          street: text, 
          format: "json",
          "accept-language": "fr"
        } 
      }
    );
    const data = res.data.filter(value => value.class == "tourism");
    setData(data);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <Input value={text} onChangeText={setText} onSubmitEditing={callApi} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.osm_id}
        renderItem={({item}) =>
          <Text>{item.display_name}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold'
  }
});

export default SearchScreen;