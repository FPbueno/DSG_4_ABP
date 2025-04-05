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
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`items-center mb-6`}>
          {/* Foto de Perfil */}
          <TouchableOpacity onPress={selecionarFoto}>
            <Image
              source={{ uri: foto }}
              style={tw`w-32 h-32 rounded-full border-4 border-black mb-4`}
            />
            <Text style={tw`text-blue-800 font-semibold`}>Alterar Foto</Text>
          </TouchableOpacity>

          {/* Nome */}
          <View style={tw`mb-4 w-full`}>
            <Text style={tw`text-lg font-semibold text-white`}>Nome</Text>
            <TextInput
              style={tw`w-full p-3 mt-2 bg-white rounded-xl border-2 border-black`}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
            />
          </View>

          {/* E-mail */}
          <View style={tw`mb-4 w-full`}>
            <Text style={tw`text-lg font-semibold text-white`}>E-mail</Text>
            <TextInput
              style={tw`w-full p-3 mt-2 bg-[#071025] rounded-xl border-2 border-black`}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={tw`w-full py-3 bg-[#D2042D] rounded-lg items-center`}
            onPress={salvarAlteracoes}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfiguraConta;
