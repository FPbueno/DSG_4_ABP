import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "services/api";

// Definição do tipo para o contexto
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
  userId: string | null;
  updateMail: (mail: string) => Promise<boolean>;
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
// Função de atualização do e-mail
async function updateMail(mail: string): Promise<boolean> {
  try {
    // Verificando se o userId existe antes de tentar enviar a requisição
    if (!userId) {
      console.error("ID do usuário não encontrado.");
      return false;
    }

    // Adicionando um log para verificar o userId e o mail
    console.log("Atualizando e-mail para o ID:", userId, "Novo e-mail:", mail);

    // Fazendo a requisição PUT com o userId e o mail
    const response = await axios.put("http://10.68.55.166:3000/user/mail", { mail, id: userId });

    // Verificando a resposta para determinar o sucesso ou falha
    if (response.data.erro) {
      console.error("Erro ao atualizar e-mail:", response.data.erro);
      return false;
    }

    // Se o e-mail foi atualizado com sucesso
    console.log("E-mail atualizado:", response.data.mail);
    return true;

  } catch (error) {
    // Melhorando o tratamento de erro
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Erro HTTP:", error.response.status);
        console.error("Detalhes do erro:", error.response.data);
        alert(`Erro: ${error.response.data.erro || "Erro desconhecido"}`);
      } else {
        console.error("Erro na requisição:", error.message);
      }
    } else {
      console.error("Erro desconhecido:", error);
    }

    return false;
  }
}

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId,  updateMail }}>  
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
