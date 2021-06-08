import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, Image, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const tendance = require('../../customData.json').tendance;

  return(
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Text>Tendance</Text>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id}
        data={tendance}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => navigation.navigate("DetailLieu", { lieu: item })}>
            <Image 
              style={styles.image} 
              source={{ uri: item.urlImage }}
            />
          </TouchableOpacity>
        }
      />
      <Text>Recommandation</Text>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id}
        data={tendance}
        renderItem={({item}) =>
          <Image 
            style={styles.image} 
            source={{ uri: item.urlImage }}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  map: {
    flex: 1,
    width: wp(100), 
    height: hp(100),
  },
  image: {
    width: wp(30),
    height: wp(60),
    padding: wp(2),
    margin: wp(2)
  }
});

export default HomeScreen;