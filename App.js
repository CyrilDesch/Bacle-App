import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import HomeScreen from "./src/screens/HomeScreen";
import TravelScreen from "./src/screens/TravelScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfilScreen from "./src/screens/ProfilScreen";
import DetailLieuScreen from "./src/screens/DetailLieuScreen";
import WaitSignScreen from "./src/screens/Auth/WaitSignScreen";
import SigninScreen from "./src/screens/Auth/SigninScreen";
import SignupScreen from "./src/screens/Auth/SignupScreen";
import NavigationRef from "./src/navigationRef";
import Icon from "react-native-vector-icons/AntDesign";

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
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={wp(8)} color={tintColor} />
      ),
    },
  }
);

const travelStackNavigator = createStackNavigator(
  {
    Travel: TravelScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="find" size={wp(8)} color={tintColor} />
      ),
    },
  }
);

const searchStackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="search1" size={wp(8)} color={tintColor} />
      ),
    },
  }
);

const profilStackNavigator = createStackNavigator(
  {
    Profil: ProfilScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={wp(8)} color={tintColor} />
      ),
    },
  }
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
      showLabel: false,
      inactiveTintColor: "#c5c5c5",
      activeTintColor: "#327fa0",
    },
  }
);

const appNavigator = createSwitchNavigator({
  Auth: authNavigator,
  Main: bottomBarNavigator,
});

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
  });
};

const App = createAppContainer(appNavigator);
export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <App ref={NavigationRef.setNavigator} />
      </AuthProvider>
    </SafeAreaProvider>
  );
};
