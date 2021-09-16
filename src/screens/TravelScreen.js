import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import Carousel from "react-native-snap-carousel";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map/Map";
import Icon from "react-native-vector-icons/AntDesign";

// Contient une petite carte avec des balises reliées entre elles (pour simuler un trajet)
const TravelScreen = () => {
  const carouselRef = useRef();
  const [currentMarkerFocus, setCurrentMarkerFocus] = useState(0);
  const circuit = require("../../customData.json").circuit;

  // Permet de récupérer uniquement les latitudes et longitudes (sous forme d'objet LatLng) depuis une liste de points géographiques d'OpenStreetMap
  const getLatLng = (placeList) => {
    const output = [];
    for (let i = 0; i < placeList.length; i++) {
      if (placeList[i].lat && placeList[i].lon) {
        output.push({
          latitude: Number(placeList[i].lat),
          longitude: Number(placeList[i].lon),
        });
      }
    }
    return output;
  };

  const steps = getLatLng(circuit);

  return (
    <SafeAreaView style={styles.container}>
      {steps ? (
        <Map
          style={styles.map}
          steps={steps}
          data={circuit}
          currentMarkerFocus={currentMarkerFocus}
        />
      ) : null}
      <View style={styles.slider}>
        <Carousel
          onSnapToItem={(index) => setCurrentMarkerFocus(index)}
          ref={carouselRef}
          data={circuit}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.imageElevation}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg",
                    }}
                  />
                </View>
                <View style={styles.firstLine}>
                  <Icon name="star" size={wp(5)} color="#ffbe00" />
                  <Text style={styles.textNote}>4 sur 5</Text>
                </View>
                <View style={styles.secondLine}>
                  <Text style={styles.title}>
                    {item.display_name.split(",")[0]}
                  </Text>
                  <Text style={styles.type}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          layout={"stack"}
          layoutCardOffset={18}
          sliderWidth={wp(100)}
          itemWidth={wp(80)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: wp(10),
    fontFamily: "Montserrat-Bold",
  },
  map: {
    width: wp(100),
    height: hp(100),
  },
  slider: {
    position: "absolute",
    bottom: wp(5),
    alignSelf: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: wp(4),
    height: wp(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContainer: {
    marginTop: wp(10),
    padding: wp(2),
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(4),
  },
  imageElevation: {
    position: "absolute",
    borderRadius: wp(4),
    top: -wp(7),
    left: wp(6),
    zIndex: 10,
    backgroundColor: "#ebebeb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: wp(2),
    marginRight: wp(6),
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: wp(4),
  },
  type: {
    fontFamily: "Montserrat-Medium",
    fontSize: wp(3),
    color: "#a5a5a5",
  },
  secondLine: {
    marginTop: wp(10),
    marginLeft: wp(6),
  },
  textNote: {
    marginLeft: wp(1.5),
    fontFamily: "Montserrat-SemiBold",
    fontSize: wp(3.5),
  },
});

export default TravelScreen;
