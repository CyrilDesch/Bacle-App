import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import {FlatList, Image, StyleSheet, View, Text, Linking} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const CustomFlatList = ({data, navigation, onEndReached, listRef}) => {
  const [endList, setEndList] = useState(false);
  useEffect(() => {
    if (data.length % 10 == 0) {
      setEndList(false);
    } else {
      setEndList(true);
    }
  }, [data]);
  return (
    <FlatList
      ref={listRef}
      onEndReached={() => {
        if (data.length % 10 == 0) {
          onEndReached();
        }
      }}
      contentContainerStyle={styles.list}
      ListFooterComponentStyle={{paddingBottom: wp(3), paddingTop: wp(1)}}
      ListFooterComponent={
        !endList ? (
          <ActivityIndicator size="large" color="#999999" />
        ) : (
          <Text style={styles.text}>Terminé</Text>
        )
      }
      onEndReachedThreshold={0.5}
      overScrollMode="never"
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={item => item.item1.name + Date.now()}
      data={data}
      renderItem={({item, index}) => {
        return (
          <View>
            <Pressable
              onPress={async () => {
                const supported = await Linking.canOpenURL(
                  `https://google.com/search?q=${item.item1.name}+sites+touristiques`,
                );

                if (supported) {
                  await Linking.openURL(
                    `https://google.com/search?q=${item.item1.name}+sites+touristiques`,
                  );
                } else {
                  console.log("Impossible d'ouvrir");
                }
              }}>
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
                onPress={async () => {
                  const supported = await Linking.canOpenURL(
                    `https://google.com/search?q=${item.item2.name}+sites+touristiques`,
                  );

                  if (supported) {
                    await Linking.openURL(
                      `https://google.com/search?q=${item.item2.name}+sites+touristiques`,
                    );
                  } else {
                    console.log("Impossible d'ouvrir");
                  }
                }}>
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
  text: {
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-Medium',
    color: '#999999',
    textAlign: 'center',
  },
});

export default CustomFlatList;
