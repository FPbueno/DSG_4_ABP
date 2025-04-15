import { ErrorProps, ProfileProps } from "../types";
import api from "./api";

class Profile {
  async list(): Promise<ProfileProps[] | ErrorProps> {
    try {
      const { data } = await api.get("/profile");
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async save(
    birth_date: string,
    weight: string,
    sex: string
  ): Promise<ProfileProps | ErrorProps> {
    try {
      const { data } = await api.post("/profile", { birth_date, weight, sex });
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async delete(): Promise<ProfileProps | ErrorProps> {
    try {
      const { data } = await api.delete("/profile");
      return data;
    } catch (error: any) {
      return error;
    }
  }
}

const profile = new Profile();
export default profile;
