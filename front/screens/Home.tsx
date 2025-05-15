import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import SpeedCard from "../components/SpeedCard";
import LocationCard from "../components/LocationCard";
import BatteryCard from "../components/BatteryCard";
import WeatherCard from "../components/WeatherCard";
import api from "../services/api";

interface LocationData {
  latitude: number;
  longitude: number;
  speed: number;
  battery: number;
  charging: boolean;
}

const { width: screenWidth } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const [locationData, setLocationData] = useState<LocationData>({
    latitude: 0,
    longitude: 0,
    speed: 0,
    battery: 100,
    charging: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await api.get("/locations/last");
      if (response.data) {
        setLocationData({
          latitude: parseFloat(response.data.latitude),
          longitude: parseFloat(response.data.longitude),
          speed: parseFloat(response.data.speed),
          battery: 85,
          charging: false,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth - 32));
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={tw`flex-1 bg-[#071025] p-4`}>
      <View style={tw`py-0 mb-0`}>
        <Text style={tw`text-3xl text-white font-bold text-center`}>
          Monitoramento da Boia
        </Text>
      </View>

      <View style={tw`flex-1`}>
        <View style={tw`h-[15%] mb-0`}>
          <WeatherCard />
        </View>

        <View style={tw`flex-1 justify-end`}>
          <View style={tw`h-[60%]`}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={tw`flex-1`}
              contentContainerStyle={tw`flex-row`}
              snapToInterval={screenWidth - 32}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <View style={[tw`p-2`, { width: screenWidth - 32 }]}>
                <SpeedCard speed={locationData.speed} />
              </View>
              <View style={[tw`p-2`, { width: screenWidth - 32 }]}>
                <BatteryCard
                  level={locationData.battery}
                  charging={locationData.charging}
                />
              </View>
              <View style={[tw`p-2`, { width: screenWidth - 32 }]}>
                <LocationCard
                  latitude={locationData.latitude}
                  longitude={locationData.longitude}
                />
              </View>
            </ScrollView>
            <View style={tw`flex-row justify-center mt-4`}>
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  style={[
                    tw`w-2 h-2 rounded-full mx-2`,
                    {
                      backgroundColor:
                        currentIndex === index ? "#FFA726" : "#4A5568",
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={tw`h-[10%] justify-center mt-2`}>
            <Text style={tw`text-white text-center text-sm`}>
              Última atualização: {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
