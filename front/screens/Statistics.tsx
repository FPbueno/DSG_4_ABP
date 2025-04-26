import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import api from "../services/api";
import MapView, { Marker, Polyline } from "react-native-maps";

interface Location {
  id: number;
  latitude: string;
  longitude: string;
}

const Statistics = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/locations");

      if (response.data && Array.isArray(response.data)) {
        setLocations(response.data);
      } else {
        setLocations([]);
      }

      setError(null);
    } catch (err) {
      console.error("Erro ao buscar localizações:", err);
      setError("Erro ao carregar localizações");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  if (loading && locations.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Calcula a região inicial do mapa baseada nos pontos
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualização das Localizações</Text>

      {locations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma localização encontrada</Text>
        </View>
      ) : (
        <>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={getInitialRegion()}>
              {/* Linha conectando os pontos */}
              <Polyline
                coordinates={locations.map((location) => ({
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude),
                }))}
                strokeColor="#FF0000"
                strokeWidth={2}
              />
            </MapView>
          </View>

          <ScrollView style={styles.tableContainer}>
            <ScrollView horizontal>
              <View>
                {/* Cabeçalho da tabela */}
                <View style={styles.tableHeader}>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>ID</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Latitude</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Longitude</Text>
                  </View>
                </View>

                {/* Linhas da tabela */}
                {locations.map((location) => (
                  <View key={location.id} style={styles.tableRow}>
                    <Text style={styles.cell}>{location.id}</Text>
                    <Text style={styles.cell}>{location.latitude}</Text>
                    <Text style={styles.cell}>{location.longitude}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071025",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "poppins-bold",
    marginBottom: 20,
  },
  mapContainer: {
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tableContainer: {
    height: 300,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0A2463",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerCell: {
    width: 120,
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "poppins-regular",
    fontSize: 12,
  },
  cell: {
    color: "#fff",
    width: 120,
    textAlign: "center",
    fontFamily: "poppins-regular",
    fontSize: 12,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "poppins-regular",
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-regular",
  },
});

export default Statistics;
