import React from "react";
import { View, StyleSheet } from "react-native";
import OpenStreetMap from "../components/OpenStreetMap";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <OpenStreetMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071025",
  },
});

export default MapScreen;
