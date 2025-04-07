import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import LocationController from "../controllers/LocationController";
import userRoute from "./userRoute";

const routes = Router();

// Rotas de usuário
routes.post("/cadastro", UserController.create);
routes.post("/login", UserController.login);
routes.use("/user", userRoute);

// Rotas de localização
routes.post("/locations", LocationController.create);
routes.get("/locations", LocationController.list);

routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API funcionando corretamente!" });
});

export default routes;
