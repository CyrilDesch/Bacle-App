import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import TravelScreen from './src/screens/TravelScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import DetailLieuScreen from './src/screens/DetailLieuScreen';
import WaitSignScreen from './src/screens/Auth/WaitSignScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import NavigationRef from './src/navigationRef';
import Icon from 'react-native-vector-icons/AntDesign';

const authNavigator = createStackNavigator({
  WaitSign: WaitSignScreen,
  SignUp: SignupScreen,
  SignIn: SigninScreen,
});

const homeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    DetailLieu: DetailLieuScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: 'false',
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" size={wp(8)} color={tintColor} />
      ),
    },
  },
);

const travelStackNavigator = createStackNavigator(
  {
    Travel: TravelScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: 'false',
      tabBarIcon: ({tintColor}) => (
        <Icon name="find" size={wp(8)} color={tintColor} />
      ),
    },
  },
);

const searchStackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: 'false',
      tabBarIcon: ({tintColor}) => (
        <Icon name="search1" size={wp(8)} color={tintColor} />
      ),
    },
  },
);

const profilStackNavigator = createStackNavigator(
  {
    Profil: ProfilScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: 'false',
      tabBarIcon: ({tintColor}) => (
        <Icon name="user" size={wp(8)} color={tintColor} />
      ),
    },
  },
);

const bottomBarNavigator = createBottomTabNavigator(
  {
    HomeStack: homeStackNavigator,
    TravelStack: travelStackNavigator,
    SearchStack: searchStackNavigator,
    ProfilStack: profilStackNavigator,
  },
  {
    tabBarOptions: {
      style: {
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        height: wp(15),
        position: 'absolute',
        bottom: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,

        elevation: 19,
        backgroundColor: 'white',
        borderTopWidth: 0,
      },
      showLabel: false,
      inactiveTintColor: '#c5c5c5',
      activeTintColor: '#327fa0',
    },
  },
);

const appNavigator = createSwitchNavigator({
  Auth: authNavigator,
  Main: bottomBarNavigator,
});

const App = createAppContainer(appNavigator);
export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <App ref={NavigationRef.setNavigator} />
      </AuthProvider>
    </SafeAreaProvider>
  );
};
