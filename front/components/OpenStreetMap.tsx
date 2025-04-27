import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const OpenStreetMap = () => {
  const [latitude, setLatitude] = useState<number>(-23.55052);
  const [longitude, setLongitude] = useState<number>(-46.633308);
  const [speed, setSpeed] = useState<string>("0");
  const [selectedLayer, setSelectedLayer] = useState<string>("osm");
  const mapRef = useRef<MapView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchLastLocation = async () => {
    try {
      const response = await api.get("/locations/last");
      if (response.data) {
        setLatitude(parseFloat(response.data.latitude));
        setLongitude(parseFloat(response.data.longitude));
        setSpeed(response.data.speed.toString());
        updateMap();
      }
    } catch (error) {
      console.error("Erro ao buscar última localização:", error);
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Buscar última localização quando o componente montar
    fetchLastLocation();
  }, []);

  const updateMap = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <Animated.View style={[tw`flex-1 bg-[#071025]`, { opacity: fadeAnim }]}>
      <View style={tw`mt-4 mx-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Ionicons name="speedometer" size={20} color="#3b82f6" />
          <Text style={tw`text-lg font-semibold text-white ml-2`}>
            Velocidade:
          </Text>
        </View>
        <View
          style={tw`border p-3 rounded-xl text-lg bg-gray-800 text-white border-blue-800 shadow-lg`}
        >
          <Text style={tw`text-white text-lg`}>{speed} km/h</Text>
        </View>
      </View>

      <View style={tw`mt-6 mx-4`}>
        <TouchableOpacity
          style={tw`bg-blue-800 p-4 rounded-xl shadow-lg flex-row items-center justify-center`}
          onPress={updateMap}
        >
          <Ionicons name="refresh" size={24} color="white" />
          <Text style={tw`text-white text-center text-lg font-semibold ml-2`}>
            Atualizar Mapa
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 mt-4 rounded-t-3xl overflow-hidden`}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={tw`flex-1`}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          mapType={selectedLayer === "satellite" ? "satellite" : "standard"}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title="Localização Atual"
            description={`Velocidade: ${speed} km/h`}
          >
            <View
              style={tw`bg-blue-500 w-5 h-5 rounded-full border-2 border-white shadow-lg`}
            />
          </Marker>
        </MapView>
      </View>
    </Animated.View>
  );
};

export default OpenStreetMap;
