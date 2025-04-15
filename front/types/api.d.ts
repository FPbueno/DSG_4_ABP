import { AxiosInstance } from "axios";

declare module "../../services/api" {
  const api: AxiosInstance;
  export default api;
}
