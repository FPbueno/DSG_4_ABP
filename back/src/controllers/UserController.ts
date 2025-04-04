import { Request, Response } from "express";
import {query} from "../database/connection";


class UserController {
  public async login(req: Request, res: Response): Promise<void> {
    const { mail, password } = req.body;

    if (!mail) {
      res.json({ erro: "Forneça o e-mail" });
    } else if (!password) {
      res.json({ erro: "Forneça a senha" });
    } else {
      const response: any = await query(
        `SELECT id, mail, profile 
          FROM users 
          WHERE mail=$1 AND password=$2`,
        [mail, password]
      );
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { mail, password, profile } = req.body;

    if (!mail) {
      res.json({ erro: "Forneça o e-mail" });
    } else if (!password) {
      res.json({ erro: "Forneça a senha" });
    } else if (!profile) {
      res.json({ erro: "Forneça o perfil" });
    } else if (profile !== "adm" && profile !== "user") {
      res.json({ erro: "O perfil precisa ser adm ou user" });
    } else {
      const response: any = await query(
        "INSERT INTO users(mail,password,profile) VALUES ($1,$2,$3) RETURNING id, mail, profile",
        [mail, password, profile]
      );

      if (response && response.id) {
        res.json(response);
      } else if (response.message.startsWith("duplicate key")) {
        res.json({ erro: `O e-mail ${mail} já existe no cadastro` });
      } else {
        res.json({ erro: response.message });
      }
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    const response: any = await query(
      "SELECT id,mail,profile FROM users ORDER BY mail"
    );
    res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { iduser } = req.params;
    if (!iduser) {
      res.json({ erro: "Forneça o usuário a ser excluído" });
    } else {
      const response: any = await query(
        "DELETE FROM users WHERE id = $1 RETURNING id, mail, profile",
        [iduser]
      );

      if (response && response.rowcount && response.rowcount > 0) {
        res.json(response.rows);
      } else if (response.message.startsWith("update or delete on table")) {
        res.json({ erro: `O usuário possui atribuições` });
      } else {
        res.json(response);
        //res.json({ erro: "Usuário não localizado" });
      }
    }
  }

  public async updateMail(req: Request, res: Response): Promise<void> {
    const { mail } = req.body;
    const { id } = res.locals;
    if (!mail) {
      res.json({ erro: "Forneça o novo e-mail" });
    } else {
      const r: any = await query(
        "UPDATE users SET mail=$2 WHERE id=$1 RETURNING id, mail, profile",
        [id, mail]
      );

      if (r.rowcount == 1) {
        res.json({ mail });
      } else if (r.message.startsWith("duplicate key")) {
        res.json({ erro: `O e-mail ${mail} já existe no cadastro` });
      } else {
        res.json({ erro: "Não foi possível alterar o e-mail" });
      }
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const { id } = res.locals;
    if (!password) {
      res.json({ erro: "Forneça a nova senha" });
    } else {
      const r: any = await query(
        "UPDATE users SET password=$2 WHERE id=$1 RETURNING id, mail, profile",
        [id, password]
      );
      res.json(r);
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    const { id, profile } = req.body;
    if (profile === "adm" || profile === "user") {
      const r: any = await query(
        "UPDATE users SET profile=$2 WHERE id=$1 RETURNING id, mail, profile",
        [id, profile]
      );
      res.json(r);
    } else {
      res.json({ erro: "Perfil inexistente" });
    }
  }
}

export default new UserController();