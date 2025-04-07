import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index"; // Importa as rotas definidas

dotenv.config();

const app = express();

app.use(express.json());

// Usa as rotas
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
