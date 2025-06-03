import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import api from "../services/api";
import StatisticsCard from "../components/StatisticsCard";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface Location {
  id: number;
  latitude: string;
  longitude: string;
  speed: string;
  timestamp: string;
  created_at?: string;
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
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [orientation, setOrientation] = useState("PORTRAIT");

  const fetchLocations = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/locations?page=${page}&limit=10`);

      console.log(
        "Dados recebidos da API:",
        JSON.stringify(response.data.data, null, 2)
      );

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

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setOrientation(window.width > window.height ? "LANDSCAPE" : "PORTRAIT");
    });

    return () => subscription?.remove();
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
        <MapView style={styles.map} initialRegion={getInitialRegion(locations)}>
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

  const filterLocationsByDateRange = (locations: Location[]) => {
    console.log("Total locations before filter:", locations.length);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const filtered = locations.filter((location) => {
      const locationDate = new Date(location.timestamp);

      // Ajusta as datas para considerar o dia inteiro
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      console.log("Location Date:", locationDate);
      console.log("Location Data:", location);
      console.log("Start:", start);
      console.log("End:", end);

      return locationDate >= start && locationDate <= end;
    });

    console.log("Filtered locations:", filtered.length);
    return filtered;
  };

  const exportToCSV = async () => {
    try {
      const filteredLocations = filterLocationsByDateRange(locations);

      if (filteredLocations.length === 0) {
        alert("Não há dados para exportar no período selecionado");
        return;
      }

      const headers = [
        "ID",
        "Latitude",
        "Longitude",
        "Velocidade (km/h)",
        "Data/Hora",
      ];
      const csvContent = [
        headers.join(","),
        ...filteredLocations.map((loc) =>
          [loc.id, loc.latitude, loc.longitude, loc.speed, loc.timestamp].join(
            ","
          )
        ),
      ].join("\n");

      const fileUri = `${FileSystem.cacheDirectory}estatisticas_${
        startDate.toISOString().split("T")[0]
      }_${endDate.toISOString().split("T")[0]}.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csvContent);

      if (Platform.OS === "web") {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `estatisticas_${startDate.toISOString().split("T")[0]}_${
          endDate.toISOString().split("T")[0]
        }.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      alert("Erro ao exportar CSV");
    }
  };

  const exportToPDF = async () => {
    try {
      const filteredLocations = filterLocationsByDateRange(locations);

      if (filteredLocations.length === 0) {
        alert("Não há dados para exportar no período selecionado");
        return;
      }

      const stats = calculateStats();
      const totalDistance = filteredLocations.reduce((acc, curr, index) => {
        if (index === 0) return 0;
        const prevLoc = filteredLocations[index - 1];
        return (
          acc +
          calculateDistance(
            parseFloat(prevLoc.latitude),
            parseFloat(prevLoc.longitude),
            parseFloat(curr.latitude),
            parseFloat(curr.longitude)
          )
        );
      }, 0);

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; }
            </style>
          </head>
          <body>
            <h1>Relatório de Estatísticas</h1>
            <h2>Período</h2>
            <p>De: ${startDate.toLocaleDateString()}</p>
            <p>Até: ${endDate.toLocaleDateString()}</p>
            
            <h2>Resumo</h2>
            <p>Velocidade Média: ${stats?.avgSpeed} km/h</p>
            <p>Velocidade Máxima: ${stats?.maxSpeed} km/h</p>
            <p>Velocidade Mínima: ${stats?.minSpeed} km/h</p>
            <p>Distância Total: ${totalDistance.toFixed(2)} km</p>
            
            <h2>Dados Detalhados</h2>
            <table>
              <tr>
                <th>ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Velocidade (km/h)</th>
                <th>Data/Hora</th>
              </tr>
              ${filteredLocations
                .map(
                  (loc) => `
                <tr>
                  <td>${loc.id}</td>
                  <td>${loc.latitude}</td>
                  <td>${loc.longitude}</td>
                  <td>${loc.speed}</td>
                  <td>${new Date(loc.timestamp).toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </table>
          </body>
        </html>
      `;

      if (Platform.OS === "web") {
        const blob = new Blob([htmlContent], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `estatisticas_${startDate.toISOString().split("T")[0]}_${
          endDate.toISOString().split("T")[0]
        }.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      alert("Erro ao exportar PDF");
    }
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
      <View
        style={[
          styles.header,
          orientation === "LANDSCAPE" && styles.headerLandscape,
        ]}
      >
        <Text style={styles.title}>Estatísticas de Deslocamento</Text>
      </View>

      <View
        style={[
          styles.contentContainer,
          orientation === "LANDSCAPE" && styles.contentContainerLandscape,
        ]}
      >
        <View
          style={[
            styles.leftColumn,
            orientation === "LANDSCAPE" && styles.leftColumnLandscape,
          ]}
        >
          <View style={styles.controlPanel}>
            <View style={styles.dateRangeContainer}>
              <Text style={styles.dateRangeTitle}>Selecione o Período</Text>
              <View style={styles.dateInputs}>
                <Pressable
                  style={({ pressed }) => [
                    styles.dateInput,
                    pressed && {
                      backgroundColor: "#283593",
                      transform: [{ scale: 0.98 }],
                    },
                  ]}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={styles.dateLabel}>Data Inicial:</Text>
                  <Text style={styles.dateValue}>
                    {startDate.toLocaleDateString()}
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.dateInput,
                    pressed && {
                      backgroundColor: "#283593",
                      transform: [{ scale: 0.98 }],
                    },
                  ]}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={styles.dateLabel}>Data Final:</Text>
                  <Text style={styles.dateValue}>
                    {endDate.toLocaleDateString()}
                  </Text>
                </Pressable>
              </View>

              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedDate?: Date
                  ) => {
                    setShowStartDatePicker(false);
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}

              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedDate?: Date
                  ) => {
                    setShowEndDatePicker(false);
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.exportButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.exportButton,
                  pressed && {
                    backgroundColor: "#283593",
                    transform: [{ scale: 0.98 }],
                  },
                ]}
                onPress={exportToCSV}
              >
                <MaterialIcons name="file-download" size={24} color="#fff" />
                <Text style={styles.exportButtonText}>Baixar CSV</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.exportButton,
                  pressed && {
                    backgroundColor: "#283593",
                    transform: [{ scale: 0.98 }],
                  },
                ]}
                onPress={exportToPDF}
              >
                <MaterialIcons name="picture-as-pdf" size={24} color="#fff" />
                <Text style={styles.exportButtonText}>Baixar PDF</Text>
              </Pressable>
            </View>
          </View>

          {locations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma localização encontrada
              </Text>
            </View>
          ) : (
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
          )}
        </View>

        <View
          style={[
            styles.rightColumn,
            orientation === "LANDSCAPE" && styles.rightColumnLandscape,
          ]}
        >
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={[
                styles.carousel,
                orientation === "LANDSCAPE" && styles.carouselLandscape,
              ]}
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
            <View
              style={[
                styles.mapContainer,
                orientation === "LANDSCAPE" && styles.mapContainerLandscape,
              ]}
            >
              {renderMap()}
            </View>
          </View>
        </View>
      </View>

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLandscape: {
    marginBottom: 10,
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
  carouselLandscape: {
    height: 250,
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
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapContainerLandscape: {
    height: 400,
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
  controlPanel: {
    backgroundColor: "#0A2463",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateRangeContainer: {
    marginBottom: 15,
  },
  dateRangeTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  dateInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dateInput: {
    backgroundColor: "#1a237e",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dateLabel: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginBottom: 5,
    opacity: 0.8,
  },
  dateValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
  exportButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a237e",
    padding: 14,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-medium",
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerLandscape: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    flex: 1,
  },
  leftColumnLandscape: {
    flex: 0.4,
  },
  rightColumn: {
    flex: 1,
  },
  rightColumnLandscape: {
    flex: 0.6,
  },
});

export default Statistics;
