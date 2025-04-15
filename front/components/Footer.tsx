import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

type DrawerParamList = {
  OpenStreetMaps: undefined;
  Home: undefined;
};

const Footer = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("OpenStreetMaps")}
      >
        <Ionicons name="map" size={24} color="#fff" />
        <Text style={styles.footerText}>Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={24} color="#fff" />
        <Text style={styles.footerText}>Home</Text>
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
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginTop: 6,
  },
});

export default Footer;
