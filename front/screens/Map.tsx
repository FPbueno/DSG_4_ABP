import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useFonts } from "expo-font";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

// Interface para os dados da API
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  waveHeight: number;
  waterQuality: string;
}

const MapScreen = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Coordenadas iniciais do mapa (exemplo: Praia de Copacabana)
  const initialRegion = {
    latitude: -22.970722,
    longitude: -43.182365,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    // Simulação de dados da API
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Aqui você fará a chamada real para sua API
        const mockData: WeatherData = {
          temperature: 25,
          humidity: 75,
          windSpeed: 12,
          waveHeight: 1.5,
          waterQuality: "Boa",
        };
        setWeatherData(mockData);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Cards de dados */}
      <View style={styles.cardsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dataContainer}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#071025" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : weatherData ? (
            <>
              <View style={styles.dataItem}>
                <Ionicons
                  name="thermometer-outline"
                  size={32}
                  color="#071025"
                />
                <Text style={styles.dataValue}>
                  {weatherData.temperature}°C
                </Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons name="water-outline" size={32} color="#071025" />
                <Text style={styles.dataValue}>{weatherData.humidity}%</Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons
                  name="speedometer-outline"
                  size={32}
                  color="#071025"
                />
                <Text style={styles.dataValue}>
                  {weatherData.windSpeed} km/h
                </Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons name="water" size={32} color="#071025" />
                <Text style={styles.dataValue}>{weatherData.waveHeight}m</Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons name="water" size={32} color="#071025" />
                <Text style={styles.dataValue}>{weatherData.waterQuality}</Text>
              </View>
            </>
          ) : null}
        </ScrollView>
      </View>

      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          title="Localização Atual"
          description="Dados da qualidade da água"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardsContainer: {
    height: 150,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 15,
    zIndex: 1,
  },
  dataContainer: {
    flexDirection: "row",
    padding: 10,
  },
  dataItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginRight: 15,
    minWidth: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#071025",
    marginTop: 8,
    fontFamily: "poppins-bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
    fontFamily: "poppins-regular",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
  },
});

export default MapScreen;
