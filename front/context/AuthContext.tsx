import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definição do tipo para o contexto
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
  userId: string | null;
}

// Definição do tipo para as propriedades do provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Efeito para carregar token e userId do AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          const token = parsedUser.token || "";
          const storedUserId = parsedUser.userId || null;

          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsAuthenticated(true);
          }

          if (storedUserId) {
            setUserId(storedUserId);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, []);

  // Função de login
  const login = async (token: string, userId: string) => {
    try {
      const user = { token, userId };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUserId(userId);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
      setUserId(null);
      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
