import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { APIKEY } from "@env";


const apiKey = APIKEY;

const WeatherCard = () => {
  const [city, setCity] = useState("Jacareí");
  const [userInput, setUserInput] = useState("Jacareí");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const data = await response.json();
      if (data.error) throw new Error("Erro ao buscar dados");
      setWeatherData(data);
    } catch (error) {
      setError("Erro ao acessar a API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <ActivityIndicator size="large" color="#4A90E2" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-white`}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={tw`flex-1`}>
          <ScrollView
            contentContainerStyle={tw`flex-grow`}
            keyboardShouldPersistTaps="handled"
          >
            <View style={tw`items-center p-4`}>
              <TextInput
                style={tw`w-full p-3 mb-4 text-lg bg-white rounded-xl border-2 border-blue-800`}
                placeholder="Digite a cidade"
                value={userInput}
                onChangeText={setUserInput}
              />

              <TouchableOpacity
                style={tw`w-full py-3 mb-4 bg-blue-800 rounded-lg items-center`}
                onPress={() => setCity(userInput)}
              >
                <Text style={tw`text-white text-lg font-semibold`}>
                  Buscar Cidade
                </Text>
              </TouchableOpacity>

              {error ? (
                <Text style={tw`text-red-500`}>{error}</Text>
              ) : weatherData ? (
                <View
                  style={tw`w-full flex- flex-wrap justify-center mb-4 mt-5`}
                >
                  <View
                    style={tw`w-full p-4 bg-white rounded-lg shadow-lg items-center mb-4`}
                  >
                    <Text style={tw`text-sm font-semibold text-gray-600`}>
                      Temperatura
                    </Text>
                    <Text style={tw`text-xl font-bold text-blue-800`}>
                      {weatherData.current.temp_c}°C
                    </Text>
                  </View>

                  <View
                    style={tw`w-full p-4 bg-white rounded-lg shadow-lg items-center mb-4`}
                  >
                    <Text style={tw`text-sm font-semibold text-gray-600`}>
                      Umidade
                    </Text>
                    <Text style={tw`text-lg font-bold text-blue-800`}>
                      {weatherData.current.humidity}%
                    </Text>
                  </View>

                  <View
                    style={tw`w-full p-4 bg-white rounded-lg shadow-lg items-center mb-4`}
                  >
                    <Text style={tw`text-sm font-semibold text-gray-600`}>
                      Vento
                    </Text>
                    <Text style={tw`text-lg font-bold text-blue-800`}>
                      {weatherData.current.wind_kph} km/h
                    </Text>
                  </View>

                  <View
                    style={tw`w-full p-4 bg-white rounded-lg shadow-lg items-center mb-4`}
                  >
                    <Text style={tw`text-sm font-semibold text-gray-600`}>
                      Precipitação
                    </Text>
                    <Text style={tw`text-lg font-bold text-blue-800`}>
                      {weatherData.current.precip_mm} mm
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WeatherCard;
