import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Location {
  id: number;
  speed: string;
}

interface SpeedChartProps {
  locations: Location[];
}

const SpeedChart: React.FC<SpeedChartProps> = ({ locations }) => {
  if (locations.length === 0) return null;

  const maxSpeed = Math.max(...locations.map((loc) => parseFloat(loc.speed)));
  const chartHeight = 150;
  const barWidth = 20;
  const spacing = 10;

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
          {locations.map((location) => {
            const speed = parseFloat(location.speed);
            const barHeight = (speed / maxSpeed) * chartHeight;
            return (
              <View key={location.id} style={styles.barContainer}>
                <View style={[styles.bar, { height: barHeight }]} />
                <Text style={styles.barLabel}>{speed.toFixed(1)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#0A2463",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  chartWrapper: {
    flexDirection: "row",
    height: 200,
  },
  yAxis: {
    width: 60,
    justifyContent: "space-between",
    paddingRight: 10,
  },
  yAxisLabel: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "poppins-regular",
  },
  chart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  barContainer: {
    alignItems: "center",
    width: 30,
  },
  bar: {
    width: 20,
    backgroundColor: "#ffa726",
    borderRadius: 5,
  },
  barLabel: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
  },
});

export default SpeedChart;
