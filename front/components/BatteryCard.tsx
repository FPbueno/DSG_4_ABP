import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

interface BatteryCardProps {
  level: number;
  charging: boolean;
}

const BatteryCard: React.FC<BatteryCardProps> = ({ level, charging }) => {
  const getBatteryColor = (level: number) => {
    if (level > 70) return "#4CAF50";
    if (level > 30) return "#FFC107";
    return "#F44336";
  };

  const getBatteryStatus = (level: number) => {
    if (level > 70) return "Boa";
    if (level > 30) return "Média";
    return "Baixa";
  };

  return (
    <View style={[styles.container, { borderColor: getBatteryColor(level) }]}>
      <Text style={styles.label}>Status da Bateria</Text>
      <View style={styles.batteryContainer}>
        <View style={styles.batteryLevelContainer}>
          <View
            style={[
              styles.batteryLevel,
              {
                width: `${level}%`,
                backgroundColor: getBatteryColor(level),
              },
            ]}
          />
        </View>
        <Text style={styles.percentage}>{level}%</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>{getBatteryStatus(level)}</Text>
        {charging && <Text style={styles.charging}>Carregando</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A2463",
    borderRadius: 15,
    padding: 20,
    margin: 10,
    borderWidth: 2,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-regular",
    marginBottom: 15,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  batteryLevelContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  batteryLevel: {
    height: "100%",
    borderRadius: 10,
  },
  percentage: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
    minWidth: 40,
    textAlign: "right",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  status: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  charging: {
    color: "#4CAF50",
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
});

export default BatteryCard;
