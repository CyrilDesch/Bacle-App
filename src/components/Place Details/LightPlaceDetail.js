import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const LightPlaceDetail = ({style, placeData, backButtonAction}) => {

  return (
    <View style={{...styles.infoCard, ...style}}>
      {(backButtonAction !== null)
        ? <Button
            title="←"
            onPress={backButtonAction}
          />
        : null
      }
      <Text>
        {placeData.display_name.split(',')[0]} à
        {placeData.display_name.split(',')[4]}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: 'white',
    borderRadius: wp(4),
    height: wp(30),
    width: wp(90),
    padding: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }
});


export default LightPlaceDetail;
