import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Menu</Text>

        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>🗺️ Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
          <Text style={{ fontSize: 16 }}>⚙️ Configurações</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
