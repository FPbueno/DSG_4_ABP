import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import tw from "twrnc";
import WeatherCard from "../components/WeatherCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeScreen = () => {
  return (
    <View style={tw`flex-1`}>
      <Header />

      <View style={tw`bg-white flex-1`}>
        <Text style={tw`text-lg text-blue-800 text-center mt-6 mb-8 px-4`}>
          Explore o mundo submarino, monitorando as condições do mar e
          aprendendo sobre os oceanos.
        </Text>
        <WeatherCard />
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;
