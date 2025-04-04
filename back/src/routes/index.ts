import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import userRoute from "./userRoute"

const routes = Router();
routes.post("/cadastro", UserController.create)
routes.post("/login", UserController.login)
routes.use("/user", userRoute);

routes.use( '*', (_:Request, res:Response) => res.json({error: "Requisição desconhecida"}));

export default routes;