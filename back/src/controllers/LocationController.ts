import { Request, Response } from "express";
import { query } from "../database/connection";

class LocationController {
  public async create(req: Request, res: Response): Promise<void> {
    const { latitude, longitude, speed } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined ||
      speed === undefined
    ) {
      res
        .status(400)
        .json({ erro: "Forneça latitude, longitude e velocidade" });
      return;
    }

    try {
      const response: any = await query(
        "INSERT INTO locations(latitude, longitude, speed) VALUES ($1, $2, $3) RETURNING id, latitude, longitude, speed",
        [latitude, longitude, speed]
      );

      console.log("Raw database response:", response);

      if (!response) {
        res
          .status(500)
          .json({ erro: "Nenhuma resposta recebida do banco de dados" });
        return;
      }

      if (typeof response === "object" && response.message) {
        res
          .status(500)
          .json({ erro: `Erro no banco de dados: ${response.message}` });
        return;
      }

      res.status(200).json({
        id: response.id,
        latitude: response.latitude,
        longitude: response.longitude,
        speed: response.speed,
      });
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
        "latitude",
        "longitude",
        "speed",
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
        SELECT id, latitude, longitude, speed 
        FROM locations 
        WHERE 1=1
      `;
      const queryParams: any[] = [];

      // Adiciona busca se houver
      if (search) {
        baseQuery += ` AND (
          CAST(latitude AS TEXT) ILIKE $${queryParams.length + 1} OR 
          CAST(longitude AS TEXT) ILIKE $${queryParams.length + 1}
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
      let countQuery = `
        SELECT COUNT(*) as total 
        FROM locations 
        WHERE 1=1
      `;
      const countParams: any[] = [];

      if (search) {
        countQuery += ` AND (
          CAST(latitude AS TEXT) ILIKE $${countParams.length + 1} OR 
          CAST(longitude AS TEXT) ILIKE $${countParams.length + 1}
        )`;
        countParams.push(`%${search}%`);
      }

      const [response, countResult] = await Promise.all([
        query(baseQuery, queryParams),
        query(countQuery, countParams),
      ]);

      // Verifica se a resposta é um array
      if (!Array.isArray(response)) {
        console.error("Resposta do banco de dados não é um array:", response);
        res
          .status(500)
          .json({ erro: "Formato inesperado de resposta do banco de dados" });
        return;
      }

      // Verifica se countResult é válido
      if (!Array.isArray(countResult) || countResult.length === 0) {
        console.error("Resultado da contagem inválido:", countResult);
        res.status(500).json({ erro: "Erro ao contar registros" });
        return;
      }

      const total = parseInt(countResult[0].total);

      res.status(200).json({
        data: response.map((location) => ({
          id: location.id,
          latitude: location.latitude,
          longitude: location.longitude,
          speed: location.speed,
        })),
        pagination: {
          total: total,
          page: pageNumber,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    } catch (error: any) {
      console.error("Database error:", error);
      res.status(500).json({ erro: error.message });
    }
  }

  public async getLastLocation(req: Request, res: Response): Promise<void> {
    try {
      const response = await query(
        "SELECT id, latitude, longitude, speed FROM locations ORDER BY created_at DESC LIMIT 1"
      );

      if (!Array.isArray(response) || response.length === 0) {
        res.status(404).json({ erro: "Nenhuma localização encontrada" });
        return;
      }

      const location = response[0];
      res.status(200).json({
        id: location.id,
        latitude: location.latitude,
        longitude: location.longitude,
        speed: location.speed,
      });
    } catch (error: any) {
      console.error("Database error:", error);
      res.status(500).json({ erro: error.message });
    }
  }
}

export default new LocationController();
