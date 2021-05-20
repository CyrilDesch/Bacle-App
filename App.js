import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import HomeScreen from './src/screens/HomeScreen';
import TravelScreen from './src/screens/TravelScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import WaitSignScreen from './src/screens/Auth/WaitSignScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import NavigationRef from './src/navigationRef';

const authNavigator = createStackNavigator({
  WaitSign: WaitSignScreen,
  SignUp: SignupScreen,
  SignIn: SigninScreen
})

const bottomBarNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Travel: TravelScreen,
  Search: SearchScreen,
  Profil: ProfilScreen
});

const appNavigator = createSwitchNavigator({
  Auth: authNavigator,
  Main: bottomBarNavigator
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

const App = createAppContainer(appNavigator);
export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return(
    <SafeAreaProvider>
      <AuthProvider>
        <App ref={NavigationRef.setNavigator} />
      </AuthProvider> 
    </SafeAreaProvider>
  );
};
