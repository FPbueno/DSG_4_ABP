import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity as Touchable
} from "react-native";
import tw from "twrnc"; // Usando twrnc para estilização com Tailwind CSS

const ConfiguraConta = () => {
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@example.com");
  const [foto, setFoto] = useState("https://via.placeholder.com/150"); // Foto inicial
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  const salvarAlteracoes = () => {
    // Lógica para salvar alterações
    Alert.alert("Sucesso", "As alterações foram salvas com sucesso!");
    // Aqui você pode integrar com sua API para salvar as mudanças
  };

  const selecionarFoto = () => {
    // Função para selecionar uma nova foto (exemplo, na prática você usaria um pacote de imagem)
    Alert.alert("Selecionar Foto", "Aqui você selecionaria uma nova foto.");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#071025]`}>
      <ScrollView contentContainerStyle={tw`p-4 mt-20`}>
        <View style={tw`items-center mb-6`}>
          {/* Foto de Perfil */}
          <TouchableOpacity onPress={selecionarFoto}>
            <Image
              source={{ uri: foto }}
              style={tw`w-32 h-32 rounded-full border-4 border-white mb-4`}
            />
            <Text style={[tw`text-white font-semibold pl-6`, { fontFamily: 'poppins-regular' }]}>Alterar Foto</Text>
          </TouchableOpacity>

          {/* Nome */}
          <View style={tw`mb-4 w-full`}>
            <Text style={[tw`text-lg font-semibold text-white`, { fontFamily: 'poppins-regular' }]}>Nome</Text>
            <TextInput
              style={[tw` h-12 border border-black text-black px-2.5 mt-2 text-base bg-[#F8F8F8] rounded-lg`, { fontFamily: 'poppins-regular' }]}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
            />
          </View>

          {/* E-mail */}
          <View style={tw`mb-4 w-full`}>
            <Text style={[tw`text-lg font-semibold text-white`, { fontFamily: 'poppins-regular' }]}>E-mail</Text>
            <TextInput
              style={[tw` h-12 border border-black text-black px-2.5 mt-2 text-base bg-[#F8F8F8] rounded-lg`, { fontFamily: 'poppins-regular' }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={tw`bg-[#D2042D] py-2.5 px-5 rounded-[20px] w-full my-1.5`}
            onPress={salvarAlteracoes}
          >
            <Text style={[tw`text-white text-lg font-semibold text-center `, { fontFamily: 'poppins-regular' }]}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfiguraConta;
