import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DetailLieuScreen = ({ navigation }) => {
  const data = navigation.getParam('lieu');
  return(
    <View>
      <Image 
        style={styles.image} 
        source={{ uri: data.urlImage }}
      />
      <Text>{data.name}</Text>
    </View>
  );
}

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

export default DetailLieuScreen;