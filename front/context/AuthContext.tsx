import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Definição do tipo para o contexto
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
  userId: string | null; // userId aqui
}

// Definição do tipo para as propriedades do provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Efeito para carregar token e userId do localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user); // Parse do JSON armazenado
      const token = parsedUser.token || ''; // Acessando o token diretamente
      const storedUserId = parsedUser.userId || null; // Acessando o userId diretamente

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
      }

      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  // Função de login
  const login = (token: string, userId: string) => {
    const user = { token, userId };  // Armazenando token e userId juntos
    localStorage.setItem("user", JSON.stringify(user));  // Salva no localStorage
    console.log(localStorage.getItem("user")); // Verifique aqui se o valor está correto
    setIsAuthenticated(true);
    setUserId(userId);
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("user"); // Removendo o objeto 'user'
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUserId(null);
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