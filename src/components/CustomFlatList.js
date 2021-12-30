import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const CustomFlatList = ({data, navigation, onEndReached, listRef}) => {
  return (
    <FlatList
      ref={listRef}
      onEndReached={onEndReached}
      contentContainerStyle={styles.list}
      onEndReachedThreshold={0.6}
      overScrollMode="never"
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={item => item.item1.name + Date.now()}
      data={data}
      renderItem={({item, index}) => {
        console.log(item);
        return (
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate('DetailLieu', {lieu: item.item1})
              }>
              <Image
                style={index % 2 == 0 ? styles.image1 : styles.image2}
                source={{
                  uri: item.item1.images
                    ? item.item1.images.mobile
                    : 'http://www.ibrisco.com/img/not-available.png',
                }}
              />
              <LinearGradient
                locations={index % 2 == 0 ? [0.5, 1.0] : [0.2, 1.0]}
                colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.9)']}
                style={
                  index % 2 == 0
                    ? styles.linearGradient1
                    : styles.linearGradient2
                }></LinearGradient>

              <Text style={styles.name}>{item.item1.name}</Text>
            </Pressable>
            {item.item2 ? (
              <Pressable
                onPress={() =>
                  navigation.navigate('DetailLieu', {lieu: item.item2})
                }>
                <Image
                  style={index % 2 == 0 ? styles.image2 : styles.image1}
                  source={{
                    uri: item.item2.images
                      ? item.item2.images.mobile
                      : 'http://www.ibrisco.com/img/not-available.png',
                  }}></Image>
                <LinearGradient
                  locations={index % 2 == 0 ? [0.2, 1.0] : [0.5, 1.0]}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
                  style={
                    index % 2 == 0
                      ? styles.linearGradient2
                      : styles.linearGradient1
                  }></LinearGradient>
                <Text style={styles.name}>{item.item2.name}</Text>
              </Pressable>
            ) : null}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: wp(5),
  },
  image1: {
    position: 'relative',
    width: wp(43.5),
    height: wp(50),
    borderRadius: wp(5),
    marginBottom: wp(3),
    backgroundColor: '#1c3052a4',
  },
  image2: {
    position: 'relative',
    width: wp(43.5),
    height: wp(30),
    borderRadius: wp(5),
    marginBottom: wp(3),
    backgroundColor: '#1c3052a4',
  },
  name: {
    position: 'absolute',
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    bottom: wp(6),
    right: wp(2),
    padding: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(3),
  },
  linearGradient1: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    width: wp(43.5),
    height: wp(50),
    borderRadius: wp(5),
    marginBottom: wp(3),
  },
  linearGradient2: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    width: wp(43.5),
    height: wp(30),
    borderRadius: wp(5),
    marginBottom: wp(3),
  },
});

export default CustomFlatList;
