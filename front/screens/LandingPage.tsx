import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
  MainDrawer: undefined;
};

type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

const LandingPage = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const { isAuthenticated } = useAuth();

  const handleContinue = () => {
    if (isAuthenticated) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainDrawer" }],
        })
      );
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../assets/image.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>DSG - DATA SOLUTIONS GROUP</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
          <Text style={styles.text}>
            O DSG é uma solução inovadora para rastreamento de derivadores
            utilizados em estudos oceanográficos. Nossa aplicação oferece uma
            interface moderna para monitoramento em tempo real de dispositivos
            que acompanham correntes marítimas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Principais Funcionalidades</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>
              • Rastreamento em Tempo Real
            </Text>
            <Text style={styles.text}>
              Acompanhe a localização dos derivadores através de GPS integrado.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>• Transmissão de Dados</Text>
            <Text style={styles.text}>
              Receba dados via telefonia celular para análise e monitoramento.
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>• Interface Intuitiva</Text>
            <Text style={styles.text}>
              Visualize informações importantes de forma clara e organizada.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplicações</Text>
          <Text style={styles.text}>
            • Análise de correntes marítimas{"\n"}• Estudos oceanográficos
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleContinue}>
          <Text style={styles.backButtonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  featureItem: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#D2042D",
    padding: 15,
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
});

export default LandingPage;
