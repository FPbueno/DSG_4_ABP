import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFonts } from "expo-font";

const CustomDrawer = (props) => {
  const [hovered, setHovered] = useState(null);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, fontFamily: 'poppins-regular'  }}>Menu</Text>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          onPressIn={() => setHovered("Home")}
          onPressOut={() => setHovered(null)}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 15,
              color: hovered === "Home" ? "blue" : "black", // Simula um "hover"
              fontWeight: hovered === "Home" ? "bold" : "normal",
              fontFamily: 'poppins-regular'  // Pode mudar o peso da fonte no hover
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Map")}
          onPressIn={() => setHovered("Map")}
          onPressOut={() => setHovered(null)}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 15,
              color: hovered === "Map" ? "blue" : "black",
              fontWeight: hovered === "Map" ? "bold" : "normal",
              fontFamily: 'poppins-regular' 
            }}
          >
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Settings")}
          onPressIn={() => setHovered("Settings")}
          onPressOut={() => setHovered(null)}
        >
          <Text
            style={{
              fontSize: 20,
              color: hovered === "Settings" ? "blue" : "black",
              fontWeight: hovered === "Settings" ? "bold" : "normal",
              fontFamily: 'poppins-regular' 
            }}
          >
            Configurações
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
