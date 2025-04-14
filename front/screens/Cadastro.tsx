import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';

// Defina o tipo da navegação
type RootStackParamList = {
  Cadastro: undefined;
  Principal: undefined;
  Login: undefined;
};

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

interface Props {
  navigation: CadastroScreenNavigationProp;
}

export default function Cadastro({ navigation }: Props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pais, setPais] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [erro, setErro] = useState('');


  const adicionar = () => {
    if (!email || !senha || !confirma) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirma) {
      setErro('As senhas não coincidem.');
      return;
    }

    setErro('');
    console.log('Cadastro realizado com sucesso!');
    navigation.navigate('Principal');  // Navegação após cadastro
  };


  return (
    <SafeAreaView style={styles.field}>
      <View style={styles.fieldset}>
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="Endereço de Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="País"
          value={pais}
          onChangeText={setPais}
        />
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.input, { fontFamily: 'poppins-regular' }]}
          placeholder="Confirmar Senha"
          value={confirma}
          onChangeText={setConfirma}
          secureTextEntry={true}
        />
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={adicionar}>
          <Text style={[styles.buttonText, { fontFamily: 'poppins-bold' }]}>Registrar-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.buttonTexto, { fontFamily: 'poppins-regular' }]}>Já tem uma conta? - Logar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071025',
    padding: 8,
  },
  fieldset: {
    width: '80%',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'poppins-regular',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 10,
    marginTop: 8,
    fontSize: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D2042D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonTexto: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
