import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Planning from '../../components/ShowTrip/Planning';
import Lieux from '../../components/ShowTrip/Lieux';
import {Context as TripContext} from '../../context/TripContext';

const TravelDetailScreen = ({navigation}) => {
  const {state: tripState, startRouting} = useContext(TripContext);
  const trip = tripState.tripList[tripState.selectedTrip];
  const [index, setIndex] = useState(0);

  console.log(trip.places);

  const routes = [
    {key: 'lieux', title: 'Lieux'},
    {key: 'planning', title: 'Planning'},
  ];

  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor={'transparent'}
      renderLabel={({route}) => (
        <Text style={[styles.titleTab]}>{route.title}</Text>
      )}
      tabStyle={styles.tabStyle}
      indicatorStyle={{
        backgroundColor: '#1c3052',
        width: wp(30),
        marginLeft: wp(10),
      }}
      style={{backgroundColor: 'transparent'}}
    />
  );

  const renderScene = SceneMap({
    lieux: () => <Lieux trip={trip} navigation={navigation} />,
    planning: () => <Planning trip={trip} />,
  });

  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <SafeAreaView>
          <Pressable
            onPress={() =>
              navigation.navigate('TravelStack', {screen: 'SelectTravel'})
            }>
            <Icon name="chevron-back" size={wp(8)} />
          </Pressable>
          <Text style={styles.title}>{`Voyage\n${trip.name}`}</Text>
          <View style={styles.firstLine}>
            <TouchableOpacity onPress={() => navigation.navigate('ShowTravel')}>
              <View style={styles.round}>
                <Icon name="map" size={wp(6.5)} />
              </View>
              <Text style={styles.buttonTitle}>Afficher le voyage</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity
              onPress={() =>
                startRouting(tripState.tripList, tripState.selectedTrip)
              }>
              <View style={styles.round}>
                <Icon name="flag" size={wp(6.5)} />
              </View>
              <Text style={styles.buttonTitle}>
                Lancer la planification automatique
              </Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity>
              <View style={styles.round}>
                <Icon name="trash" size={wp(6.5)} />
              </View>
              <Text style={styles.buttonTitle}>Supprimer le voyage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secondLine}>
            <TabView
              swipeEnabled={false}
              renderTabBar={renderTabBar}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: wp(100)}}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginTop: wp(2),
    fontSize: wp(7),
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(15),
    marginTop: wp(7),
  },
  round: {
    backgroundColor: '#f2f2f2',
    width: wp(15),
    height: wp(15),
    marginLeft: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(10),
  },
  space: {
    width: wp(10),
  },
  buttonTitle: {
    marginTop: wp(1),
    fontSize: wp(3),
    width: wp(20),
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  secondLine: {
    marginTop: wp(5),
    height: hp(57),
  },
  titleTab: {
    color: '#1c3052',
    fontSize: wp(4.5),
    margin: 0,
    fontFamily: 'Montserrat-Medium',
  },
  tabStyle: {
    width: wp(50),
    margin: 0,
  },
});

export default TravelDetailScreen;
