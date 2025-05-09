import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';

const LocalizacaoNotificacao = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Configurar a notificação
    PushNotification.createChannel(
      {
        channelId: 'localizacao',
        channelName: 'Notificações de Localização',
      },
      (created) => console.log(`Canal criado: ${created}`)
    );

    // Conectar ao WebSocket para receber as coordenadas
    const socket = new WebSocket('ws://seu-servidor.com/path');  // Substitua pela URL do seu WebSocket

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);  // Supondo que os dados sejam em formato JSON

      const { latitude, longitude } = data;
      setLocation({ latitude, longitude });

      // Enviar notificação sempre que a localização for atualizada
      PushNotification.localNotification({
        channelId: 'localizacao',
        title: 'Nova Localização Recebida',
        message: `Latitude: ${latitude}, Longitude: ${longitude}`,
      });
    };

    return () => {
      // Fechar a conexão WebSocket quando o componente for desmontado
      socket.close();
    };
  }, []);

  return (
    <View>
      <Text>Localização Atual:</Text>
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
    </View>
  );
};

export default LocalizacaoNotificacao;
