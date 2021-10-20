import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Layout from '../../components/CreateTrip/Layout';

const CreateTravelScreen = () => {
  return (
    <Layout>
      <Text>TEST</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: wp(13),
  },
});

export default CreateTravelScreen;
