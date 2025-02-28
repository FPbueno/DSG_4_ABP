import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import tw from "twrnc";

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
};

const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={tw`absolute bottom-0 w-full bg-blue-800 p-4 flex-row justify-around items-center`}
    >
      <TouchableOpacity
        style={tw`items-center`}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={24} color="white" />
        <Text style={tw`text-white text-xs`}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`items-center`}
        onPress={() => navigation.navigate("Map")}
      >
        <Ionicons name="map" size={24} color="white" />
        <Text style={tw`text-white text-xs`}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`items-center`}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={24} color="white" />
        <Text style={tw`text-white text-xs`}>Config</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
