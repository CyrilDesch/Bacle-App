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
import {Context as TripContext} from '../../context/TripContext';

const LieuxRoute = () => (
  <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
    <FlatList
      contentContainerStyle={{padding: wp(5)}}
      keyExtractor={item => item._id}
      data={tripState.listTrips}
      renderItem={({item, index}) => (
        <View>
          <Pressable
            onPress={() => {
              selectTrip(index);
              navigation.navigate('TravelDetail');
            }}>
            <Text>NOM DU VOYAGE: {item.name}</Text>
          </Pressable>
        </View>
      )}
    />
  </View>
);

const PlanningRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const InfosRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

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
      width: wp(22),
      marginLeft: wp(5.7),
    }}
    style={{backgroundColor: 'transparent'}}
  />
);

const renderScene = SceneMap({
  lieux: LieuxRoute,
  planning: PlanningRoute,
  infos: InfosRoute,
});

const TravelDetailScreen = ({navigation}) => {
  const {state: tripState} = useContext(TripContext);
  const trip = tripState.listTrips[tripState.selectedTrip];
  const [index, setIndex] = useState(0);
  const routes = [
    {key: 'lieux', title: 'Lieux'},
    {key: 'planning', title: 'Planning'},
    {key: 'infos', title: 'Infos'},
  ];

  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <SafeAreaView>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={wp(8)} />
          </Pressable>
          <Text style={styles.title}>{`Voyage\n${trip.name}`}</Text>
          <View style={styles.firstLine}>
            <TouchableOpacity>
              <View style={styles.round}>
                <Icon name="map" size={wp(6.5)} />
              </View>
              <Text style={styles.buttonTitle}>Afficher le voyage</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity>
              <View style={styles.round}>
                <Icon name="flag" size={wp(6.5)} />
              </View>
              <Text style={styles.buttonTitle}>Démarrer le voyage</Text>
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
    width: wp(33),
    margin: 0,
  },
});

export default TravelDetailScreen;
