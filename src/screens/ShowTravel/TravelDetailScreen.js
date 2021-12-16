import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {Context as TripContext} from '../../context/TripContext';

const TravelDetailScreen = ({navigation}) => {
  const {state: tripState} = useContext(TripContext);
  const trip = tripState.tripList[tripState.selectedTrip];
  const [index, setIndex] = useState(0);
  const routes = [
    {key: 'lieux', title: 'Lieux'},
    {key: 'planning', title: 'Planning'},
    {key: 'infos', title: 'Infos'},
  ];

  const LieuxRoute = () => (
    <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <Pressable onPress={() => navigation.navigate('SearchStack')}>
            <Text style={styles.buttonAddPlace}>+ Ajouter un lieu</Text>
          </Pressable>
        }
        contentContainerStyle={{padding: wp(5)}}
        keyExtractor={item =>
          item.name + item.localization + new Date().toDateString()
        }
        data={trip.places}
        renderItem={({item, index}) => (
          <Text style={styles.itemListPlace}>{item.name}</Text>
        )}
        ListEmptyComponent={
          <Text style={styles.textEmpty}>Aucun lieu ajouté</Text>
        }
      />
    </View>
  );

  const PlanningRoute = () => (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Text style={styles.textEmpty}>Indisponible</Text>
    </View>
  );

  const InfosRoute = () => (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Text style={styles.textEmpty}>Indisponible</Text>
    </View>
  );

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

  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <SafeAreaView>
          <Pressable onPress={() => navigation.goBack()}>
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
    width: wp(33),
    margin: 0,
  },
  textEmpty: {
    alignSelf: 'center',
    color: '#9f9f9f',
    fontSize: wp(4.5),
    marginTop: hp(10),
    fontFamily: 'Montserrat-Medium',
  },
  buttonAddPlace: {
    marginBottom: wp(3),
    backgroundColor: '#1c3052',
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
    borderRadius: wp(2),
    alignSelf: 'center',
    color: 'white',
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-Regular',
  },
  itemListPlace: {
    marginBottom: wp(3),
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    borderRadius: wp(2),
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
});

export default TravelDetailScreen;
