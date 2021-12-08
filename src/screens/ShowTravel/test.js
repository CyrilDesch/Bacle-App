import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const LieuxRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const PlanningRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const InfosRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderTabBar = props => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color, margin: 8 }}>
        {route.title}
      </Text>
    )}
    indicatorStyle={{ backgroundColor: 'blue' }}
    style={{ backgroundColor: 'transparent'}}
  />
);

const renderScene = SceneMap({
  lieux: LieuxRoute,
  planning: PlanningRoute,
  infos: InfosRoute
});

function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const routes = [
    { key: "lieux", title: "Lieux" },
    { key: "planning", title: "Planning" },
    { key: "infos", title: "Infos" }
  ];
  return (
    <View>
      <Text style={styles.title}>{`Voyage\nParis`}</Text>
      <View style={styles.firstLine}>
        <TouchableOpacity>
          <View style={styles.round}></View>
          <Text style={styles.buttonTitle}>Itinéraire vers la ville</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.round}></View>
          <Text style={styles.buttonTitle}>Démarrer le voyage</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.round}></View>
          <Text style={styles.buttonTitle}>Supprimer le voyage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondLine}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: wp(4),
    fontSize: wp(7)
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: wp(15),
    marginTop: wp(5)
  },
  round: {
    backgroundColor: "#e3e3e3",
    width: wp(15),
    height: wp(15),
    borderRadius: wp(10)
  },
  buttonTitle: {
    marginTop: wp(1),
    fontSize: wp(3),
    width: wp(15),
    textAlign: "center"
  },
  secondLine: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: wp(15),
    marginTop: wp(5)
  }
});

export default App;
