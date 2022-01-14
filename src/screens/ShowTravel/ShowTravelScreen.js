import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import PaginationDot from 'react-native-animated-pagination-dot';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TravelMap from '../../components/Map/TravelMap';
import {Context as TripContext} from '../../context/TripContext';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TravelScreen = ({navigation}) => {
  const carouselRef = useRef();
  const [focusedPlaceIndex, setFocusedPlaceIndex] = useState(0);
  const {state: tripState} = useContext(TripContext);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentDayData, setCurrentDayData] = useState(
    tripState.tripList[tripState.selectedTrip].days[currentDay].places.slice(1),
  );
  const inset = useSafeAreaInsets();

  useEffect(() => {
    setCurrentDayData(
      tripState.tripList[tripState.selectedTrip].days[currentDay].places.slice(
        1,
      ),
    );
    setFocusedPlaceIndex(0);
  }, [currentDay]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View style={[styles.buttonBack, {marginTop: inset.top}]}>
        <TouchableOpacity
          style={{zIndex: 1000000}}
          onPress={() => navigation.goBack()}>
          <IoniconsIcon name="chevron-back" color="white" size={wp(6)} />
        </TouchableOpacity>
      </View>
      <TravelMap
        style={styles.map}
        travelData={currentDayData}
        focusedPlaceIndex={focusedPlaceIndex}
      />
      <View style={styles.dayPickerContainer}>
        <TouchableOpacity
          onPress={() =>
            currentDay > 0 ? setCurrentDay(currentDay - 1) : null
          }>
          <View
            style={[
              styles.dayButton,
              currentDay == 0 ? {backgroundColor: 'transparent'} : {},
            ]}>
            <Text
              style={[
                styles.textButton,
                currentDay == 0 ? {color: 'transparent'} : {},
              ]}>
              {'<'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.dayButton}>
          <Text style={styles.textButton}>
            Jour {currentDay + 1}/
            {tripState.tripList[tripState.selectedTrip].days.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            currentDay <
            tripState.tripList[tripState.selectedTrip].days.length - 1
              ? setCurrentDay(currentDay + 1)
              : null
          }>
          <View
            style={[
              styles.dayButton,
              currentDay >=
              tripState.tripList[tripState.selectedTrip].days.length - 1
                ? {backgroundColor: 'transparent'}
                : {},
            ]}>
            <Text
              style={[
                styles.textButton,
                currentDay >=
                tripState.tripList[tripState.selectedTrip].days.length - 1
                  ? {color: 'transparent'}
                  : {},
              ]}>
              {'>'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.slider}>
        <FlatList
          horizontal
          pagingEnabled
          ref={carouselRef}
          data={currentDayData}
          showsHorizontalScrollIndicator={false}
          disableIntervalMomentum
          onMomentumScrollEnd={e => {
            let pageNumber = Math.floor(
              e.nativeEvent.contentOffset.x / wp(99.9),
              0,
            );
            if (focusedPlaceIndex !== pageNumber)
              setFocusedPlaceIndex(pageNumber);
          }}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.cardContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.type}>Vos notes: ...{item.notes}</Text>
                <Text style={styles.address}>{item.displayAddress}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.dotBackground}>
          <PaginationDot
            activeDotColor="#1c3052"
            curPage={focusedPlaceIndex}
            maxPage={currentDayData.length}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(100),
    height: hp(100),
    marginBottom: wp(13),
  },
  text: {
    fontSize: wp(10),
    fontFamily: 'Montserrat-Bold',
  },
  map: {
    width: wp(100),
    height: hp(100),
  },
  slider: {
    position: 'absolute',
    bottom: wp(3.5),
    alignSelf: 'center',
  },
  cardContainer: {
    width: wp(90),
    marginHorizontal: wp(5),
    justifyContent: 'flex-end',
  },
  dotBackground: {
    alignItems: 'center',
    padding: wp(0.2),
    paddingHorizontal: wp(1),
    borderRadius: wp(2),
    backgroundColor: '#FFFFFF90',
    alignSelf: 'center',
  },
  infoCard: {
    position: 'relative',
    marginBottom: wp(2),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: wp(4),
    minHeight: wp(30),
    width: '100%',
    padding: wp(2),
    paddingHorizontal: wp(3.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    width: wp(44),
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(4),
  },
  address: {
    marginTop: wp(1),
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3),
  },
  type: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3),
    color: '#a5a5a5',
  },
  buttonBack: {
    backgroundColor: '#00000080',
    height: wp(8),
    width: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    position: 'absolute',
    top: wp(2),
    left: wp(4),
    zIndex: 1000,
  },
  dayPickerContainer: {
    top: wp(8),
    position: 'absolute',
    flexDirection: 'row',
  },
  dayButton: {
    backgroundColor: '#00000080',
    marginHorizontal: wp(1.5),
    padding: wp(1),
    paddingHorizontal: wp(2.5),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default TravelScreen;
