import { useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

export const useNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Criando o canal de notificação ao iniciar
    PushNotification.createChannel(
      {
        channelId: 'localizacao',
        channelName: 'Notificações de Localização',
      },
      (created) => console.log(`Canal criado: ${created}`)
    );
  }, []);

  useEffect(() => {
    if (notificationsEnabled) {
      const interval = setInterval(() => {
        PushNotification.localNotification({
          channelId: 'localizacao',
          title: 'Nova Notificação!',
          message: 'Este é um exemplo de notificação local.',
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [notificationsEnabled]);

  return { notificationsEnabled, setNotificationsEnabled };
};
