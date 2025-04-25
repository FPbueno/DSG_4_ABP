import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc"; // Para estilização com Tailwind CSS no React Native
import { authService } from "../services/authService";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Recuperacao: undefined;
  MainStack: undefined;
  ResetPassword: { email: string };
};

type RecuperacaoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Recuperacao"
>;

interface Props {
  navigation: RecuperacaoScreenNavigationProp;
}

const Recuperacao: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const handleRecuperarSenha = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await authService.forgotPassword(email);
      setSuccess(true);

      // Redireciona automaticamente para a tela de ResetPassword
      navigation.navigate("ResetPassword", { email });
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Erro ao solicitar recuperação de senha"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-white`}
    >
      <SafeAreaView
        style={tw`flex-1 justify-center bg-[#071025] items-center p-4`}
      >
        <View style={tw`w-full max-w-md`}>
          <Text
            style={[
              tw`text-2xl text-[#fff] mb-6 text-center`,
              { fontFamily: "Poppins-Regular" },
            ]}
          >
            Recuperação de Senha
          </Text>

          <Text
            style={[
              tw`text-base text-[#fff] mb-4`,
              { fontFamily: "Poppins-Regular" },
            ]}
          >
            Digite seu Email para recuperar sua senha
          </Text>

          <TextInput
            style={[
              tw`w-full p-3 mb-4 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black`,
              { fontFamily: "Poppins-Regular" },
            ]}
            placeholder="Seu Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <TouchableOpacity
            style={[
              tw`w-full py-3 mb-4 rounded-lg items-center`,
              loading ? tw`bg-gray-500` : tw`bg-[#D2042D]`,
            ]}
            onPress={handleRecuperarSenha}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={[
                  tw`text-white text-lg`,
                  { fontFamily: "Poppins-Regular" },
                ]}
              >
                Recuperar Senha
              </Text>
            )}
          </TouchableOpacity>

          <View style={tw`flex-row justify-center`}>
            <Text style={tw`text-sm text-gray-500`}>
              Lembrou da sua senha?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={tw`text-sm text-blue-600`}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Recuperacao;
