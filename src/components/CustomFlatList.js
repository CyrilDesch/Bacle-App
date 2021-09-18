import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Shadow} from 'react-native-neomorph-shadows';
import PaginationDot from 'react-native-animated-pagination-dot';

const CustomFlatList = ({data}) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <FlatList
        horizontal
        contentContainerStyle={styles.list}
        overScrollMode="never"
        onScroll={e => {
          let pageNumber =
            Math.min(
              Math.max(
                Math.floor(e.nativeEvent.contentOffset.x / wp(80) + 0.5) + 1,
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailLieu', {lieu: item.item1})
              }>
              <Shadow
                style={
                  index % 2 == 0
                    ? styles.imageContainer1
                    : styles.imageContainer2
                }>
                <Image
                  style={index % 2 == 0 ? styles.image1 : styles.image2}
                  source={{uri: item.item1.urlImage}}
                />
              </Shadow>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailLieu', {lieu: item.item2})
              }>
              <Shadow
                style={
                  index % 2 == 0
                    ? styles.imageContainer2
                    : styles.imageContainer1
                }>
                <Image
                  style={index % 2 == 0 ? styles.image2 : styles.image1}
                  source={{uri: item.item2.urlImage}}
                />
              </Shadow>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.center}>
        <PaginationDot
          activeDotColor="#f96f2d"
          curPage={currentPage}
          maxPage={data.length < 10 ? data.length : 10}
          sizeRatio={0.1}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingLeft: wp(5),
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
    width: wp(43),
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
    width: wp(43),
    height: wp(30),
    borderRadius: wp(5),
  },
  image1: {
    width: wp(43),
    height: wp(50),
    borderRadius: wp(5),
  },
  image2: {
    width: wp(43),
    height: wp(30),
    borderRadius: wp(5),
  },
  center: {
    width: wp(100),
    justifyContent: 'center',
  },
});

export default CustomFlatList;
