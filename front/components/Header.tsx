import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#0A2463", "#1E3A8A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Platform.OS === "ios" ? 45 : 55,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    zIndex: 1,
    marginTop:
      Platform.OS === "ios"
        ? 0
        : StatusBar.currentHeight
        ? -StatusBar.currentHeight
        : 0,
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  title: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 18 : 20,
    fontFamily: "poppins-bold",
    textAlign: "center",
    lineHeight: Platform.OS === "ios" ? 45 : 55,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 40,
    zIndex: 1,
    marginTop:
      Platform.OS === "ios"
        ? 0
        : StatusBar.currentHeight
        ? -StatusBar.currentHeight
        : 0,
  },
  logoutButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
});

export default Header;
