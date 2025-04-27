import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { APIKEY } from "@env";
import api from "../services/api";

const apiKey = APIKEY;

interface LocationData {
  id: number;
  latitude: number;
  longitude: number;
  speed: number;
  created_at: string;
}

interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    region: string;
  };
}

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async () => {
    try {
      const response = await api.get("/locations/last");
      setLocation(response.data);
    } catch (error) {
      setError("Erro ao buscar localização da boia");
    }
  };

  const fetchWeatherData = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}&aqi=no`
      );
      const data = await response.json();
      if (data.error) throw new Error("Erro ao buscar dados");
      setWeatherData(data);
    } catch (error) {
      setError("Erro ao acessar a API de clima");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.location}>
            {weatherData.location.name}, {weatherData.location.region}
          </Text>
          <View style={styles.weatherGrid}>
            <View style={styles.weatherItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="thermometer" size={24} color="#0A2463" />
              </View>
              <Text style={styles.weatherLabel}>Temperatura</Text>
              <Text style={styles.weatherValue}>
                {weatherData.current.temp_c}°C
              </Text>
            </View>

            <View style={styles.weatherItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="water" size={24} color="#0A2463" />
              </View>
              <Text style={styles.weatherLabel}>Umidade</Text>
              <Text style={styles.weatherValue}>
                {weatherData.current.humidity}%
              </Text>
            </View>

            <View style={styles.weatherItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="rainy" size={24} color="#0A2463" />
              </View>
              <Text style={styles.weatherLabel}>Chuva</Text>
              <Text style={styles.weatherValue}>
                {weatherData.current.precip_mm}mm
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.errorText}>Carregando dados climáticos...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  location: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginBottom: 20,
    textAlign: "center",
  },
  weatherGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  weatherItem: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  weatherLabel: {
    color: "#0A2463",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginBottom: 5,
  },
  weatherValue: {
    color: "#0A2463",
    fontSize: 18,
    fontFamily: "poppins-bold",
  },
  errorText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginTop: 10,
    textAlign: "center",
  },
});

export default WeatherCard;
