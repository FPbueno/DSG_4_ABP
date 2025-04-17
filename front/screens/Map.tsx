import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFonts } from "expo-font";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

// Interface para os dados da API
interface WeatherData {
  temperature: number;
  humidity: number;
  waveHeight: number;
}

const MapScreen = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // HTML para o mapa OpenStreetMap
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          body, html { 
            margin: 0; 
            padding: 0; 
            height: 100%; 
            width: 100%;
            overflow: hidden;
          }
          #map { 
            height: 100%; 
            width: 100%; 
            position: absolute;
            top: 0;
            left: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([-22.970722, -43.182365], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          var marker = L.marker([-22.970722, -43.182365]).addTo(map)
            .bindPopup('Localização Atual<br>Dados da qualidade da água');
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const mockData: WeatherData = {
          temperature: 25,
          humidity: 75,
          waveHeight: 1.5,
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
      <View style={styles.cardsContainer}>
        <View style={styles.dataContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : weatherData ? (
            <>
              <View style={styles.dataItem}>
                <Ionicons name="thermometer-outline" size={28} color="#fff" />
                <Text style={styles.dataValue}>
                  {weatherData.temperature}°C
                </Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons name="water-outline" size={28} color="#fff" />
                <Text style={styles.dataValue}>{weatherData.humidity}%</Text>
              </View>

              <View style={styles.dataItem}>
                <Ionicons name="water" size={28} color="#fff" />
                <Text style={styles.dataValue}>{weatherData.waveHeight}m</Text>
              </View>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.mapContainer}>
        <WebView
          source={{ html: mapHtml }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          bounces={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071025",
  },
  cardsContainer: {
    height: 120,
    backgroundColor: "#071025",
    borderBottomWidth: 1,
    borderBottomColor: "#1a365d",
    paddingVertical: 10,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dataItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 8,
    width: 100,
    backgroundColor: "#0A2463",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 6,
    fontFamily: "poppins-bold",
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
    padding: 10,
    fontFamily: "poppins-regular",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#071025",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
  },
});

export default MapScreen;
