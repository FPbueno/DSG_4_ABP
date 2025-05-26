import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { authService } from "../services/authService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";

type RootStackParamList = {
  Login: undefined;
  ResetPassword: { email: string };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

interface RouteParams {
  email: string;
}

export default function ResetPassword() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { email } = route.params as RouteParams;

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const verifyResponse = await authService.verifyCode(email, code);
      await authService.resetPassword(email, newPassword, verifyResponse.token);
      Alert.alert("Sucesso", "Senha redefinida com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Erro ao redefinir senha. Verifique o código e tente novamente."
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
            Redefinir Senha
          </Text>

          <Text
            style={[
              tw`text-base text-[#fff] mb-4`,
              { fontFamily: "Poppins-Regular" },
            ]}
          >
            Digite o código enviado para {email}
          </Text>

          <TextInput
            style={[
              tw`w-full p-3 mb-4 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black`,
              { fontFamily: "Poppins-Regular" },
            ]}
            placeholder="Código de verificação"
            placeholderTextColor="#999"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
            editable={!loading}
          />

          <TextInput
            style={[
              tw`w-full p-3 mb-4 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black`,
              { fontFamily: "Poppins-Regular" },
            ]}
            placeholder="Nova senha"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            editable={!loading}
          />

          <TextInput
            style={[
              tw`w-full p-3 mb-4 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black`,
              { fontFamily: "Poppins-Regular" },
            ]}
            placeholder="Confirmar nova senha"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[
              tw`w-full py-3 mb-4 rounded-lg items-center`,
              loading ? tw`bg-gray-500` : tw`bg-[#D2042D]`,
            ]}
            onPress={handleResetPassword}
            disabled={loading || !code || !newPassword || !confirmPassword}
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
                Redefinir Senha
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={tw`text-sm text-blue-600 text-center`}>
              Voltar para Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  helperText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
