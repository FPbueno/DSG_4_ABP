import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font"; // Importa o hook para carregar fontes
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./navigation/AppNavigator";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { Alert } from "react-native";

// Componente que gerencia os alertas de velocidade
const SpeedAlertManager = () => {
  const { isAuthenticated } = useAuth();
  const { speedLimit, notificationsEnabled } = useSettings();
  const [velocidade, setVelocidade] = useState<number>(0);

  // Função para mostrar o alerta de velocidade
  const mostrarAlertaVelocidade = () => {
    if (velocidade > speedLimit && notificationsEnabled) {
      console.log(
        `Alerta disparado! Velocidade: ${velocidade.toFixed(1)} km/h`
      );
      Alert.alert(
        "⚠️ Alerta de Velocidade!",
        `A boia está se movendo acima do limite permitido!\n\nVelocidade atual: ${velocidade.toFixed(
          1
        )} km/h\nLimite permitido: ${speedLimit} km/h`,
        [{ text: "OK" }]
      );
    }
  };

  // Função para simular a leitura de dados do GPS
  useEffect(() => {
    // Só inicia o monitoramento se o usuário estiver autenticado
    if (!isAuthenticated) {
      return;
    }

    // Exemplo: A cada 5 segundos, a velocidade é atualizada
    const intervalo = setInterval(() => {
      // Aqui você deve colocar a lógica para obter a velocidade real (como no seu código de GPS)
      // Vou simular com um valor aleatório como exemplo
      const novaVelocidade = Math.random() * 8; // valor aleatório entre 0 e 8 km/h
      setVelocidade(novaVelocidade);

      // Verificar se a velocidade ultrapassou o limite
      if (novaVelocidade > speedLimit) {
        mostrarAlertaVelocidade(); // Mostrar o alerta
      }
    }, 5000); // A cada 5 segundos

    return () => clearInterval(intervalo); // Limpar intervalo ao desmontar
  }, [isAuthenticated, velocidade, speedLimit, notificationsEnabled]);

  return null; // Este componente não renderiza nada visualmente
};

export default function App() {
  // Carregando as fontes com o hook useFonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  // Se as fontes não foram carregadas ainda, retorne null ou um loading
  if (!fontsLoaded) {
    return null;
  }

  // Após carregar as fontes, renderize o app
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SettingsProvider>
          <SpeedAlertManager />
          <AppNavigator />
        </SettingsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
