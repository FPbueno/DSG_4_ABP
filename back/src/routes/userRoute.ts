import { Router} from "express";
import controller from "../controllers/UserController";
import { validadeAcess } from "../middleware";
const routes = Router();
// somente o próprio usuário pode acessar
routes.put("/mail", validadeAcess, controller.updateMail);
routes.put("/senha", validadeAcess, controller.updatePassword);

// somente o adm pode acessar
routes.get("/list", validadeAcess, controller.list);
routes.post("/create", validadeAcess, controller.create);
routes.delete("/", validadeAcess, controller.delete);
routes.put("/perfil", validadeAcess, controller.updateProfile);

export default routes;