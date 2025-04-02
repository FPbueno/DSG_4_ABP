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
import { StackNavigationProp } from '@react-navigation/stack';  // Importando o tipo correto

// Definir o tipo da navegação para o Stack
type RootStackParamList = {
    Cadastro: undefined;
    Principal: undefined;
    Login:undefined;
};

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

interface Props {
    navigation: CadastroScreenNavigationProp;
}

export default function Cadastro({ navigation }: Props) {
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
        // Navega para a tela Principal após o cadastro
        navigation.navigate('Principal');  // Aqui a navegação acontece
    };

    return (
        <SafeAreaView style={styles.field}>
            <View style={styles.fieldset}>
                <Image
                    source={require('../assets/icon.png')}
                    style={styles.imagem}
                />
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
                <TouchableOpacity style={styles.button} onPress={adicionar}>
                    <Text style={styles.buttonText}>Registrar-se</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')} // Ir para Cadastro
                >
                    <Text style={styles.buttonTexto}>Já tem uma conta? - Logar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    buttonTexto: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10, // Adiciona espaçamento abaixo do texto
    },
    imagem: {
        width: 100, // Defina a largura desejada para a imagem
        height: 100, // Defina a altura desejada para a imagem
        marginBottom: 30,
        alignSelf: 'center', // Garante que a imagem fique centralizada
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Sans-serif',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom: 20,
        textAlign: 'center'
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Sans-serif',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom: 60,
        textAlign: 'center'
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
        fontFamily: 'Sans-serif',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        marginTop: 8,
        fontSize: 15,
        backgroundColor: '#0A1538',
        borderRadius: 15,
    },
    buttonContainer: {
        flexDirection: 'column', // Organiza os botões horizontalmente
        justifyContent: 'space-between', // Distribui os botões igualmente
        width: '80%', // Define a largura dos botões
        marginTop: 20,
    },
    button: {
        backgroundColor: '#D2042D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flex: 1, // Faz os botões ocuparem espaço igual
        marginHorizontal: 5, // Adiciona um pequeno espaçamento entre os botões
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    // Estilo para a mensagem de erro
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    // Estilo para o contêiner das informações
    infoContainer: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    // Estilo para o texto das informações
    infoText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5,
    },
});