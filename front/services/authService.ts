import axios from "axios";
import { removeFromLocalStorage } from "../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL || "http://192.168.144.195:3000";

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
          const mensagemErro = error.response.data.detalhes
            ? `${error.response.data.erro}: ${error.response.data.detalhes}`
            : error.response.data.erro;
          throw new Error(mensagemErro);
        }
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
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

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        throw new Error("Usuário não autenticado");
      }

      const { token } = JSON.parse(userData);
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await axios.put(
        `${API_URL}/user/alterar-senha`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resposta do servidor:", response.data);

      // Se a resposta tem mensagem de sucesso, retorna sucesso
      if (response.data && response.data.mensagem) {
        console.log("Mensagem de sucesso encontrada:", response.data.mensagem);
        return { mensagem: response.data.mensagem };
      }

      // Se a resposta tem mensagem de erro, lança o erro
      if (response.data && response.data.erro) {
        console.log("Erro encontrado:", response.data.erro);
        throw new Error(response.data.erro);
      }

      console.log(
        "Nenhuma mensagem específica encontrada, retornando sucesso padrão"
      );
      // Se chegou aqui, a requisição foi bem sucedida
      return { mensagem: "Senha alterada com sucesso" };
    } catch (error) {
      console.error("Erro detalhado:", error);
      if (axios.isAxiosError(error)) {
        console.error("Status do erro:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);

        if (error.response?.data?.erro) {
          const mensagemErro = error.response.data.detalhes
            ? `${error.response.data.erro}: ${error.response.data.detalhes}`
            : error.response.data.erro;
          throw new Error(mensagemErro);
        }
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
      }
      throw new Error("Erro ao alterar senha");
    }
  },
};
