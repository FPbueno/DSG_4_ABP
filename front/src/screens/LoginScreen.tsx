import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Salvar o token no AsyncStorage
        await AsyncStorage.setItem("userToken", response.data.token);
        navigation.navigate("Home");
      }
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data);
      Alert.alert(
        "Erro no login",
        error.response?.data?.erro ||
          "Não foi possível fazer login. Por favor, tente novamente."
      );
    }
  };

  const handleRecovery = async () => {
    if (!recoveryEmail) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return;
    }

    try {
      const response = await api.post("/recover-password", {
        email: recoveryEmail,
      });

      Alert.alert(
        "Sucesso",
        "Um email foi enviado com as instruções para recuperação da senha.",
        [
          {
            text: "OK",
            onPress: () => setShowRecovery(false),
          },
        ]
      );
    } catch (error: any) {
      console.error("Erro na recuperação:", error.response?.data);
      Alert.alert(
        "Erro",
        error.response?.data?.erro ||
          "Não foi possível enviar o email de recuperação. Por favor, tente novamente."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!showRecovery ? (
          <>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setShowRecovery(true)}
            >
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.linkText}>
                Não tem uma conta? Cadastre-se
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
              Digite seu email para receber as instruções de recuperação
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={recoveryEmail}
              onChangeText={setRecoveryEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleRecovery}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setShowRecovery(false)}
            >
              <Text style={styles.linkText}>Voltar para o login</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
  },
});

export default LoginScreen;
