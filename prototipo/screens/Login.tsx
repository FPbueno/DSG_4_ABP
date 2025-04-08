import React, { useState } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definir os tipos de navegação para o Stack
type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  MainStack:undefined;
  Recuperacao:undefined;
};

// Definir o tipo para a prop navigation
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) { // Tipando navigation
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const adicionar = () => {
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    setErro('');
    navigation.navigate('MainStack'); // Navega para a tela de Cadastro
  };

  return (
    <SafeAreaView style={styles.field}>
      <View style={styles.fieldset}>
        <Image source={require('../assets/image.png')} style={styles.imagem} />
        <Text style={styles.texto}>Bem vindo ao AquaTrace</Text> {/* Título */}
        <Text style={styles.text}>Login</Text> {/* Subtítulo */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          maxLength={8}
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={adicionar}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')} // Ir para Cadastro
        >
          <Text style={styles.buttonTexto}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Recuperacao')} // Ir para Cadastro
        >
          <Text style={styles.buttonTexto}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos ajustados

const styles = StyleSheet.create({
  imagem: {
    width: 100, // Defina a largura desejada para a imagem
    height: 100, // Defina a altura desejada para a imagem
    marginBottom: 30,
    alignSelf: 'center', // Garante que a imagem fique centralizada
  },
  text: {
    fontWeight: 'bold', 
    fontSize: 20,
    fontFamily: 'poppins-regular',
    color: '#fff',
    textAlign: 'center', // Garante que o texto fique centralizado
    marginBottom: 20,
  },
  texto: {
    fontWeight: 'bold', 
    fontSize: 22, // Aumentando o tamanho do texto
    fontFamily: 'poppins-regular',
    color: '#fff',
    textAlign: 'center', // Centraliza o texto na tela
    marginBottom: 60,
  },
  field: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071025',
    padding: 8,
  },
  fieldset: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'poppins-regular',
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 10,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center', 
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D2042D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    marginVertical: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily:'poppins-regular'
  },
  buttonTexto: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'poppins-regular'

  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});
