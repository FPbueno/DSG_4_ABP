import axios from "axios";
import { removeFromLocalStorage } from "../utils/localStorage";

const API_URL = process.env.API_URL || "http://192.168.15.92:3000";

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

  async forgotPassword(email: string): Promise<any> {
    try {
      console.log("Iniciando recuperação de senha para:", email);
      console.log("URL da API:", API_URL);

      const response = await axios.post(`${API_URL}/user/recuperar-senha`, {
        email: email,
      });

      console.log("Resposta do servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro detalhado:", error);
      if (axios.isAxiosError(error)) {
        console.error("Status do erro:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);

        if (error.response?.data?.erro) {
          throw new Error(error.response.data.erro);
        }
      }
      throw new Error("Erro ao solicitar recuperação de senha");
    }
  },

  async verifyCode(email: string, code: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/user/verificar-codigo`, {
        email: email,
        code: code,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.error || "Erro ao verificar código"
        );
      }
      throw new Error("Erro ao verificar código");
    }
  },

  async resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/user/redefinir-senha`, {
        token: token,
        newPassword: newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Erro ao redefinir senha");
      }
      throw new Error("Erro ao redefinir senha");
    }
  },
};
