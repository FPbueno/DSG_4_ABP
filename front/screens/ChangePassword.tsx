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
import { useNavigation } from "@react-navigation/native";
import { authService } from "../services/authService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

export default function ChangePassword() {
  const navigation = useNavigation<NavigationProp>();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
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
      console.log("Iniciando alteração de senha...");
      const response = await authService.changePassword(
        currentPassword,
        newPassword
      );
      console.log("Resposta da alteração de senha:", response);

      // Se chegou aqui, a alteração foi bem sucedida
      Alert.alert("Sucesso", response.mensagem, [
        {
          text: "OK",
          onPress: () => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Erro ao alterar senha. Verifique sua senha atual e tente novamente."
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
            Alterar Senha
          </Text>

          <View style={tw`relative mb-4`}>
            <TextInput
              style={[
                tw`w-full p-3 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black pr-12`,
                { fontFamily: "Poppins-Regular" },
              ]}
              placeholder="Senha atual"
              placeholderTextColor="#999"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              editable={!loading}
            />
            <TouchableOpacity
              style={tw`absolute right-3 top-3`}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Ionicons
                name={showCurrentPassword ? "eye-off" : "eye"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={tw`relative mb-4`}>
            <TextInput
              style={[
                tw`w-full p-3 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black pr-12`,
                { fontFamily: "Poppins-Regular" },
              ]}
              placeholder="Nova senha"
              placeholderTextColor="#999"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              editable={!loading}
            />
            <TouchableOpacity
              style={tw`absolute right-3 top-3`}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons
                name={showNewPassword ? "eye-off" : "eye"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={tw`relative mb-4`}>
            <TextInput
              style={[
                tw`w-full p-3 text-[16px] text-white bg-[#0A1538] rounded-xl border-2 border-black pr-12`,
                { fontFamily: "Poppins-Regular" },
              ]}
              placeholder="Confirmar nova senha"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              style={tw`absolute right-3 top-3`}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              tw`w-full py-3 mb-4 rounded-lg items-center`,
              loading ? tw`bg-gray-500` : tw`bg-[#D2042D]`,
            ]}
            onPress={handleChangePassword}
            disabled={
              loading || !currentPassword || !newPassword || !confirmPassword
            }
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
                Alterar Senha
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={tw`text-sm text-blue-600 text-center`}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
