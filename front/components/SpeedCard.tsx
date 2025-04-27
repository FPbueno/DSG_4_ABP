import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

interface SpeedCardProps {
  speed: number;
}

const SpeedCard: React.FC<SpeedCardProps> = ({ speed }) => {
  const getSpeedColor = (speed: number) => {
    if (speed < 2) return "#4CAF50"; // Verde para baixa velocidade
    if (speed < 5) return "#FFC107"; // Amarelo para velocidade média
    return "#F44336"; // Vermelho para alta velocidade
  };

  return (
    <View style={[styles.container, { borderColor: getSpeedColor(speed) }]}>
      <Text style={styles.label}>Velocidade Atual</Text>
      <View style={styles.speedContainer}>
        <Text style={styles.speed}>{speed.toFixed(1)}</Text>
        <Text style={styles.unit}>km/h</Text>
      </View>
      <Text style={styles.status}>
        {speed < 2 ? "Baixa" : speed < 5 ? "Média" : "Alta"}
      </Text>
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
    marginBottom: 10,
  },
  speedContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  speed: {
    color: "#fff",
    fontSize: 36,
    fontFamily: "poppins-bold",
  },
  unit: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-regular",
    marginLeft: 5,
  },
  status: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginTop: 10,
  },
});

export default SpeedCard;
