import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';

const WaitSignScreen = () => {
  console.log('test');
  const { tryLocalSignIn } = useContext(AuthContext);
  tryLocalSignIn();

  return(
    <View />
  )
}

export default WaitSignScreen;