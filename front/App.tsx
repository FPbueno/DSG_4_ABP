import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font"; // Importa o hook para carregar fontes
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import * as Notifications from "expo-notifications"; // Importa o pacote de notificações do Expo

// Defina o limite de velocidade para a boia
const VELOCIDADE_LIMITE = 10; // 10 km/h

export default function App() {
  // Carregando as fontes com o hook useFonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  // Estado da velocidade (simulado aqui para exemplo)
  const [velocidade, setVelocidade] = useState<number>(0);

  // Função para enviar a notificação
  const enviarNotificacao = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Alerta de Velocidade!",
        body: `A boia está se movendo muito rápido! Velocidade: ${velocidade} km/h`,
      },
      trigger: null, // Isso envia imediatamente a notificação
    });
  };

  // Função para simular a leitura de dados do GPS (aqui você integraria com seu backend ou sensores)
  useEffect(() => {
    // Exemplo: A cada 5 segundos, a velocidade é atualizada
    const intervalo = setInterval(() => {
      // Aqui você deve colocar a lógica para obter a velocidade real (como no seu código de GPS)
      // Vou simular com um valor aleatório como exemplo
      const novaVelocidade = Math.random() * 20; // valor aleatório entre 0 e 20 km/h
      setVelocidade(novaVelocidade);

      // Verificar se a velocidade ultrapassou o limite
      if (novaVelocidade > VELOCIDADE_LIMITE) {
        enviarNotificacao(); // Disparar a notificação
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
