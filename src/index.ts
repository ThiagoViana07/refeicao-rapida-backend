import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import mealRoutes from "./routes/meal.routes";
import ingredientRoutes from "./routes/ingredients.routes";

//import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Adicionar rota para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("🚀 Backend rodando na porta 3000");
});

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/ingredients", ingredientRoutes);

app.listen(4000, () => {
  console.log("🚀 Backend rodando na porta 4000");
});



