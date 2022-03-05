import React from 'react';
import {ScrollView, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ShowDocScreen = ({route, navigation}) => {
  let text = '';
  switch(route.params.doc){
    case 'PDC':
      text = require('../../../doc/politique_confidentialite.json').text
      break;
    case 'CGT':
      text = require('../../../doc/condition_general_utilisation.json').text
      break;
    case 'CREDIT':
      text = require('../../../doc/credit.json').text
      break;
  }

  return (
    <SafeAreaView>
      <Button title='Retour' onPress={() => navigation.goBack()}/>
      <ScrollView>
        <Text>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowDocScreen;
