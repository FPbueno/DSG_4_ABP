import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font"; // Importa o hook para carregar fontes
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { Alert } from "react-native";

// Defina o limite de velocidade para a boia
const VELOCIDADE_LIMITE = 50; // 50 km/h

export default function App() {
  // Carregando as fontes com o hook useFonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  // Estado da velocidade (simulado aqui para exemplo)
  const [velocidade, setVelocidade] = useState<number>(0);

  // Função para mostrar o alerta de velocidade
  const mostrarAlertaVelocidade = () => {
    Alert.alert(
      "Alerta de Velocidade!",
      `A boia está se movendo muito rápido! Velocidade: ${velocidade.toFixed(
        1
      )} km/h`,
      [{ text: "OK" }]
    );
  };

  // Função para simular a leitura de dados do GPS
  useEffect(() => {
    // Exemplo: A cada 5 segundos, a velocidade é atualizada
    const intervalo = setInterval(() => {
      // Aqui você deve colocar a lógica para obter a velocidade real (como no seu código de GPS)
      // Vou simular com um valor aleatório como exemplo
      const novaVelocidade = Math.random() * 20; // valor aleatório entre 0 e 20 km/h
      setVelocidade(novaVelocidade);

      // Verificar se a velocidade ultrapassou o limite
      if (novaVelocidade > VELOCIDADE_LIMITE) {
        mostrarAlertaVelocidade(); // Mostrar o alerta
      }
    }, 5000); // A cada 5 segundos

    return () => clearInterval(intervalo); // Limpar intervalo ao desmontar
  }, [velocidade]);

  // Se as fontes não foram carregadas ainda, retorne null ou um loading
  if (!fontsLoaded) {
    return null; // Ou algum componente de loading, como um spinner
  }

  // Após carregar as fontes, renderize o app
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
