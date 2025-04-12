import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

//import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("🚀 Backend rodando na porta 3000");
});

// Rota para a raiz
// app.get("/", (req, res) => {
//   res.send("🚀 Backend rodando na porta 3000");
// });

//app.use("/api/auth", authRoutes);

