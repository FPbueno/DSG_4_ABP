import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

type DrawerParamList = {
  Map: undefined;
  Home: undefined;
  Statistics: undefined;
};

const Footer = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Map")}
      >
        <Ionicons name="map" size={28} color="#fff" />
        <Text style={styles.footerText}>Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={28} color="#fff" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Statistics")}
      >
        <Ionicons name="stats-chart" size={28} color="#fff" />
        <Text style={styles.footerText}>Estatísticas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0A2463",
    height: Platform.OS === "ios" ? 70 : 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingBottom: Platform.OS === "ios" ? 15 : 10,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  footerText: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 12 : 14,
    fontFamily: "poppins-regular",
    marginTop: 4,
  },
});

export default Footer;
