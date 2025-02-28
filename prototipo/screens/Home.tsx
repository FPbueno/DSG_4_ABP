import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import tw from "twrnc";
import WeatherCard from "../components/WeatherCard";

const HomeScreen = () => {
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={require("../assets/azul.png")}
        style={tw`w-full h-50 justify-center items-center`}
      >
        <Text style={tw`text-5xl font-bold text-white`}>MarineMind</Text>
      </ImageBackground>

      <View style={tw`bg-white flex-1`}>
        <Text style={tw`text-lg text-blue-800 text-center mt-6 mb-8 px-4`}>
          Explore o mundo submarino, monitorando as condições do mar e
          aprendendo sobre os oceanos.
        </Text>
        <WeatherCard />
      </View>
    </View>
  );
};

export default HomeScreen;
