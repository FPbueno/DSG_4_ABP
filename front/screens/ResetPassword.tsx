import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { authService } from "../services/authService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    console.log("Iniciando redefinição de senha...");
    console.log("Email:", email);
    console.log("Código:", code);
    console.log("Nova senha:", newPassword);
    console.log("Confirmar senha:", confirmPassword);

    if (!code || !newPassword || !confirmPassword) {
      console.log("Campos vazios detectados");
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("Senhas não coincidem");
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 6) {
      console.log("Senha muito curta");
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    console.log("Iniciando processo de redefinição...");

    try {
      console.log("Verificando código...");
      const verifyResponse = await authService.verifyCode(email, code);
      console.log("Código verificado com sucesso");

      console.log("Redefinindo senha...");
      await authService.resetPassword(email, newPassword, verifyResponse.token);
      console.log("Senha redefinida com sucesso");

      Alert.alert("Sucesso", "Senha redefinida com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro durante a redefinição:", error);
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
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>

      <Text style={styles.subtitle}>Digite o código enviado para {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Código de verificação"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
          (!code || !newPassword || !confirmPassword) && styles.buttonDisabled,
        ]}
        onPress={handleResetPassword}
        disabled={loading || !code || !newPassword || !confirmPassword}
        activeOpacity={0.7}
      >
        {loading ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator color="#fff" />
            <Text style={[styles.buttonText, { marginLeft: 10 }]}>
              Processando...
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Redefinir Senha</Text>
          </View>
        )}
      </TouchableOpacity>

      {(!code || !newPassword || !confirmPassword) && (
        <Text style={styles.helperText}>
          Preencha todos os campos para redefinir sua senha
        </Text>
      )}
    </View>
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
