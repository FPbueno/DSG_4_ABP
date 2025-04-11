import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import tw from "twrnc";
import Footer from "./Footer";
import Header from "./Header";
const OpenStreetMap = () => {
  const [latitude, setLatitude] = useState<string>("-23.55052");
  const [longitude, setLongitude] = useState<string>("-46.633308");

  const handleLatitudeChange = (value: string) => {
    if (/^-?\d*\.?\d*$/.test(value)) {
      setLatitude(value);
    }
  };

  const handleLongitudeChange = (value: string) => {
    if (/^-?\d*\.?\d*$/.test(value)) {
      setLongitude(value);
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
      </head>
      <body style="margin:0; padding:0">
        <div id="map" style="height:100vh; width:100vw;"></div>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header />
      <View style={tw`p-4 pt-8`}>
        <Text style={tw`text-2xl font-bold text-center`}>
          Insira Coordenadas
        </Text>
      </View>

      <View style={tw`mx-4 mt-6`}>
        <Text style={tw`text-lg font-semibold`}>Latitude:</Text>
        <TextInput
          style={tw`border p-3 mt-2 rounded-lg text-lg`}
          placeholder="Ex: -23.55052"
          value={latitude}
          onChangeText={handleLatitudeChange}
          keyboardType="default"
        />
      </View>

      <View style={tw`mx-4 mt-4`}>
        <Text style={tw`text-lg font-semibold`}>Longitude:</Text>
        <TextInput
          style={tw`border p-3 mt-2 rounded-lg text-lg`}
          placeholder="Ex: -46.633308"
          value={longitude}
          onChangeText={handleLongitudeChange}
          keyboardType="default"
        />
      </View>

      <View style={tw`mt-6 mx-4`}>
        <TouchableOpacity
          style={tw`bg-blue-800 p-3 rounded-lg`}
          onPress={() => {}}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Atualizar Mapa
          </Text>
        </TouchableOpacity>
      </View>

      <WebView originWhitelist={["*"]} source={{ html }} style={tw`mt-4`} />
    <Footer />
    </View>
  );
};

export default OpenStreetMap;
