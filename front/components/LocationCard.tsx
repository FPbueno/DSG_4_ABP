import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

interface LocationCardProps {
  latitude: number;
  longitude: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Localização Atual</Text>
      <View style={styles.coordinatesContainer}>
        <View style={styles.coordinateItem}>
          <Text style={styles.coordinateLabel}>Latitude</Text>
          <Text style={styles.coordinateValue}>{latitude.toFixed(6)}</Text>
        </View>
        <View style={styles.coordinateItem}>
          <Text style={styles.coordinateLabel}>Longitude</Text>
          <Text style={styles.coordinateValue}>{longitude.toFixed(6)}</Text>
        </View>
      </View>
      <Text style={styles.lastUpdate}>Última atualização: agora</Text>
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
    borderColor: "#FFA726",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-regular",
    marginBottom: 15,
  },
  coordinatesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coordinateItem: {
    alignItems: "center",
    flex: 1,
  },
  coordinateLabel: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginBottom: 5,
  },
  coordinateValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
  lastUpdate: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "poppins-regular",
    marginTop: 15,
    opacity: 0.7,
  },
});

export default LocationCard;
