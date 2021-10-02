import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ScreenTitle = ({title1, title2}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title1}>{title1}</Text>
        <Text style={styles.title2}>{title2}</Text>
      </View>
      <Shadow style={styles.shadow}>
        <Image
          style={styles.profil}
          source={{
            uri: 'https://img-19.ccm2.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg',
          }}
        />
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title1: {
    fontSize: wp(6),
    lineHeight: wp(8),
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat-Medium',
  },
  title2: {
    fontSize: wp(6.5),
    alignSelf: 'flex-start',
    lineHeight: wp(6.5),
    fontFamily: 'Montserrat-SemiBold',
  },
  profil: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(8),
  },
  shadow: {
    borderRadius: wp(8),
    width: wp(13),
    height: wp(13),
    shadowOpacity: 0.8,
    shadowColor: 'grey',
    shadowRadius: wp(1),
    backgroundColor: 'white',
  },
});

export default ScreenTitle;
