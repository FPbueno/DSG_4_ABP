import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

// Definição dos tipos de navegação
type DrawerParamList = {
  OpenStreetMaps: undefined;
  Home: undefined;
  Settings: undefined;
};

interface HeaderProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>AquaTrace</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0A2463",
    height: 80,
    paddingHorizontal: 15,
  },
  menuButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "poppins-bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  profileButton: {
    padding: 10,
  },
  logoutButton: {
    padding: 10,
  },
});

export default Header;
