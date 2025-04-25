import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { WebView } from "react-native-webview";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const OpenStreetMap = () => {
  const [latitude, setLatitude] = useState<string>("-23.55052");
  const [longitude, setLongitude] = useState<string>("-46.633308");
  const [selectedLayer, setSelectedLayer] = useState<string>("osm");
  const webViewRef = useRef<WebView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const updateMap = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        map.setView([${latitude}, ${longitude}], 13);
        if (marker) {
          marker.setLatLng([${latitude}, ${longitude}]);
        } else {
          marker = L.marker([${latitude}, ${longitude}], {
            icon: L.divIcon({
              className: 'custom-marker',
              html: '<div style="width: 20px; height: 20px; background-color: #3b82f6; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          }).addTo(map);
        }
        true;
      `);
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
          .leaflet-control-zoom { border: none !important; }
          .leaflet-control-zoom a { 
            background-color: #1e40af !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            margin: 2px !important;
            width: 30px !important;
            height: 30px !important;
            line-height: 30px !important;
            font-size: 16px !important;
          }
          .leaflet-control-zoom a:hover { 
            background-color: #1e3a8a !important;
          }
          .leaflet-control-layers { border: none !important; }
          .leaflet-control-layers-toggle { 
            background-color: #1e40af !important;
            border: none !important;
            border-radius: 4px !important;
          }
          .leaflet-control-layers-expanded { 
            background-color: white !important;
            border-radius: 4px !important;
            padding: 10px !important;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 13);
          
          // Base layers
          var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          });
          
          var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
          });
          
          var darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© CARTO'
          });
          
          // Add default layer
          osmLayer.addTo(map);
          
          // Add layer control
          var baseLayers = {
            "OpenStreetMap": osmLayer,
            "Satélite": satelliteLayer,
            "Modo Escuro": darkLayer
          };
          
          L.control.layers(baseLayers).addTo(map);
          
          var marker = L.marker([${latitude}, ${longitude}], {
            icon: L.divIcon({
              className: 'custom-marker',
              html: '<div style="width: 20px; height: 20px; background-color: #3b82f6; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          }).addTo(map);
          
          map.on('click', function(e) {
            if (marker) {
              marker.setLatLng(e.latlng);
            } else {
              marker = L.marker(e.latlng, {
                icon: L.divIcon({
                  className: 'custom-marker',
                  html: '<div style="width: 20px; height: 20px; background-color: #3b82f6; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>',
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })
              }).addTo(map);
            }
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'click',
              lat: e.latlng.lat,
              lng: e.latlng.lng
            }));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <Animated.View style={[tw`flex-1 bg-[#071025]`, { opacity: fadeAnim }]}>
      <View style={tw`mx-4 mt-6 flex-row justify-between`}>
        <View style={tw`flex-1 mr-2`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="location" size={20} color="#3b82f6" />
            <Text style={tw`text-lg font-semibold text-white ml-2`}>
              Latitude:
            </Text>
          </View>
          <TextInput
            style={tw`border p-3 rounded-xl text-lg bg-gray-800 text-white border-blue-800 shadow-lg`}
            placeholder="Ex: -23.55052"
            placeholderTextColor="#9CA3AF"
            value={latitude}
            onChangeText={handleLatitudeChange}
            keyboardType="numeric"
          />
        </View>

        <View style={tw`flex-1 ml-2`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="location" size={20} color="#3b82f6" />
            <Text style={tw`text-lg font-semibold text-white ml-2`}>
              Longitude:
            </Text>
          </View>
          <TextInput
            style={tw`border p-3 rounded-xl text-lg bg-gray-800 text-white border-blue-800 shadow-lg`}
            placeholder="Ex: -46.633308"
            placeholderTextColor="#9CA3AF"
            value={longitude}
            onChangeText={handleLongitudeChange}
            keyboardType="numeric"
          />
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
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html }}
          style={tw`flex-1`}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === "click") {
              setLatitude(data.lat.toString());
              setLongitude(data.lng.toString());
            }
          }}
        />
      </View>
    </Animated.View>
  );
};

export default OpenStreetMap;
