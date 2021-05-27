import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';

const WaitSignScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return(
    <View />
  )
}

export default WaitSignScreen;