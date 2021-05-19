import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import HomeScreen from './src/screens/HomeScreen';
import TravelScreen from './src/screens/TravelScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfilScreen from './src/screens/ProfilScreen';

const bottomBarNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Travel: TravelScreen,
  Search: SearchScreen,
  Profil: ProfilScreen
});

const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
  });
};

const App = createAppContainer(bottomBarNavigator);
export default () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return(
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return(
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};
