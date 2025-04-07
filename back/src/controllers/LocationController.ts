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

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const response: any = await query(
        "SELECT id, latitude, longitude FROM locations ORDER BY id"
      );

      // Verifique se o retorno já é uma lista
      if (!response || !Array.isArray(response)) {
        res
          .status(500)
          .json({ erro: "Formato inesperado de resposta do banco de dados" });
        return;
      }

      res.status(200).json(response);
    } catch (error: any) {
      console.error("Database error:", error);
      res.status(500).json({ erro: error.message });
    }
  }
}

export default new LocationController();
