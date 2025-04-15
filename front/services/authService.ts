import axios from "axios";
import { removeFromLocalStorage } from "../utils/localStorage";

const API_URL = process.env.API_URL || "http://localhost:3000";

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    profile: string;
  };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: data.email,
        password: data.senha,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Erro ao fazer login");
      }
      throw new Error("Erro ao fazer login");
    }
  },

  async register(data: {
    name: string;
    email: string;
    phone: string;
    country: string;
    senha: string;
  }): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/cadastro`, {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        pais: data.country,
        senha: data.senha,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Erro ao cadastrar");
      }
      throw new Error("Erro ao cadastrar");
    }
  },

  async logout(): Promise<void> {
    try {
      // Limpar o token e dados do usuário do AsyncStorage
      removeFromLocalStorage("user");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw new Error("Erro ao fazer logout");
    }
  },
};
