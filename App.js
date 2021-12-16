import React, {useContext, useEffect, useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';

import ShowTravelScreen from './src/screens/ShowTravel/ShowTravelScreen';
import TravelDetailScreen from './src/screens/ShowTravel/TravelDetailScreen';
import SelectTravelScreen from './src/screens/ShowTravel/SelectTravelScreen';

import CreateTravelScreen from './src/screens/CreateTravel/CreateTravelScreen';

import SearchScreen from './src/screens/Search/SearchScreen';
import AddPlaceToTripScreen from './src/screens/Search/AddPlaceToTripScreen';

import ProfilScreen from './src/screens/ProfilScreen';

import DetailLieuScreen from './src/screens/DetailLieuScreen';

import SigninScreen from './src/screens/Auth/SigninScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import WaitScreen from './src/screens/Auth/WaitScreen';

import {navigationRef} from './src/navigationRef';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from './src/context/AuthContext';
import {Provider as TripProvider} from './src/context/TripContext';
import {
  Context as UserContext,
  Provider as UserProvider,
} from './src/context/UserContext';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <AuthStack.Screen name="SignUp" component={SignupScreen} />
      <AuthStack.Screen name="SignIn" component={SigninScreen} />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const TravelStack = createNativeStackNavigator();
const CreateTravelStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="DetailLieu" component={DetailLieuScreen} />
    </HomeStack.Navigator>
  );
};

const TravelStackScreen = () => {
  return (
    <TravelStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <TravelStack.Screen name="SelectTravel" component={SelectTravelScreen} />
      <TravelStack.Screen name="TravelDetail" component={TravelDetailScreen} />
      <TravelStack.Screen name="ShowTravel" component={ShowTravelScreen} />
    </TravelStack.Navigator>
  );
};

const CreateTravelStackScreen = () => {
  return (
    <CreateTravelStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <CreateTravelStack.Screen
        name="CreateTravel"
        component={CreateTravelScreen}
      />
    </CreateTravelStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={({route}) => {
        console.log(route);
        return {
          tabBarVisible: true,
          headerShown: false,
          gestureEnabled: false,
        };
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="AddPlaceToTrip"
        component={AddPlaceToTripScreen}
      />
    </SearchStack.Navigator>
  );
};

const ProfilStackScreen = () => {
  return (
    <ProfilStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <ProfilStack.Screen name="Profil" component={ProfilScreen} />
    </ProfilStack.Navigator>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
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
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#c5c5c5',
        tabBarActiveTintColor: '#1c3052',
        tabBarIcon: ({color}) => {
          let iconName;
          switch (route.name) {
            case 'HomeStack':
              iconName = 'home';
              break;
            case 'TravelStack':
              iconName = 'find';
              break;
            case 'CreateTravelStack':
              iconName = 'pluscircleo';
              break;
            case 'SearchStack':
              iconName = 'search1';
              break;
            case 'ProfilStack':
              iconName = 'user';
              break;
          }
          return <Icon name={iconName} size={wp(7.5)} color={color} />;
        },
        headerShown: false,
        gestureEnabled: false,
        lazy: true,
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="TravelStack" component={TravelStackScreen} />
      <Tab.Screen
        options={{
          tabBarStyle: {display: 'none'},
          unmountOnBlur: true,
          lazy: false,
        }}
        name="CreateTravelStack"
        component={CreateTravelStackScreen}
      />
      <Tab.Screen name="SearchStack" component={SearchStackScreen} />
      <Tab.Screen name="ProfilStack" component={ProfilStackScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const {tryLocalSignIn, state: auth} = useContext(AuthContext);
  const {saveUser} = useContext(UserContext);

  const [launchFinish, setlaunchFinish] = useState(false);
  useEffect(() => {
    tryLocalSignIn({saveUser});
    setTimeout(() => {
      setlaunchFinish(true);
    }, 2000);
  }, []);

  if (auth.localLoading || !launchFinish) {
    return <WaitScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        {auth.token && auth.token !== '' ? (
          <AppStack.Screen name="Tab" component={TabScreen} />
        ) : (
          <AppStack.Screen name="AuthStack" component={AuthStackScreen} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <UserProvider>
          <TripProvider>
            <App />
          </TripProvider>
        </UserProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};
