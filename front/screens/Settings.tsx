import React from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import tw from "twrnc";
import { useAuth } from "../context/AuthContext";

type RootDrawerParamList = {
  OpenStreetMaps: undefined;
  Home: undefined;
  Settings: undefined;
  ConfiguraConta: undefined;
  Privacidade: undefined;
  Login: undefined;
};

const SettingsScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-[#071025]`}>
      <View style={tw`flex-1 p-6 items-center`}>
        {/* Título Centralizado */}
        <Text style={tw`text-white text-2xl mb-6`}>Configurações</Text>

        {/* Ícone de Perfil Centralizado e Grande */}
        <TouchableOpacity
          style={tw`rounded-full border-4 border-white p-2 mb-6`}
        >
          <Ionicons name="person-circle-outline" size={100} color="white" />
        </TouchableOpacity>

        {/* Opção de Conta */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center p-4 bg-gray-800 rounded-lg mb-4`}
          onPress={() => navigation.navigate("ConfiguraConta")}
        >
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={tw`text-white text-lg ml-3`}>Conta</Text>
        </TouchableOpacity>

        {/* Notificações */}
        <View
          style={tw`w-full flex-row justify-between items-center p-4 bg-gray-800 rounded-lg mb-4`}
        >
          <View style={tw`flex-row items-center`}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Text style={tw`text-white text-lg ml-3`}>Notificações</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            thumbColor={notificationsEnabled ? "#34D399" : "#f4f4f4"}
          />
        </View>

        {/* Privacidade */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center p-4 bg-gray-800 rounded-lg mb-4`}
          onPress={() => navigation.navigate("Privacidade")}
        >
          <Ionicons name="lock-closed-outline" size={24} color="white" />
          <Text style={tw`text-white text-lg ml-3`}>Privacidade</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center p-4 bg-red-600 rounded-lg`}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={tw`text-white text-lg ml-3`}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
