import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "twrnc"; // Usando twrnc para estilização com Tailwind CSS

const Privacidade = () => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const alterarSenha = () => {
    if (novaSenha !== confirmarNovaSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Lógica para alterar a senha
    Alert.alert("Sucesso", "Senha alterada com sucesso!");
    // Aqui você integraria com sua API para alterar a senha
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-blue-800 mb-4`}>Privacidade</Text>

          {/* Senha Atual */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-700`}>Senha Atual</Text>
            <TextInput
              style={tw`w-full p-3 mt-2 bg-white rounded-xl border-2 border-blue-800`}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              placeholder="Digite sua senha atual"
              secureTextEntry
            />
          </View>

          {/* Nova Senha */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-700`}>Nova Senha</Text>
            <TextInput
              style={tw`w-full p-3 mt-2 bg-white rounded-xl border-2 border-blue-800`}
              value={novaSenha}
              onChangeText={setNovaSenha}
              placeholder="Digite a nova senha"
              secureTextEntry
            />
          </View>

          {/* Confirmar Nova Senha */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-700`}>Confirmar Nova Senha</Text>
            <TextInput
              style={tw`w-full p-3 mt-2 bg-white rounded-xl border-2 border-blue-800`}
              value={confirmarNovaSenha}
              onChangeText={setConfirmarNovaSenha}
              placeholder="Confirme a nova senha"
              secureTextEntry
            />
          </View>

          {/* Botão Alterar Senha */}
          <TouchableOpacity
            style={tw`w-full py-3 bg-blue-800 rounded-lg items-center`}
            onPress={alterarSenha}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacidade;
