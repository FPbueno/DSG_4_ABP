import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

interface Location {
  id: number;
  latitude: string;
  longitude: string;
  speed: string;
}

interface LocationMapProps {
  locations: Location[];
}

const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  const getInitialRegion = () => {
    if (locations.length === 0) {
      return {
        latitude: -22.847,
        longitude: -45.2325,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const latitudes = locations.map((loc) => parseFloat(loc.latitude));
    const longitudes = locations.map((loc) => parseFloat(loc.longitude));

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    };
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Trajeto Percorrido</Text>
        <View style={styles.webPlaceholder}>
          <Text style={styles.webPlaceholderText}>
            Visualização do mapa disponível apenas em dispositivos móveis
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <Text style={styles.mapTitle}>Trajeto Percorrido</Text>
      <MapView style={styles.map} initialRegion={getInitialRegion()}>
        <Polyline
          coordinates={locations.map((location) => ({
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          }))}
          strokeColor="#FF0000"
          strokeWidth={2}
        />
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            title={`Ponto ${index + 1}`}
            description={`Velocidade: ${location.speed} km/h`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webPlaceholder: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  webPlaceholderText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default LocationMap;
