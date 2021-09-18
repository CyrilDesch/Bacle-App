import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFlatList from "../components/CustomFlatList";
import ScreenTitle from "../components/ScreenTitle";

const HomeScreen = ({ navigation }) => {
  const tendanceTemp = require("../../customData.json").tendance;
  let tendanceShow = [];
  for (let i = 0; i < tendanceTemp.length; i++) {
    if (i % 2 == 0) {
      if (tendanceTemp.length - 1 != i)
        tendanceShow.push({
          item1: tendanceTemp[i],
          item2: tendanceTemp[i + 1],
        });
      else tendanceShow.push({ item1: tendanceTemp[i] });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScreenTitle title1="Où" title2="voulez-vous aller ?" />
      <Text style={styles.titleSection}>
        <Text style={styles.bold}>Voyage</Text> Tendance
      </Text>
      <CustomFlatList data={tendanceShow} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
  titleSection: {
    alignSelf: "flex-start",
    fontSize: wp(6),
    marginLeft: wp(5),
    marginTop: wp(5),
    fontFamily: "Montserrat-Medium",
  },
  bold: {
    fontFamily: "Montserrat-Bold",
  },
});

export default HomeScreen;
