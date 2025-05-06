import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { useAuth } from "../context/AuthContext";

const ConfiguraConta = () => {
  const { updateMail } = useAuth();
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("https://via.placeholder.com/150");

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const salvarAlteracoes = async () => {
    try {
      const mailOk = await updateMail(email);

      if (mailOk) {
        Alert.alert("Sucesso", "E-mail atualizado com sucesso!");
        // Se necessário, você pode fazer algo adicional após a atualização, como limpar o campo de entrada ou redirecionar
        setEmail("");  // Limpa o campo de e-mail após sucesso, por exemplo.
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o e-mail.");
      }
    } catch (error) {
      console.error("Erro ao salvar e-mail:", error);
      Alert.alert("Erro", "Ocorreu um problema ao atualizar o e-mail.");
    }
  };

  const selecionarFoto = () => {
    Alert.alert("Selecionar Foto", "Aqui você selecionaria uma nova foto.");
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={tw`flex-1 bg-[#071025]`}>
      <ScrollView contentContainerStyle={tw`p-4 mt-20`}>
        <View style={tw`items-center mb-6`}>
          <TouchableOpacity onPress={selecionarFoto}>
            <Image
              source={{ uri: foto }}
              style={tw`w-32 h-32 rounded-full border-4 border-white mb-4`}
            />
            <Text
              style={[tw`text-white font-semibold pl-6`, { fontFamily: "Poppins-Regular" }]}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          {/* E-mail */}
          <View style={tw`mb-4 w-full`}>
            <Text
              style={[tw`text-lg font-semibold text-white`, { fontFamily: "Poppins-Regular" }]}
            >
              E-mail
            </Text>
            <TextInput
              style={[
                tw`h-12 border border-black text-black px-2.5 mt-2 text-base bg-[#F8F8F8] rounded-[15px]`,
                { fontFamily: "Poppins-Regular" },
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={tw`bg-[#D2042D] py-2.5 px-5 rounded-[15px] w-full my-1.5`}
            onPress={salvarAlteracoes}
          >
            <Text
              style={[tw`text-white text-lg font-semibold text-center`, { fontFamily: "Poppins-Regular" }]}
            >
              Salvar E-mail
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfiguraConta;
