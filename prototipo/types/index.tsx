export interface WeatherCondition {
  icon: string;
  text: string;
}

export interface WeatherCurrent {
  temp_c: number;
  humidity: number;
  condition: WeatherCondition;
  precip_mm: number;
  wind_kph: number;
}

export interface WeatherData {
  current: WeatherCurrent;
}
