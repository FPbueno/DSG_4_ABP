import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import tw from "twrnc"; // Para estilização com Tailwind CSS no React Native

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type RecuperacaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

interface Props {
  navigation: RecuperacaoScreenNavigationProp;
}

const Recuperacao = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const handleRecuperarSenha = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    setLoading(true);

    // Aqui você faria uma requisição para a API para recuperar a senha.
    // Exemplo de simulação de envio de e-mail.
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Instruções para recuperação de senha foram enviadas para o seu e-mail.");
      setEmail(""); // Limpa o campo de email após envio
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-white`}
    >
      <SafeAreaView style={tw`flex-1 justify-center bg-[#071025] items-center p-4`}>
        <View style={tw`w-full max-w-md`}>
          <Text style={[tw`text-2xl text-[#fff] mb-6 text-center`, { fontFamily: 'Poppins-Regular' }]}>
            Recuperação de Senha
          </Text>

          <Text style={[tw`text-base text-[#fff] mb-4`, { fontFamily: 'Poppins-Regular' }]}>
            Digite seu Email para recuperar sua senha
          </Text>


          <TextInput
            style={[tw`w-full p-3 mb-4 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black`, { fontFamily: 'Poppins-Regular' }]}
            placeholder="Seu Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />


          <TouchableOpacity
            style={tw`w-full py-3 mb-4 bg-[#D2042D] rounded-lg items-center `}
            onPress={handleRecuperarSenha}
            disabled={loading}
          >
           {loading ? (
              <Text style={tw`text-white text-lg font-poppins`}>Enviando...</Text>
            ) : (
              <Text style={[tw`text-white text-lg`, { fontFamily: 'Poppins-Regular' }]}>Recuperar Senha</Text>
            )}
          </TouchableOpacity>

          <View style={tw`flex-row justify-center`}>
            <Text style={tw`text-sm font-poppins text-gray-500`}>
              Lembrou da sua senha?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-sm font-poppins text-blue-600`}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Recuperacao;