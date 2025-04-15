import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index"; // Importa as rotas definidas

dotenv.config();

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "*", // Permite todas as origens
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Usa as rotas
app.use(routes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
