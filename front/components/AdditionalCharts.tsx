import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

interface Location {
  id: number;
  speed: string;
  latitude: string;
  longitude: string;
}

interface AdditionalChartsProps {
  locations: Location[];
}

const AdditionalCharts: React.FC<AdditionalChartsProps> = ({ locations }) => {
  if (locations.length === 0) return null;

  // Calcula a distância entre dois pontos
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

  // Calcula a distância total percorrida
  const calculateTotalDistance = () => {
    let totalDistance = 0;
    for (let i = 1; i < locations.length; i++) {
      const prevLoc = locations[i - 1];
      const currLoc = locations[i];
      totalDistance += calculateDistance(
        parseFloat(prevLoc.latitude),
        parseFloat(prevLoc.longitude),
        parseFloat(currLoc.latitude),
        parseFloat(currLoc.longitude)
      );
    }
    return totalDistance;
  };

  // Calcula a velocidade média por segmento
  const calculateSpeedSegments = () => {
    const segments = [];
    for (let i = 1; i < locations.length; i++) {
      const prevSpeed = parseFloat(locations[i - 1].speed);
      const currSpeed = parseFloat(locations[i].speed);
      segments.push((prevSpeed + currSpeed) / 2);
    }
    return segments;
  };

  const totalDistance = calculateTotalDistance();
  const speedSegments = calculateSpeedSegments();
  const maxSpeed = Math.max(...speedSegments);
  const avgSpeed =
    speedSegments.reduce((a, b) => a + b, 0) / speedSegments.length;
  const chartHeight = 120;

  const renderMainChart = () => (
    <View
      style={[styles.slide, { width: Dimensions.get("window").width - 40 }]}
    >
      <Text style={styles.chartTitle}>Análise de Velocidade</Text>

      {/* Gráfico de Velocidade Detalhado */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Variação da Velocidade</Text>
          <Text style={styles.speedValue}>{maxSpeed.toFixed(1)} km/h</Text>
        </View>
        <View style={styles.chart}>
          {speedSegments.map((speed, index) => {
            const barHeight = (speed / maxSpeed) * chartHeight;
            const speedColor = speed > avgSpeed ? "#ffa726" : "#4caf50";
            return (
              <View key={index} style={styles.speedBarContainer}>
                <View
                  style={[
                    styles.speedBar,
                    { height: barHeight, backgroundColor: speedColor },
                  ]}
                />
                <Text style={styles.barLabel}>{speed.toFixed(1)}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.chartFooter}>
          <Text style={styles.footerText}>
            Média: {avgSpeed.toFixed(1)} km/h
          </Text>
          <Text style={styles.footerText}>
            Total: {totalDistance.toFixed(2)} km
          </Text>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Pontos</Text>
          <Text style={styles.statValue}>{locations.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Média/Segmento</Text>
          <Text style={styles.statValue}>
            {(totalDistance / (locations.length - 1)).toFixed(2)} km
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Vel. Máxima</Text>
          <Text style={styles.statValue}>{maxSpeed.toFixed(1)} km/h</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Distância Total</Text>
          <Text style={styles.statValue}>{totalDistance.toFixed(2)} km</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análise Detalhada</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {renderMainChart()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A2463",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "poppins-bold",
    marginBottom: 15,
  },
  carousel: {
    height: 350,
  },
  slide: {
    padding: 10,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginBottom: 15,
    textAlign: "center",
  },
  chartSection: {
    marginBottom: 20,
    backgroundColor: "#1a237e",
    borderRadius: 10,
    padding: 15,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-bold",
  },
  speedValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
  chart: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "#0d47a1",
    borderRadius: 10,
    padding: 10,
  },
  speedBarContainer: {
    alignItems: "center",
    width: 30,
  },
  speedBar: {
    width: 20,
    borderRadius: 5,
  },
  barLabel: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
  },
  chartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "poppins-regular",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    backgroundColor: "#1a237e",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "poppins-regular",
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginTop: 5,
  },
});

export default AdditionalCharts;
