import React, { useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "../services/api";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MainStack: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function Register({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pais, setPais] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const adicionar = async () => {
    if (!nome || !email || !telefone || !pais || !senha || !confirma) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== confirma) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await api.post("/cadastro", {
        nome: nome,
        email: email,
        telefone: telefone,
        pais: pais,
        senha: senha,
      });

      if (response.data.id) {
        navigation.navigate("Login");
      } else {
        setErro(response.data.erro || "Erro ao criar conta. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setErro(
        error.response?.data?.erro || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.field}>
      <View style={styles.fieldset}>
        <Image source={require("../assets/image.png")} style={styles.imagem} />
        <Text style={styles.texto}>Criar Conta</Text>
        <Text style={styles.text}>Preencha seus dados</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço de Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="País"
          value={pais}
          onChangeText={setPais}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirma}
          onChangeText={setConfirma}
          secureTextEntry={true}
        />
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={adicionar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar-se</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonTexto}>Já tem uma conta? - Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 30,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "poppins-regular",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  texto: {
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "poppins-regular",
    color: "#fff",
    textAlign: "center",
    marginBottom: 60,
  },
  field: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#071025",
    padding: 8,
  },
  fieldset: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    fontFamily: "poppins-regular",
    height: 45,
    borderColor: "#000",
    borderWidth: 1,
    color: "black",
    paddingHorizontal: 10,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#D2042D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  buttonTexto: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "poppins-regular",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
