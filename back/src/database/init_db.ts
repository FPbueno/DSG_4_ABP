import { query } from "./connection";
import fs from "fs";
import path from "path";

async function initDatabase() {
  try {
    // Lê o arquivo SQL
    const sqlPath = path.join(__dirname, "create_tables.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    // Executa o SQL
    await query(sql);
    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

// Executa a função se este arquivo for executado diretamente
if (require.main === module) {
  initDatabase();
}

export default initDatabase;
