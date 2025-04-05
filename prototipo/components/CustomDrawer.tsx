import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  const [hovered, setHovered] = useState(null);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Menu</Text>

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
              fontWeight: hovered === "Home" ? "bold" : "normal", // Pode mudar o peso da fonte no hover
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
