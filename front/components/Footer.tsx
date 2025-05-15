import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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
        <Ionicons name="map" size={32} color="#fff" />
        <Text style={styles.footerText}>Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={32} color="#fff" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Statistics")}
      >
        <Ionicons name="stats-chart" size={32} color="#fff" />
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
    height: 100,
    position: "absolute",
    bottom: 35,
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
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-regular",
    marginTop: 8,
  },
});

export default Footer;
