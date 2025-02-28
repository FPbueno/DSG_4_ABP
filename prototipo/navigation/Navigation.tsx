import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import Footer from "../components/Footer";
import OpenStreetMap from "../components/OpenStreetMap";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={OpenStreetMap} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
