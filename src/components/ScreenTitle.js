import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ScreenTitle = ({ title1, title2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>{title1}</Text>
      <Text style={styles.title2}>{title2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    marginLeft: wp(10),
    marginTop: wp(2),
  },
  title1: {
    fontSize: wp(6),
    lineHeight: wp(8),
    alignSelf: "flex-start",
    fontFamily: "Montserrat-Medium",
  },
  title2: {
    fontSize: wp(6.5),
    alignSelf: "flex-start",
    lineHeight: wp(6.5),
    fontFamily: "Montserrat-SemiBold",
  },
});

export default ScreenTitle;
