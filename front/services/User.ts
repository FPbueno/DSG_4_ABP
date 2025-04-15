import { ErrorProps, TokenProps, UserProps } from "../types";
import api from "./api";

class User {
  async login(
    mail: string,
    password: string
  ): Promise<TokenProps | ErrorProps> {
    try {
      const { data } = await api.post("/login", { mail, password });
      return data;
    } catch (error: any) {
      return error;
    }
  }
  async create(
    name: string,
    mail: string,
    fone: string,
    pais: string,
    password: string
  ): Promise<TokenProps | ErrorProps> {
    try {
      const { data } = await api.post("/cadastro", {
        name,
        mail,
        fone,
        pais,
        password,
      });
      return data;
    } catch (error: any) {
      return error;
    }
  }
  async updateAlias(
    userId: string,
    alias: string
  ): Promise<UserProps | ErrorProps> {
    try {
      const { data } = await api.put(`/user/profile/${userId}`, { alias });
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async updateMail(mail: string): Promise<UserProps | ErrorProps> {
    try {
      const { data } = await api.put("/user/profile", { mail });
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async updatePassword(password: string): Promise<UserProps | ErrorProps> {
    try {
      const { data } = await api.put("/user/profile", { password });
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async list(): Promise<UserProps[] | ErrorProps> {
    try {
      const { data } = await api.get("/user");
      return data;
    } catch (error: any) {
      return error;
    }
  }
}
const user = new User();
export default user;
