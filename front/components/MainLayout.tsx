import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type DrawerParamList = {
  OpenStreetMaps: undefined;
  Home: undefined;
  Settings: undefined;
};

interface MainLayoutProps {
  children: React.ReactNode;
  route: RouteProp<ParamListBase>;
  navigation: DrawerNavigationProp<DrawerParamList>;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  route,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2463" />
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.content}>{children}</View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A2463",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#071025",
  },
  content: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 75 : 85, // Ajustado para o novo tamanho do header
  },
});

export default MainLayout;
