import React from 'react';
import { useFonts } from 'expo-font'; // Importa o hook para carregar fontes
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';

export default function App() {
  // Carregando as fontes com o hook useFonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  // Se as fontes não foram carregadas ainda, retorne null ou um loading
  if (!fontsLoaded) {
    return null; // Ou algum componente de loading, como um spinner
  }

  // Após carregar as fontes, renderize o app
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
