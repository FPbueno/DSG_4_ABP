import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatisticsCardProps {
  label: string;
  value: string;
  unit?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  unit = "km/h",
}) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>
        {value} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: "#0A2463",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "poppins-regular",
    marginBottom: 5,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
});

export default StatisticsCard;
