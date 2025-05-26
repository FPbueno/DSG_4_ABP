import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useAuth } from "../context/AuthContext";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/AppNavigator";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: DrawerNavigationProp<DrawerParamList, "Settings">;
}

interface UserData {
  name: string;
  email: string;
}

const Settings: React.FC<Props> = ({ navigation }) => {
  const {
    speedLimit,
    notificationsEnabled,
    updateSpeedLimit,
    toggleNotifications,
  } = useSettings();
  const { userId } = useAuth();
  const [tempSpeedLimit, setTempSpeedLimit] = React.useState(
    speedLimit.toString()
  );
  const [userData, setUserData] = useState<UserData | null>(null);

  // Carregar dados do usuário
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Carrega dados do AsyncStorage
        const savedUserData = await AsyncStorage.getItem("userData");
        if (savedUserData) {
          const parsedData = JSON.parse(savedUserData);
          setUserData({
            name: parsedData.name || "Usuário",
            email: parsedData.email || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, []);

  const handleSpeedLimitChange = async () => {
    const newLimit = parseFloat(tempSpeedLimit);
    if (isNaN(newLimit) || newLimit <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido maior que zero.");
      setTempSpeedLimit(speedLimit.toString());
      return;
    }
    await updateSpeedLimit(newLimit);
    Alert.alert("Sucesso", "Limite de velocidade atualizado com sucesso!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Seção de Dados do Usuário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados do Usuário</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Nome</Text>
          <Text style={styles.settingValue}>
            {userData?.name || "Carregando..."}
          </Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email</Text>
          <Text style={styles.settingValue}>
            {userData?.email || "Carregando..."}
          </Text>
        </View>
      </View>

      {/* Seção de Alerta de Velocidade */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alerta de Velocidade</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Limite de Velocidade (km/h)</Text>
          <View style={styles.speedInputContainer}>
            <TextInput
              style={styles.speedInput}
              value={tempSpeedLimit}
              onChangeText={setTempSpeedLimit}
              keyboardType="numeric"
              placeholder="Limite de velocidade"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSpeedLimitChange}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Ativar Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071025",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#0A2463",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1a237e",
  },
  settingLabel: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  settingValue: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  speedInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  speedInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
    width: 80,
    marginRight: 10,
    color: "#000",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Settings;
