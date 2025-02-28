import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const SettingsScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
      <Text style={tw`text-white text-2xl`}>Configurações</Text>
    </View>
  );
};

export default SettingsScreen;
