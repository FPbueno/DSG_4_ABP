import { Request, Response } from "express";
import { query } from "../database/connection";

class LocationController {
  public async create(req: Request, res: Response): Promise<void> {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      res.status(400).json({ erro: "Forneça latitude e longitude" });
      return;
    }

    try {
      const response: any = await query(
        "INSERT INTO locations(latitude, longitude) VALUES ($1, $2) RETURNING id, latitude, longitude",
        [latitude, longitude]
      );

      if (!response || !response.id) {
        res
          .status(500)
          .json({ erro: "Formato inesperado de resposta do banco de dados" });
        return;
      }

      console.log("Response from database:", response);
      res.status(201).json(response);
    } catch (error: any) {
      console.error("Database error:", error);
      res.status(500).json({ erro: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    try {
      const {
        sortBy = "id",
        sortOrder = "ASC",
        search = "",
        page = 1,
        limit = 10,
      } = req.query;

      // Validação dos parâmetros
      const validSortColumns = [
        "id",
        "nome",
        "latitude",
        "longitude",
        "created_at",
      ];
      const sortColumn = validSortColumns.includes(sortBy as string)
        ? sortBy
        : "id";
      const sortDirection = sortOrder === "ASC" ? "ASC" : "DESC";
      const pageNumber = Math.max(1, parseInt(page as string));
      const pageSize = Math.min(50, Math.max(1, parseInt(limit as string)));
      const offset = (pageNumber - 1) * pageSize;

      // Construção da query base
      let baseQuery = `
        SELECT id, user_id, latitude, longitude, nome, descricao, created_at, updated_at 
        FROM locations 
        WHERE 1=1
      `;
      const queryParams: any[] = [];

      // Adiciona busca se houver
      if (search) {
        baseQuery += ` AND (
          nome ILIKE $${queryParams.length + 1} OR 
          descricao ILIKE $${queryParams.length + 1}
        )`;
        queryParams.push(`%${search}%`);
      }

      // Adiciona ordenação
      baseQuery += ` ORDER BY ${sortColumn} ${sortDirection}`;

      // Adiciona paginação
      baseQuery += ` LIMIT $${queryParams.length + 1} OFFSET $${
        queryParams.length + 2
      }`;
      queryParams.push(pageSize, offset);

      // Query para contar total de registros
      const countQuery = `
        SELECT COUNT(*) as total 
        FROM locations 
        WHERE 1=1
        ${search ? `AND (nome ILIKE $1 OR descricao ILIKE $1)` : ""}
      `;

      const [response, countResult] = await Promise.all([
        query(baseQuery, queryParams),
        query(countQuery, search ? [`%${search}%`] : []),
      ]);

      if (
        !response ||
        !Array.isArray(response) ||
        !countResult ||
        !Array.isArray(countResult)
      ) {
        res
          .status(500)
          .json({ erro: "Formato inesperado de resposta do banco de dados" });
        return;
      }

      res.status(200).json({
        data: response,
        pagination: {
          total: parseInt(countResult[0].total),
          page: pageNumber,
          limit: pageSize,
          totalPages: Math.ceil(parseInt(countResult[0].total) / pageSize),
        },
      });
    } catch (error: any) {
      console.error("Database error:", error);
      res.status(500).json({ erro: error.message });
    }
  }
}

export default new LocationController();
