import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Planning = ({trip}) => (
  <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
    <FlatList
      overScrollMode="never"
      contentContainerStyle={{
        paddingHorizontal: wp(5),
        paddingBottom: hp(4),
      }}
      keyExtractor={item => item._id}
      data={trip.days}
      renderItem={({item: day, index}) => (
        <>
          <Text style={styles.sectionTitle}>Jour {index + 1}</Text>
          <View style={styles.card}>
            <FlatList
              scrollEnabled={false}
              keyExtractor={item => item._id}
              data={day.places}
              renderItem={({item: place, index}) => (
                <>
                  {place.name ? (
                    <View style={styles.item}>
                      <View
                        style={[
                          styles.line,
                          index == 1
                            ? {
                                height: wp(7),
                                alignSelf: 'flex-end',
                              }
                            : {},
                          index == day.places.length - 1
                            ? index != 1
                              ? {
                                  height: wp(7),
                                  alignSelf: 'flex-start',
                                }
                              : {
                                  height: wp(0),
                                }
                            : {},
                        ]}
                      />
                      <View style={styles.circle}>
                        <View style={styles.innerCircle} />
                      </View>
                      <Text style={styles.itemListPlace}>{place.name}</Text>
                    </View>
                  ) : null}
                </>
              )}
            />
          </View>
        </>
      )}
      ListEmptyComponent={
        <Text style={styles.textEmpty}>
          Ajouter un lieu au voyage et lancer la planification automatique
        </Text>
      }
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: wp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
  },
  itemListPlace: {
    paddingHorizontal: wp(4),
    paddingLeft: wp(6.5),
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
  textEmpty: {
    textAlign: 'center',
    color: '#9f9f9f',
    fontSize: wp(4.5),
    marginTop: hp(10),
    fontFamily: 'Montserrat-Medium',
  },
  sectionTitle: {
    fontSize: wp(5),
    paddingTop: wp(3.5),
    paddingBottom: wp(2),
    marginLeft: wp(0.5),
    fontFamily: 'Montserrat-SemiBold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(14),
    marginLeft: wp(4),
  },
  line: {
    height: wp(14),
    borderLeftWidth: wp(0.8),
    borderLeftColor: 'black',
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(6.5),
    height: wp(6.5),
    borderRadius: wp(3),
    left: -wp(3),
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: wp(0.7),
    borderColor: '#1c3052',
  },
  innerCircle: {
    backgroundColor: '#1c3052',
    width: wp(4),
    height: wp(4),
    borderRadius: wp(3),
  },
});

export default Planning;
