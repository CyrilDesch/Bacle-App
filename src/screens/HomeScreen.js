import trackerApi from '../api/tracker';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {StyleSheet, Text, StatusBar, View, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomFlatList from '../components/CustomFlatList';
import {Context as TripContext} from '../context/TripContext';

const HomeScreen = ({navigation}) => {
  const scrollList = useRef(null);
  const [indexSelectedSection, setIndexSelectedSection] = useState(0);
  const sectionList = ['Tout', 'France', 'Angleterre', 'Espagne', 'Italie'];
  const sectionListCode = ['', 'fr', 'gb', 'es', 'it'];
  const [tendanceTemp, setTendanceTemp] = useState([]);
  let tendanceShow = [];

  const getTendance = async clear => {
    const resp = await trackerApi.get(
      `/suggestion?limit=20${
        sectionListCode[indexSelectedSection] != ''
          ? '&country_code=' + sectionListCode[indexSelectedSection]
          : ''
      }`,
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    );
    if (clear) {
      setTendanceTemp(resp.data.suggestions);
    } else {
      setTendanceTemp([...tendanceTemp, ...resp.data.suggestions]);
    }
  };

  useEffect(() => {
    getTendance(true);
  }, [indexSelectedSection]);

  const {getTrips} = useContext(TripContext);
  useEffect(() => {
    getTrips();
  }, []);

  for (let i = 0; i < tendanceTemp.length; i++) {
    if (i % 2 == 0) {
      if (tendanceTemp.length - 1 != i) {
        tendanceShow.push({
          item1: tendanceTemp[i],
          item2: tendanceTemp[i + 1],
        });
      } else tendanceShow.push({item1: tendanceTemp[i]});
    }
  }

  const onEndReached = () => {
    getTendance(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View>
        <Text style={styles.title}>
          À la recherche d'une nouvelle destination ?
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: wp(5)}}
          horizontal
          data={sectionList}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                scrollList.current.scrollToIndex({index: 0});
                setIndexSelectedSection(index);
              }}>
              <View
                style={[
                  styles.containerSectionTitle,
                  indexSelectedSection == index
                    ? {
                        backgroundColor: '#1c3052',
                      }
                    : {},
                ]}>
                <Text
                  style={[
                    styles.sectionTitle,
                    indexSelectedSection == index
                      ? {
                          color: 'white',
                        }
                      : {},
                  ]}>
                  {item}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.tripList}>
        <CustomFlatList
          listRef={scrollList}
          data={tendanceShow}
          navigation={navigation}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: wp(6.5),
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    fontFamily: 'Montserrat-Bold',
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Medium',
    color: '#2C2628',
    fontSize: wp(3.25),
    paddingHorizontal: wp(3.5),
    paddingVertical: wp(2),
  },
  containerSectionTitle: {
    backgroundColor: '#E3E3E3',
    borderRadius: wp(5),
    marginRight: wp(2),
  },
  tripList: {
    marginTop: wp(4),
    flex: 1,
    marginBottom: hp(10),
  },
});

export default HomeScreen;
