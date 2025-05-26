import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextProps {
  speedLimit: number;
  notificationsEnabled: boolean;
  updateSpeedLimit: (limit: number) => Promise<void>;
  toggleNotifications: (enabled: boolean) => Promise<void>;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [speedLimit, setSpeedLimit] = useState<number>(5);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);

  // Carregar configurações salvas
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("settings");
        if (savedSettings) {
          const {
            speedLimit: savedLimit,
            notificationsEnabled: savedNotifications,
          } = JSON.parse(savedSettings);
          setSpeedLimit(savedLimit);
          setNotificationsEnabled(savedNotifications);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    loadSettings();
  }, []);

  // Atualizar limite de velocidade
  const updateSpeedLimit = async (limit: number) => {
    try {
      setSpeedLimit(limit);
      const settings = { speedLimit: limit, notificationsEnabled };
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
    } catch (error) {
      console.error("Erro ao salvar limite de velocidade:", error);
    }
  };

  // Ativar/desativar notificações
  const toggleNotifications = async (enabled: boolean) => {
    try {
      setNotificationsEnabled(enabled);
      const settings = { speedLimit, notificationsEnabled: enabled };
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
    } catch (error) {
      console.error("Erro ao atualizar configurações de notificação:", error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        speedLimit,
        notificationsEnabled,
        updateSpeedLimit,
        toggleNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
