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
import StatisticsCard from "../components/StatisticsCard";
import MapView, { Marker, Polyline } from "react-native-maps";

interface Location {
  id: number;
  latitude: string;
  longitude: string;
  speed: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const getInitialRegion = (locations: Location[]) => {
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

const Statistics = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchLocations = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/locations?page=${page}&limit=10`);

      if (response.data && Array.isArray(response.data.data)) {
        setLocations(response.data.data);
        setPagination(response.data.pagination);
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLocations(newPage);
    }
  };

  const calculateStats = () => {
    if (locations.length === 0) return null;

    const speeds = locations.map((loc) => parseFloat(loc.speed));
    const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
    const maxSpeed = Math.max(...speeds);
    const minSpeed = Math.min(...speeds);

    return {
      avgSpeed: avgSpeed.toFixed(2),
      maxSpeed: maxSpeed.toFixed(2),
      minSpeed: minSpeed.toFixed(2),
    };
  };

  const stats = calculateStats();

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const renderSpeedChart = () => {
    if (locations.length === 0) return null;

    const speeds = locations.map((loc) => parseFloat(loc.speed));
    const maxSpeed = Math.max(...speeds);
    const chartHeight = 150;

    // Selecionando 5 pontos uniformemente distribuídos
    const totalPoints = speeds.length;
    const step = Math.max(1, Math.floor(totalPoints / 5));
    const selectedIndices = [
      0,
      step,
      step * 2,
      step * 3,
      Math.min(step * 4, totalPoints - 1),
    ];
    const filteredSpeeds = selectedIndices.map((index) => speeds[index]);

    const getSpeedColor = (speed: number) => {
      if (speed < 20) return "#4CAF50"; // Verde para baixa velocidade
      if (speed < 40) return "#FFC107"; // Amarelo para velocidade média
      if (speed < 60) return "#FF9800"; // Laranja para velocidade alta
      return "#F44336"; // Vermelho para velocidade muito alta
    };

    const yAxisValues = [0, maxSpeed / 2, maxSpeed];

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Variação da Velocidade</Text>
        <View style={styles.chartWrapper}>
          <View style={styles.yAxis}>
            {yAxisValues.map((value, index) => (
              <Text key={index} style={styles.yAxisLabel}>
                {value.toFixed(1)} km/h
              </Text>
            ))}
          </View>

          <View style={styles.chart}>
            {filteredSpeeds.map((speed, index) => {
              const barHeight = (speed / maxSpeed) * chartHeight;
              const originalIndex = selectedIndices[index];
              return (
                <View key={originalIndex} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: getSpeedColor(speed),
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{speed.toFixed(1)}</Text>
                  <Text style={styles.pointLabel}>P{originalIndex + 1}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
            />
            <Text style={styles.legendText}>Baixa (menos de 20 km/h)</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FFC107" }]}
            />
            <Text style={styles.legendText}>Média (20 a 40 km/h)</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF9800" }]}
            />
            <Text style={styles.legendText}>Alta (40 a 60 km/h)</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#F44336" }]}
            />
            <Text style={styles.legendText}>Muito Alta (mais de 60 km/h)</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDistanceChart = () => {
    if (locations.length === 0) return null;

    const totalDistance = locations.reduce((acc, curr, index) => {
      if (index === 0) return 0;
      const prevLoc = locations[index - 1];
      const distance = calculateDistance(
        parseFloat(prevLoc.latitude),
        parseFloat(prevLoc.longitude),
        parseFloat(curr.latitude),
        parseFloat(curr.longitude)
      );
      return acc + distance;
    }, 0);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Distância Percorrida</Text>
        <View style={styles.distanceChart}>
          <View style={styles.distanceBar}>
            <View style={[styles.distanceProgress, { width: "100%" }]} />
          </View>
          <Text style={styles.distanceValue}>
            Total: {totalDistance.toFixed(2)} km
          </Text>
        </View>
      </View>
    );
  };

  const renderMap = () => {
    return (
      <View style={[styles.chartContainer, styles.mapContainer]}>
        <Text style={styles.chartTitle}>Trajeto Percorrido</Text>
        <MapView
          style={styles.map}
          initialRegion={getInitialRegion(locations)}
          scrollEnabled={false}
        >
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

  const handleScroll = (event: any) => {
    const slideWidth = Dimensions.get("window").width - 40;
    const currentIndex = Math.round(
      event.nativeEvent.contentOffset.x / slideWidth
    );
    setCurrentSlide(currentIndex);
  };

  if (loading && locations.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estatísticas de Deslocamento</Text>

      {locations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma localização encontrada</Text>
        </View>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <StatisticsCard
              label="Velocidade Média"
              value={stats?.avgSpeed || "0"}
            />
            <StatisticsCard
              label="Velocidade Máxima"
              value={stats?.maxSpeed || "0"}
            />
            <StatisticsCard
              label="Velocidade Mínima"
              value={stats?.minSpeed || "0"}
            />
          </View>

          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {renderSpeedChart()}
              {renderDistanceChart()}
            </ScrollView>
            <View style={styles.paginationDots}>
              <View
                style={[styles.dot, currentSlide === 0 && styles.activeDot]}
              />
              <View
                style={[styles.dot, currentSlide === 1 && styles.activeDot]}
              />
            </View>
          </View>

          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>Trajeto Percorrido</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={getInitialRegion(locations)}
              >
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
          </View>
        </>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  carousel: {
    height: 300,
    marginBottom: 20,
  },
  chartContainer: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#0A2463",
    padding: 15,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chartWrapper: {
    flexDirection: "row",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  yAxis: {
    width: 40,
    justifyContent: "space-between",
    paddingRight: 0,
    alignItems: "flex-end",
    marginRight: 10,
  },
  yAxisLabel: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "poppins-regular",
    textAlign: "right",
    width: "100%",
    paddingRight: 5,
  },
  chart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 0,
  },
  barContainer: {
    alignItems: "center",
    width: 35,
    justifyContent: "flex-end",
    marginRight: 0,
  },
  bar: {
    width: 20,
    borderRadius: 5,
  },
  barLabel: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
    textAlign: "center",
    width: "100%",
  },
  pointLabel: {
    color: "#fff",
    fontSize: 8,
    marginTop: 2,
    opacity: 0.7,
    textAlign: "center",
    width: "100%",
  },
  distanceChart: {
    height: 200,
    justifyContent: "center",
  },
  distanceBar: {
    height: 20,
    backgroundColor: "#1a237e",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  distanceProgress: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  distanceValue: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-bold",
    textAlign: "center",
  },
  mapSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  mapContainer: {
    height: 300,
    backgroundColor: "#0A2463",
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
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
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4A4A4A",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFA726",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 2,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "poppins-regular",
  },
});

export default Statistics;
