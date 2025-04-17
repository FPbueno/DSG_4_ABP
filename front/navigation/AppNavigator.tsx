import React from "react";
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import OpenStreetMap from "../components/OpenStreetMap";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type DrawerParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
};

interface DrawerContentProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
}

const DrawerContent = ({ navigation }: DrawerContentProps) => {
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
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>
      <View style={styles.drawerSection}>
        <DrawerItem
          label="Início"
          onPress={() => navigation.navigate("Home")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="Mapa"
          onPress={() => navigation.navigate("Map")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="Configurações"
          onPress={() => navigation.navigate("Settings")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="Sair"
          onPress={handleLogout}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
        />
      </View>
    </View>
  );
};

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => (
          <MainLayout {...props}>
            <Home />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Map">
        {(props) => (
          <MainLayout {...props}>
            <OpenStreetMap />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {(props) => (
          <MainLayout {...props}>
            <Settings />
          </MainLayout>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#0A2463",
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "poppins-bold",
  },
  drawerContent: {
    padding: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
    fontFamily: "poppins-regular",
  },
  drawerSection: {
    marginTop: 20,
  },
});

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainDrawer" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
