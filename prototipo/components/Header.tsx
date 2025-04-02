import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import tw from "twrnc";

// Definição dos tipos de navegação
type DrawerParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
};

const Header = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={tw`flex-row items-center justify-between bg-[#071025] p-4`}>
      
      {/* Ícone do Menu Lateral à Esquerda */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      {/* Título Centralizado */}
      <Text style={tw`text-white text-lg font-bold absolute left-1/2 -translate-x-1/2`}>
        AquaTrace
      </Text>

      {/* Ícone de Foto à Direita */}
      <TouchableOpacity style={tw`rounded-full border-2 border-white p-1`}>
        <Ionicons name="person-circle-outline" size={40} color="white" />
      </TouchableOpacity>

    </View>
  );
};

export default Header;
