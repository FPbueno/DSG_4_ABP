import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

interface SpeedCardProps {
  speed: number;
}

const SpeedCard: React.FC<SpeedCardProps> = ({ speed }) => {
  // Se a velocidade for menor ou igual a 5 km/h, não renderiza o card de alerta
  if (speed <= 5 || isNaN(speed)) {
    return null;
  }

  return (
    <View style={[styles.container, { borderColor: "#F44336" }]}>
      <Text style={styles.label}>Alerta de Velocidade</Text>
      <View style={styles.speedContainer}>
        <Text style={styles.speed}>{speed.toFixed(1)}</Text>
        <Text style={styles.unit}>km/h</Text>
      </View>
      <Text style={styles.status}>Velocidade Alta</Text>
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
