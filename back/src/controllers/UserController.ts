import { Request, Response } from "express";
import { query } from "../database/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  public async login(req: Request, res: Response): Promise<void> {
    console.log("Recebendo requisição de login:", req.body);
    const { email, password } = req.body;

    if (!email) {
      console.log("Email não fornecido");
      res.status(400).json({ erro: "Forneça o e-mail" });
      return;
    } else if (!password) {
      console.log("Senha não fornecida");
      res.status(400).json({ erro: "Forneça a senha" });
      return;
    }

    try {
      console.log("Tentando buscar usuário no banco de dados");
      const response: any = await query(
        `SELECT id, email, senha, nome, telefone, pais 
         FROM users 
         WHERE email = $1`,
        [email]
      );

      console.log("Resposta do banco de dados:", response);

      if (!response || response.length === 0) {
        console.log("Usuário não encontrado");
        res.status(401).json({ erro: "Usuário não encontrado" });
        return;
      }

      const user = response[0];
      console.log("Usuário encontrado:", user);

      const passwordMatch = await bcrypt.compare(password, user.senha);
      console.log("Senha corresponde:", passwordMatch);

      if (!passwordMatch) {
        console.log("Senha incorreta");
        res.status(401).json({ erro: "Senha incorreta" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      console.log("Login bem-sucedido, gerando token");
      res.json({
        token,
        id: user.id,
        email: user.email,
        nome: user.nome,
        telefone: user.telefone,
        pais: user.pais,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ erro: "Erro ao fazer login" });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    console.log("Recebendo requisição de cadastro:", req.body);
    const { nome, email, telefone, pais, senha } = req.body;

    try {
      if (!email) {
        console.log("Email não fornecido");
        res.status(400).json({ erro: "Forneça o e-mail" });
        return;
      } else if (!senha) {
        console.log("Senha não fornecida");
        res.status(400).json({ erro: "Forneça a senha" });
        return;
      } else if (!nome) {
        console.log("Nome não fornecido");
        res.status(400).json({ erro: "Forneça o nome" });
        return;
      } else if (!telefone) {
        console.log("Telefone não fornecido");
        res.status(400).json({ erro: "Forneça o telefone" });
        return;
      } else if (!pais) {
        console.log("País não fornecido");
        res.status(400).json({ erro: "Forneça o país" });
        return;
      }

      // Primeiro, verifica se o email já existe
      const existingUser: any = await query(
        "SELECT id, nome, email FROM users WHERE email = $1",
        [email]
      );

      if (existingUser && existingUser.length > 0) {
        console.log("Usuário já existe:", existingUser[0]);
        res.status(400).json({
          erro: `O e-mail ${email} já está cadastrado`,
          usuarioExistente: existingUser[0],
        });
        return;
      }

      console.log("Tentando criar usuário no banco de dados");
      const hashedPassword = await bcrypt.hash(senha, 10);

      const response: any = await query(
        "INSERT INTO users(nome, email, telefone, pais, senha) VALUES ($1,$2,$3,$4,$5) RETURNING id, nome, email, telefone, pais",
        [nome, email, telefone, pais, hashedPassword]
      );

      console.log("Resposta do banco de dados:", response);

      if (response && response.id) {
        console.log("Usuário criado com sucesso:", response);
        res.status(201).json(response);
      } else {
        console.log("Erro ao criar usuário: resposta inválida");
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
      }
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    try {
      console.log("Listando usuários...");
      const response: any = await query(
        "SELECT id, email, nome, telefone, pais FROM users"
      );

      console.log("Usuários encontrados:", response);
      res.json(response);
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }

  public async checkEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      console.log("Verificando email:", email);
      const response: any = await query(
        "SELECT id, email FROM users WHERE email = $1",
        [email]
      );

      console.log("Resultado da verificação:", response);
      if (response && response.length > 0) {
        res.json({ exists: true, user: response[0] });
      } else {
        res.json({ exists: false });
      }
    } catch (error: any) {
      console.error("Erro ao verificar email:", error);
      res.status(500).json({ erro: "Erro ao verificar email" });
    }
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
