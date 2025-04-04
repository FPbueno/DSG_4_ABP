import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || ""),
});

async function query(sql: string, params?: any[]) {
  try {
    const res = await pool.query(sql, params);
    if (res.command == "INSERT") {
      return res.rows[0];
    } else if (res.command == "SELECT") {
      return res.rows;
    } else if (res.command == "DELETE" || res.command == "UPDATE") {
      return { rowcount: res.rowCount, rows: res.rows[0] };
    } else {
      return { sql };
    }
  } catch (e: any) {
    return { message: e.message };
  }
}

export default pool;
export{
  query
}