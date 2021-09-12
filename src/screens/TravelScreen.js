import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Carousel from "react-native-snap-carousel";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map/Map";
import { Button } from "react-native";

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

  useEffect(() => {
    const getImage = async (lat, long, name) => {
      let url = "https://fr.wikipedia.org/w/api.php"; // VERSION FRANCAISE

      const params = {
        action: "query",
        generator: "geosearch",
        prop: "coordinates|pageimages",
        ggscoord: `${lat}|${long}`,
        format: "json",
      };

      url = url + "?origin=*";
      Object.keys(params).forEach(function (key) {
        url += "&" + key + "=" + params[key];
      });

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          const pages = Object.values(response.query.pages);
          let page = 0;

          const words = name.toLowerCase().split(" ");
          const counts = []; // MAP ERREUR
          while (page < pages.length) {
            words.forEach((word) => {
              if (pages[page].title.includes(word))
                counts[page] = counts[page] + 1;
            });
            console.log(counts);
            if (pages[page] && pages[page].thumbnail) {
              //console.log(name);
              /*console.log(
                pages[page].title + ": " + pages[page].thumbnail.source
              );*/
            } else {
              console.log("test");
            }
            page++;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    circuit.forEach((element) => {
      getImage(element.lat, element.lon, element.display_name.split(",")[0]);
    });
  }, []);

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
          ref={carouselRef}
          data={circuit}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.display_name.split(",")[0]}</Text>
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
    borderRadius: wp(5),
    width: wp(80),
    height: wp(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    margin: wp(2),
  },
});

export default TravelScreen;
