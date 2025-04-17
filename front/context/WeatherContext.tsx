import React, { createContext, useContext, useState } from "react";

interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  precipitation: number | null;
}

interface WeatherContextType {
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: null,
    humidity: null,
    precipitation: null,
  });

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
