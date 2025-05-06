import { TokenProps } from "./index";

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


export interface UserContextProps {
  loading: boolean;
  token: TokenProps | null;
  userId?: string | null;
  setToken: (value: TokenProps | null) => void;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
  create: (
    name: string,
    mail: string,
    fone: string,
    pais: string,
    password: string
  ) => Promise<void>;
  getUsers: () => Promise<void>;
  error: ErrorProps | null;
  setError: (error: ErrorProps | null) => void;
  updateAlias: (alias: string) => Promise<boolean>;
  updateMail: (mail: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  deleteProfile: () => Promise<boolean>;
}

// Definindo o tipo para os valores que incluem unidade de medida
export interface ValueProps {
  label: string;
  value: number | null;
  unit: string;
}

// Estrutura de erro
export interface ErrorProps {
  error: string;
}



export interface ProviderProps {
  children: React.ReactNode;
}
