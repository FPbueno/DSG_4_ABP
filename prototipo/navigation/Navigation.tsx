import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import OpenStreetMap from "../components/OpenStreetMap";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import CustomDrawer from "../components/CustomDrawer"; // Menu personalizado (opcional)
import Recuperacao from "../screens/Recuperacao";
import ConfiguraConta from "../screens/ConfiguraConta";
import Privacidade from "../screens/Privacidade";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack de autenticação
const AuthStack = () => (
  <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Cadastro" component={Cadastro} />
    <Stack.Screen name="Recuperacao" component={Recuperacao} />
  </Stack.Navigator>
);

// Stack principal
const MainStack = () => (
  <Drawer.Navigator
    id={undefined}
    drawerContent={(props) => <CustomDrawer {...props} />} // Menu lateral personalizado
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen  name="Home" component={HomeScreen} />
    <Drawer.Screen name="Map" component={OpenStreetMap} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="ConfiguraConta" component={ConfiguraConta} />
    <Drawer.Screen name="Privacidade" component={Privacidade} />
  </Drawer.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
