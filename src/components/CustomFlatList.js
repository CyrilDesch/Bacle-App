import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Shadow} from 'react-native-neomorph-shadows';

const CustomFlatList = ({data}) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.list}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
      onScroll={e => {
        let pageNumber =
          Math.min(
            Math.max(
              Math.floor(e.nativeEvent.contentOffset.x / wp(30) + 0.5) + 1,
              0,
            ),
            data.length,
          ) - 1;
        if (currentPage !== pageNumber) setCurrentPage(pageNumber);
      }}
      keyExtractor={item => item.item1.id}
      data={data}
      renderItem={({item, index}) => (
        <View>
          <Pressable
            onPress={() =>
              navigation.navigate('DetailLieu', {lieu: item.item1})
            }>
            <Shadow
              style={
                index % 2 == 0 ? styles.imageContainer1 : styles.imageContainer2
              }>
              <Image
                style={index % 2 == 0 ? styles.image1 : styles.image2}
                source={{uri: item.item1.urlImage}}
              />
              <Text style={styles.name}>{item.item1.name}</Text>
            </Shadow>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('DetailLieu', {lieu: item.item2})
            }>
            <Shadow
              style={
                index % 2 == 0 ? styles.imageContainer2 : styles.imageContainer1
              }>
              <Image
                style={index % 2 == 0 ? styles.image2 : styles.image1}
                source={{uri: item.item2.urlImage}}
              />
              <Text style={styles.name}>{item.item2.name}</Text>
            </Shadow>
          </Pressable>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingLeft: wp(5),
    paddingBottom: wp(4),
  },
  imageContainer1: {
    marginRight: wp(5),
    marginTop: wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    borderRadius: wp(5),
    width: wp(48),
    height: wp(50),
  },
  imageContainer2: {
    marginRight: wp(5),
    marginTop: wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    width: wp(48),
    height: wp(30),
    borderRadius: wp(5),
  },
  image1: {
    width: wp(48),
    height: wp(50),
    borderRadius: wp(5),
  },
  image2: {
    width: wp(48),
    height: wp(30),
    borderRadius: wp(5),
  },
  center: {
    alignItems: 'center',
  },
  name: {
    position: 'absolute',
    fontSize: wp(3.2),
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    bottom: wp(2),
    left: wp(2),
    backgroundColor: '#00000080',
    padding: wp(0.5),
    paddingHorizontal: wp(1),
    borderRadius: wp(2),
  },
});

export default CustomFlatList;
